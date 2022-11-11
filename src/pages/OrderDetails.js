import { Avatar, Grid, Typography, Button, Modal, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import { getSign } from "../utils/functions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const OrderDetails = ({ id }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const currency = getSign();

  const [orders, setOrders] = useState();

  useEffect(() => {
    api
      .get_orders(id)
      .then((response) => {
        if (!response.error) {
          setOrders(response.data[0]);
        }
      })
      .catch(() => {});
  }, [id]);

  return (
    <>
      <Button color="success" variant="outlined" onClick={handleOpen}>
        Order Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Summary
          </Typography>
          <div className="border" />
          <div>
            <div className="order-detail-img-wrapper">
              <Avatar
                size="xl"
                src={
                  orders &&
                  orders.order_items[0].partner_details[0].partner_profile
                }
              />
              <div className="order-detail-desc">
                <Typography variant="body1" component="p">
                  {orders &&
                    orders.order_items[0].partner_details[0].partner_name}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ color: "var(--light-color--)" }}
                >
                  {orders &&
                    orders.order_items[0].partner_details[0].partner_address}
                </Typography>
              </div>
            </div>
            <div className="border" />
            <div className="order-details-wrapper">
              {orders &&
                orders.order_items.map((order_data, index) => {
                  return (
                    <div key={index}>
                      <Typography
                        variant="body2"
                        component="p"
                        key={index}
                        sx={{ fontWeight: 600 }}
                      >
                        {order_data.product_name}
                      </Typography>
                      <Grid container>
                        <Grid item md={10}>
                          <Typography variant="body2" component="p">
                            <span>{order_data.quantity}</span> × {currency}
                            {order_data.price}
                          </Typography>
                        </Grid>
                        <Grid item md={2} sx={{ textAlign: "end" }}>
                          <Typography variant="body2" component="p">
                            {currency}
                            {order_data.sub_total}
                          </Typography>
                        </Grid>
                      </Grid>
                      <div className="border" />
                    </div>
                  );
                })}
            </div>
            <div className="order-total">
              <Grid container>
                <Grid item md={6} className="order-details">
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: 600 }}
                  >
                    Total
                  </Typography>

                  <Typography variant="body1" component="p">
                    Taxes & Charges
                  </Typography>

                  <Typography variant="body1" component="p">
                    Total Pay
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{ textAlign: "end" }}
                  className="order-details"
                >
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: 600 }}
                  >
                    {currency} {orders && orders.total}
                  </Typography>

                  <Typography variant="body1" component="p">
                    {currency}
                    {orders && orders.tax_amount}
                  </Typography>

                  <Typography variant="body1" component="p" className="values">
                    {currency}
                    {orders && orders.total_payable}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="border" />
            <div className="total">
              <Grid container>
                <Grid item md={6}>
                  <Typography variant="body1" component="p" className="bold">
                    Grand Total
                  </Typography>
                </Grid>
                <Grid item md={6} sx={{ textAlign: "end" }}>
                  <Typography variant="body1" component="p" className="bold">
                    {currency}
                    {orders && orders.total_payable}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className="border" />
            <div className="order-summary">
              <div className="order-payment-wrapper">
                <div className="order-id order-style">
                  <Typography variant="body1" component="p">
                    ORDER ID
                  </Typography>
                  <Typography
                    className="mb20 light"
                    variant="body2"
                    component="p"
                  >
                    {orders && orders.order_items[0].order_id}
                  </Typography>
                </div>
                <div className="payment-type order-style">
                  <Typography variant="body1" component="p">
                    PAYMENT
                  </Typography>
                  <Typography
                    className="mb20 light"
                    variant="body2"
                    component="p"
                  >
                    paid : using {orders && orders.payment_method}
                  </Typography>
                </div>
                <div className="order-date order-style">
                  <Typography variant="body1" component="p">
                    DATE
                  </Typography>
                  <Typography
                    className="mb20 light"
                    variant="body2"
                    component="p"
                  >
                    {orders && orders.date_added}
                  </Typography>
                </div>
                <div className="order-phonenum order-style">
                  <Typography variant="body1" component="p">
                    PHONE NO
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className="light mb20"
                  >
                    {orders && orders.mobile.substring(0, 7)}×××
                  </Typography>
                </div>
                <div className="order-phonenum order-style">
                  <Typography variant="body1" component="p">
                    Deliver to
                  </Typography>
                  <Typography variant="body2" component="p" className="light">
                    {orders && orders.address}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClose}
            color="error"
            className="mt20"
            sx={{ textTransform: "capitalize" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default OrderDetails;
