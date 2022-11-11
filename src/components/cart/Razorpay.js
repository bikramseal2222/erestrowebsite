import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { usePayment } from "../../context/PaymentContext";
import config from "../../utils/config";
import { useState } from "react";
import * as api from "../../utils/api";

const Razorpay = ({ SelectedAddress }) => {
  const { currentUser } = useAuth();
  const { usercart } = useCart();
  const { Place_Order, orders, transactions, setLoad, load } = usePayment();// eslint-disable-next-line
  const [Cancleorders, setCancleOrder] = useState();

  const MakePayment = () => {
    setLoad(true);
    const variant_id = usercart
      .map((item) => item.product_variant_id)
      .join(", ");

    const qty = usercart.map((item) => item.qty).join(", ");

    const price = localStorage.getItem("price");
    const tip = localStorage.getItem("tip");
    const order_id = localStorage.getItem("order_id");

    Place_Order(
      variant_id,
      qty,
      price,
      0,
      "razorpay",
      "awaiting",
      SelectedAddress,
      tip,
      "razorpay"
    );
    //   razorpay
    const options = {
      key: config.razorpay_public_key,
      amount: price * 100,
      name: "eRestro",
      description: "eRestro",
      order_id: orders,
      prefill: {
        contact: currentUser.mobile,
        email: currentUser.email
      },
      notes: {
        order_id: order_id
      },

      handler: function (response) {
        const order_id = localStorage.getItem("order_id");
        transactions(
          order_id,
          "razorpay",
          "razorpay",
          response.razorpay_payment_id,
          price
        );
      },
      modal: {
        ondismiss: function () {
          const place_order_id = localStorage.getItem("order_id");
          api.delete_order(place_order_id).then((response) => {
            if (!response.error) {
              setCancleOrder(response.data);
            }
          });
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function () {
      api.delete_order(order_id).then((response) => {
        if (!response.error) {
          setCancleOrder(response.data);
        }
      });
    });
  };

  return (
    <Button variant="outlined" onClick={(e) => MakePayment()} color="error">
      {!load ? "Pay Now" : "Please Wait"}
    </Button>
  );
};

export default Razorpay;
