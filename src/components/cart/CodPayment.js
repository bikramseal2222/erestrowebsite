import { Button } from "@mui/material";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import * as api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CodPayment = ({ SelectedAddress, deliveryType }) => {
  const { usercart } = useCart();// eslint-disable-next-line
  const [orders, setOrders] = useState();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const paymentHandler = () => {
    const variant_id = usercart
      .map((item) => item.product_variant_id)
      .join(", ");

    const qty = usercart.map((item) => item.qty).join(", ");
    const price = localStorage.getItem("price");

    setLoad(true);
    api
      .place_order(
        variant_id,
        qty,
        price,
        0,
        "COD",
        "pending",
        SelectedAddress,
        "",
        deliveryType
      )
      .then((response) => {
        setLoad(false);
        setOrders(response.data);
        navigate("/confirmed");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Button variant="outlined" onClick={paymentHandler} color="error">
        {!load ? "Pay Now" : "Please Wait"}
      </Button>
    </div>
  );
};

export default CodPayment;
