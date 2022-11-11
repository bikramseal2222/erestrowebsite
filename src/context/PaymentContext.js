import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as api from "../utils/api";

const PayContext = createContext();

export function usePayment() {
  return useContext(PayContext);
}

export function PaymentContext({ children }) {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const Place_Order = (
    variant_id,
    qty,
    total,
    wallet,
    payment_method,
    active_status,
    address,
    delivery_tip = 0,
    type
  ) => {
    api
      .place_order(
        variant_id,
        qty,
        total,
        wallet,
        payment_method,
        active_status,
        address,
        delivery_tip
      )
      .then((response) => {
        if (response.order_id === null) {
          return null;
        } else {
          setLoad(false);
          localStorage.setItem("order_id", response.order_id);
          setOrders(response.order_id);
          api.payment_intent(response.order_id, type).then((res) => {
            localStorage.setItem("client_id", res.client_secret);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   add_transactions

  const transactions = (order_id, type, payment_method, txn_id, amount) => {
    api
      .add_transaction(
        order_id,
        type,
        payment_method,
        txn_id,
        amount,
        "success",
        "done"
      )
      .then(() => {
        toast("Congratulations Order Placed Successfully..");
        navigate("/confirmed");
        window.location.reload();
        localStorage.removeItem("order_id");
      });
  };

  const value = {
    Place_Order,
    orders,
    transactions,
    setLoad,
    load
  };

  return <PayContext.Provider value={value}>{children}</PayContext.Provider>;
}
