import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import * as api from "../../utils/api";
import { useState } from "react";
import { usePayment } from "../../context/PaymentContext";
import config from "../../utils/config";

const Flutterwave = ({ SelectedAddress }) => {
  const { currentUser } = useAuth();
  const { usercart } = useCart();// eslint-disable-next-line
  const [order, setOrder] = useState();
  const { transactions } = usePayment();
  const [load, setLoad] = useState(false);// eslint-disable-next-line
  const [Cancleorders, setCancleOrder] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, []);

  const makePayment = () => {
    const variant_id = usercart
      .map((item) => item.product_variant_id)
      .join(", ");

    const qty = usercart.map((item) => item.qty).join(", ");

    const price = localStorage.getItem("price");

    setLoad(true);
    // place_order

    api
      .place_order(
        variant_id,
        qty,
        price,
        0,
        "flutterwave",
        "awaiting",
        SelectedAddress
      )
      .then((response) => {
        setLoad(false);
        setOrder(response.order_id);
        localStorage.setItem("order_id", response.order_id);
      })
      .catch((error) => {
        console.log(error);
      });

    window.FlutterwaveCheckout({
      public_key: config.flutterwave_public_key,
      tx_ref: "titanic-48981487343MDI0NzMx",
      amount: price,
      currency: "NGN",
      payment_options: "card, mobilemoneyghana, ussd",
      callback: function (payment) {
        if (payment.status === "successful") {
          const order_id = localStorage.getItem("order_id");
          console.log(order_id);
          transactions(
            order_id,
            "flutterwave",
            "flutterwave",
            payment.transaction_id,
            price
          );
        }
      },
      onclose: function (incomplete) {
        if (incomplete || window.verified === false) {
          const order_id = localStorage.getItem("order_id");
          api.delete_order(order_id).then((response) => {
            if (!response.error) {
              setCancleOrder(response.data);
            }
          });
        } else {
          document.querySelector("form").style.display = "none";
          if (window.verified === true) {
            document.querySelector("#payment-success").style.display = "block";
          } else {
            document.querySelector("#payment-pending").style.display = "block";
          }
        }
      },
      customer: {
        email: currentUser.email,
        phone_number: currentUser.mobile,
        name: currentUser.username
      }
    });
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={(e) => makePayment()}>
        {!load ? "Pay Now" : "Please Wait"}
      </Button>
    </>
  );
};

export default Flutterwave;
