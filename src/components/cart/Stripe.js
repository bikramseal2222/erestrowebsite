import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../context/AuthContext";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { usePayment } from "../../context/PaymentContext";
import config from "../../utils/config";
import { Button } from "@mui/material";
import { useState } from "react";
import * as api from "../../utils/api";

const CheckoutForm = ({ SelectedAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const { usercart } = useCart();
  const { Place_Order, transactions, setLoad, load } = usePayment();// eslint-disable-next-line
  const [CancleOrder, setCancleOrder] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const variant_id = usercart
      .map((item) => item.product_variant_id)
      .join(", ");

    const qty = usercart.map((item) => item.qty).join(", ");
    const price = localStorage.getItem("price");
    const tip = localStorage.getItem("tip");

    // place orders

    Place_Order(
      variant_id,
      qty,
      price,
      0,
      "stripe",
      "awaiting",
      SelectedAddress,
      tip,
      "stripe"
    );

    //  payment_intent

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      const get_client_id = localStorage.getItem("client_id");
      const paymentResult = await stripe.confirmCardPayment(get_client_id, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser.user_name
          }
        }
      });

      if (paymentResult.paymentIntent.status === "succeeded") {
        const order_id = localStorage.getItem("order_id");
        transactions(
          order_id,
          "stripe",
          "stripe",
          paymentResult.paymentIntent.id,
          price
        );
      } else {
        const order_id = localStorage.getItem("order_id");
        api
          .delete_order(order_id)
          .then((response) => {
            if (!response.error) {
              setCancleOrder(response.data);
            }
          })
          .catch(() => {});
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <CardElement className="mt20 mb20" />
      <Button
        type="submit"
        disabled={!stripe || !elements}
        color="error"
        variant="outlined"
      >
        {!load ? "Pay Now" : "Please Wait"}
      </Button>
    </form>
  );
};

const stripePromise = loadStripe(config.stripe_public_key);

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Stripe;
