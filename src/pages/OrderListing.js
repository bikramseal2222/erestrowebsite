import { Button, CardMedia, Grid, Pagination, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import OrderDetails from "./OrderDetails";
import Nofound from "./Nofound";
import { getSign } from "../utils/functions";

const OrderListing = () => {
  const currency = getSign();
  const [orders, setOrders] = useState([]);
  const [per_page] = useState(3);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const Orders = (offset = 0) => {
    api
      .get_orders("", per_page, offset)
      .then((response) => {
        if (!response.error) {
          var totalPages = parseInt(response.total) / per_page;
          totalPages = Math.ceil(totalPages);
          setPage(totalPages);
          setOrders(response.data);
          console.log(response.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    Orders();
    // eslint-disable-next-line
  },[]);

  const CancleOrder = (id) => {
    api
      .update_order_status("cancelled", id, "test")
      .then((response) => {
        if (!response.error) {
          setOrders(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (event, selectedPage) => {
    if (currentPage !== selectedPage) {
      const offset = (selectedPage - 1) * per_page;
      setCurrentPage(selectedPage);
      Orders(offset);
    }
  };

  return (
    <>
      {orders && orders !== 0 ? (
        <>
          {orders &&
            orders.map((order, index) => {
              const { order_items, total_payable, active_status, id, address } =
                order;
              var status = [
                "awaiting",
                "pending",
                "preparing",
                "out_for_delivery",
                "delivered",
                "cancelled"
              ];
              const cancelable_till = order_items[0].cancelable_till;
              var cancellable_index = status.indexOf(cancelable_till);
              var active_index = status.indexOf(active_status);

              return (
                <div className="order-wrapper" key={index}>
                  <div className="order-content-wrapper">
                    <Grid container spacing={3}>
                      <Grid item md={2}>
                        <div className="order-image-wrapper">
                          <CardMedia
                            component="img"
                            alt={order_items[0].name}
                            height="140"
                            image={
                              order_items[0].partner_details[0].partner_profile
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item md={10}>
                        <div className="order-name-wrapper">
                          <Grid container>
                            <Grid item md={6} sx={{ mt: "", mb: "" }}>
                              <Typography
                                variant="h6"
                                component="h5"
                                className="ml20"
                              >
                                {order_items[0].partner_details[0].partner_name}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="h5"
                                className="order-location-wrapper ml20"
                                color="var(--light-color--)"
                              >
                                {address}
                              </Typography>
                            </Grid>
                            <Grid item md={6} sx={{ textAlign: "end" }}>
                              <Button
                                color="success"
                                sx={{ fontWeight: "bold" }}
                              >
                                {active_status}
                              </Button>
                            </Grid>
                          </Grid>
                          {order.order_items.map((order_data, index) => {
                            const { product_name, quantity } = order_data;
                            return (
                              <Typography
                                variant="subtitle1"
                                component="h5"
                                className="order-summary ml20"
                                key={index}
                              >
                                {product_name} ×{" "}
                                <span style={{ color: "var(--light-color--)" }}>
                                  {quantity}
                                </span>
                              </Typography>
                            );
                          })}
                          <Typography
                            variant="body2"
                            component="h5"
                            color="var(--light-color--)"
                            className="order-summary ml20"
                          >
                            {order_items[0].date_added}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                    <div className="border" />
                    <div className="total-amount">
                      <Grid container>
                        <Grid item md={6} className="bill-detail-wrapper">
                          <Typography variant="subtitle1" component="h5">
                            Total Pay
                          </Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            variant="subtitle1"
                            component="h5"
                            sx={{ textAlign: "end" }}
                          >
                            {currency} {total_payable}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="border" />
                    <div className="order-btn-wrapper ">
                      <OrderDetails id={id} />
                      {order_items[0].is_cancelable === 1 &&
                      active_index <= cancellable_index ? (
                        <Button
                          key={index}
                          variant="contained"
                          color="error"
                          onClick={(e) => CancleOrder(id)}
                        >
                          cancel Order
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="pagination">
            <Pagination
              count={page}
              color="error"
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              defaultPage={currentPage}
            />
          </div>
        </>
      ) : (
        <>
          <Nofound />
        </>
      )}
    </>
  );
};

export default OrderListing;
