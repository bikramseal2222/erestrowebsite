import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useState } from "react";
import CodPayment from "./CodPayment";
import Flutterwave from "./Flutterwave";
import Razorpay from "./Razorpay";
import Stripe from "./Stripe";

const Payment = ({ SelectedAddress, deliveryType }) => {
  const [status, setStatus] = useState(0);
  const paymentHandler = (active_status) => {
    setStatus(active_status);
  };
  return (
    <div className="payment-wrapper">
      <RadioGroup
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        className="payment"
        defaultValue="top"
      >
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash On Delivery"
          onClick={(e) => paymentHandler(1)}
        />

        <FormControlLabel
          value="razorpay"
          control={<Radio />}
          label="Razorpay"
          onClick={(e) => paymentHandler(2)}
        />

        <FormControlLabel
          value="stripe"
          control={<Radio />}
          label="Stripe"
          onClick={(e) => paymentHandler(3)}
        />
        <FormControlLabel
          value="Flutterwave"
          control={<Radio />}
          label="Flutterwave"
          onClick={(e) => paymentHandler(4)}
        />
      </RadioGroup>
      {status === 1 && (
        <>
          <CodPayment
            SelectedAddress={SelectedAddress}
            deliveryType={deliveryType}
          />
        </>
      )}
      {status === 2 && (
        <>
          <Razorpay
            SelectedAddress={SelectedAddress}
            deliveryType={deliveryType}
          />
        </>
      )}
      {status === 3 && (
        <>
          <Stripe
            SelectedAddress={SelectedAddress}
            deliveryType={deliveryType}
          />
        </>
      )}
      {status === 4 && (
        <>
          <Flutterwave
            SelectedAddress={SelectedAddress}
            deliveryType={deliveryType}
          />
        </>
      )}
    </div>
  );
};

export default Payment;
