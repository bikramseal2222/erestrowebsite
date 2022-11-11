import {
  Badge,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Button
} from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import { getSign } from "../../utils/functions";
import Login from "../common/Login";
import { useCart } from "../../context/CartContext";
import CartModel from "../common/CartModel";

const OfflineCart = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const currency = getSign();
  const { Remove_data, usercart, cartTotal, ClearOfflineCart } = useCart();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Remove = (product_variant_id) => {
    Remove_data(product_variant_id);
  };

  const ClearCart = () => {
    ClearOfflineCart();
  };

  return (
    <div>
      <Tooltip title="Cart">
        <IconButton size="large" color="inherit" onClick={handleClick}>
          <Badge
            badgeContent={cartTotal !== "" ? cartTotal : null}
            color="error"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <div style={{ padding: "15px" }}>
          {usercart !== null && usercart !== "" ? (
            <div>
              {usercart &&
                usercart.map((cart, index) => {
                  const {
                    image,
                    title,
                    price,
                    qty,
                    product_variant_id,
                    minimum_order_quantity,
                    total_allowed_quantity,
                    short_description,
                    indicator,
                    addons,
                    variants,
                    rating,
                    is_restro_open,
                    partner_id
                  } = cart;
                  return (
                    <div key={index}>
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          <div className="offline-product-img-wrapper">
                            <img src={image} alt="product" />
                          </div>
                        </Grid>
                        <Grid item md={8}>
                          <div className="offline-product-wrapper">
                            <Typography variant="subtitle1" component="h5">
                              {title}
                            </Typography>
                            <Grid container>
                              <Grid item md={6}>
                                <Typography variant="subtitle1" component="h5">
                                  {currency}
                                  {price}× {qty}
                                </Typography>
                              </Grid>
                              {/* <Grid item md={6}>
                                <Typography variant="subtitle1" component="h5">
                                  {currency}
                                  {sub_total}
                                </Typography>
                              </Grid> */}
                            </Grid>
                            <CartModel
                              title={title}
                              short_description={short_description}
                              indicator={indicator}
                              rating={rating}
                              variants={variants}
                              minimum_order_quantity={minimum_order_quantity}
                              total_allowed_quantity={total_allowed_quantity}
                              addons={addons}
                              is_restro_open={is_restro_open}
                              partner_id={partner_id}
                              type="edit_cart"
                              product_qty={qty}
                            />
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => Remove(product_variant_id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                      <div className="border" />
                    </div>
                  );
                })}
              <Button
                variant="contained"
                fullWidth
                color="error"
                className="mb20"
                onClick={() => ClearCart()}
              >
                Clear Cart
              </Button>

              <div className="send-button">
                <Button variant="contained" fullWidth>
                  <Login />
                </Button>
              </div>
            </div>
          ) : (
            <div className="empty_cart" style={{ padding: "20px" }}>
              <Typography> your cart is empty!</Typography>
            </div>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default OfflineCart;
