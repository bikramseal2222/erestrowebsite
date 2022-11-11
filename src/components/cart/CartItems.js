import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getSign } from "../../utils/functions";
import { useCart } from "../../context/CartContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CartModal from "../common/CartModel";
import { Link } from "react-router-dom";

const CartItems = ({ setDeliveryType }) => {
  const [tip, setTip] = useState();
  const [tipValue, setTipValue] = useState();
  const { currentUser } = useAuth();
  const {
    RemoveCartData,
    usercart,
    tax_amount,
    cartData,
    clearCart,// eslint-disable-next-line
    get_promo_code
  } = useCart();
  const currency = getSign();

  const handleInput = (e) => {
    setTip(e.target.value === tip ? null : e.target.value);
  };

  const tip_amount = tip && parseFloat(tip);

  const payble_amount = cartData && cartData.overall_amount + tip_amount;

  const item_price =
    tip_amount !== null && tip_amount !== 0
      ? payble_amount
      : cartData && cartData.overall_amount;

  localStorage.setItem("price", item_price);
  localStorage.setItem("tip", tip_amount);

  const handleTipInput = (e) => {
    setTipValue(e.target.value);
  };

  const handleAddTipInput = () => {
    setTip(tipValue === tip ? null : tipValue);
    setTipValue("");
  };

  const handleDelivery = (e) => {
    setDeliveryType(e.target.value);
  };

  const handleRemoveTip = () => {// eslint-disable-next-line
    setTip(tip === tip ? null : tip);
  };

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-content-wrapper">
          <div className="user-wrapper">
            <div className="title">
              <Typography variant="h6" component="h5">
                {currentUser.username}
              </Typography>
              <Typography variant="subtitle1" component="h5">
                {currentUser.email}
              </Typography>
            </div>
          </div>
          <div className="border" />
          <div className="delivery-type">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="0"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio color="error" />}
                  label="Delivery"
                  onChange={(e) => handleDelivery(e)}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="error" />}
                  label="Self Pickup"
                  onChange={(e) => handleDelivery(e)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="border" />
          <div className="restaurant-name">
            <div className="title">
              <Typography
                variant="subtitle1"
                component="h5"
                sx={{ fontWeight: "bold" }}
              >
                ORDER FROM
              </Typography>
            </div>
          </div>
          <div className="res-name">
            <Typography variant="subtitle1" component="h5">
              {usercart &&
                usercart[0].product_details[0].partner_details[0].partner_name}
            </Typography>
            <Typography variant="subtitle1" component="h5">
              {usercart &&
                usercart[0].product_details[0].partner_details[0]
                  .partner_address}
            </Typography>
          </div>
          <div className="border" />
          <div className="res-product-wrapper">
            {usercart &&
              usercart.map((cart_item, index) => {
                const {
                  product_variant_id,
                  name,
                  special_price,
                  price,
                  qty,
                  product_details,
                  short_description,
                  minimum_order_quantity,
                  total_allowed_quantity
                } = cart_item;
                let cart_price =
                  special_price > 0 && special_price < price
                    ? special_price
                    : price;
                const addons = product_details[0].variants[0].add_ons_data
                  .map((item) => item.description)
                  .join(", ");

                return (
                  <div key={index}>
                    <div className="cart-product">
                      <div className="product-wrapper">
                        <div className="product-grid">
                          <div className="food-status">
                            <img
                              src={process.env.PUBLIC_URL + "/images/veg.png"}
                              alt="veg"
                            />
                          </div>
                          <Typography
                            variant="body1"
                            component="h5"
                            sx={{ ml: "10px" }}
                          >
                            {name}
                          </Typography>
                        </div>
                        {addons !== "" ? (
                          <div className="addons">
                            <Typography
                              variant="body2"
                              component="h5"
                              sx={{ ml: "30px" }}
                            >
                              <b>addons </b> : {addons}
                            </Typography>
                          </div>
                        ) : null}
                        <div className="price">
                          <Typography
                            variant="body1"
                            component="h5"
                            sx={{ ml: "30px" }}
                          >
                            {currency}
                            {cart_price}× {qty}
                          </Typography>
                        </div>
                      </div>
                      <div className="update-product mt20">
                        <CartModal
                          title={name}
                          short_description={short_description}
                          indicator={
                            product_details &&
                            product_details[0].partner_details[0]
                              .partner_indicator
                          }
                          rating={
                            product_details &&
                            product_details[0].partner_details[0].partner_rating
                          }
                          variants={
                            product_details && product_details[0].variants
                          }
                          minimum_order_quantity={minimum_order_quantity}
                          total_allowed_quantity={total_allowed_quantity}
                          addons={
                            product_details &&
                            product_details[0].product_add_ons
                          }
                          is_restro_open={
                            product_details &&
                            product_details[0].partner_details[0].is_restro_open
                          }
                          partner_id={
                            product_details &&
                            product_details[0].partner_details[0].partner_id
                          }
                          product_qty={qty}
                          type="edit_cart"
                        />
                        <Button
                          variant="text"
                          color="error"
                          onClick={(e) => RemoveCartData(product_variant_id)}
                        >
                          Remove from Cart
                        </Button>
                      </div>
                    </div>
                    <div className="border" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="clear_cart">
          <Button
            variant="outlined"
            fullWidth
            color="error"
            onClick={(e) => clearCart()}
          >
            Clear Cart
          </Button>
        </div>
        <div className="border" />
        <div className="add_more_food">
          <Grid container spacing={2}>
            <Grid item md={10}>
              <Typography>Add more food in cart</Typography>
            </Grid>
            <Grid item md={2}>
              <Link
                to={`/restaurant/${
                  usercart[0] &&
                  usercart[0].product_details[0].partner_details[0].slug
                }`}
              >
                <AddCircleIcon color="error" />
              </Link>
            </Grid>
          </Grid>
        </div>
        <div className="border" />
        {/* <div className="promo-code">
          <Grid container spacing={2}>
            <Grid item md={9}>
              <Typography>Add Coupon</Typography>
            </Grid>
            <Grid item md={3}>
              <Button
                variant="text"
                onClick={() => getOffers()}
                color="error"
                sx={{ textTransform: "capitalize" }}
              >
                View all
              </Button>
            </Grid>
          </Grid>
        </div> */}
        <div className="border" />
        <div className="rider-tip">
          <div className="tip-header">
            <Typography component="h5" variant="body1">
              Support Your Rider
            </Typography>
            <Typography component="h5" variant="body2">
              Helping your delivery rider by adding tip
            </Typography>
          </div>
          <div className="tip-wrapper">
            <Button color="error" value="10" onClick={(e) => handleInput(e)}>
              +10
            </Button>
            <Button color="error" value="20" onClick={(e) => handleInput(e)}>
              +20
            </Button>
            <Button color="error" value="30" onClick={(e) => handleInput(e)}>
              +30
            </Button>
            <Button color="error" value="50" onClick={(e) => handleInput(e)}>
              +50
            </Button>
          </div>
          <div className="custom-tip">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                color="error"
                value={tipValue}
                onChange={handleTipInput}
                placeholder="custom tip"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight"
                }}
              />
            </FormControl>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleAddTipInput()}
              sx={{ marginTop: "15px", textTransform: "capitalize" }}
            >
              Add
            </Button>
          </div>
          <div className="border"></div>
          <div className="bill-details-wrapper">
            <div className="bill-Typography-header">
              <Typography component={"span"} variant={"body2"}>
                Bill Details
              </Typography>
            </div>
            <div className="bill-details">
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-row"
                      >
                        Subtotal Total
                      </TableCell>
                      <TableCell align="right">
                        {currency}
                        {cartData && cartData.sub_total}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-row"
                      >
                        Charges and Taxes
                      </TableCell>
                      <TableCell align="right">
                        {currency}
                        {cartData && tax_amount}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-row"
                      >
                        Total
                      </TableCell>
                      <TableCell align="right">
                        {currency}
                        {cartData && cartData.overall_amount}
                      </TableCell>
                    </TableRow>
                    {tip !== null ? (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 }
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="table-row"
                          >
                            Delivery Tip
                          </TableCell>
                          <TableCell align="right">
                            {currency}
                            {tip}

                            <Button
                              color="error"
                              value="10"
                              className="remove_tip"
                              onClick={(e) => handleRemoveTip()}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ) : null}

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-row"
                      >
                        Grand Total
                      </TableCell>
                      <TableCell align="right">
                        {currency}
                        {item_price}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
