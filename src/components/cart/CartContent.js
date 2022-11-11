import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material/";
import Address from "./Address";
import Layout from "../layouts/Layout";
import Breadcrumbs from "../breadcrumbs";
import CartItems from "./CartItems";
import Payment from "./Payment";
import { Link } from "react-router-dom";
import { useAddress } from "../../context/AddressContext";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const CartContent = () => {
  const { addresses } = useAddress();
  const [SelectedAddress, setSelectedAddress] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const { usercart } = useCart();
  const [deliveryType, setDeliveryType] = useState(0);
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Layout title={t("cart")}>
      <Breadcrumbs crumb={t("Cart")} />
      <Container sx={{ mt: "30px" }}>
        {usercart !== null && usercart !== 0 ? (
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                color="error"
              >
                {deliveryType === 0 ? (
                  <Step>
                    <StepLabel>Address</StepLabel>
                    <StepContent>
                      <Address
                        addresses={addresses}
                        setSelectedAddress={setSelectedAddress}
                        SelectedAddress={SelectedAddress}
                      />

                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            continue
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ) : null}
                <Step>
                  <StepLabel>Payment</StepLabel>
                  <StepContent>
                    <Payment
                      SelectedAddress={SelectedAddress}
                      deliveryType={deliveryType}
                    />
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                      </Button>
                    </Paper>
                  </StepContent>
                </Step>
              </Stepper>
            </Grid>
            <Grid
              item
              md={4}
              className="cart-items-wrapper"
              sx={{ margin: "auto" }}
            >
              <CartItems
                SelectedAddress={SelectedAddress}
                setDeliveryType={setDeliveryType}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <div className="no-cart-data">
              <img
                src={process.env.PUBLIC_URL + "/images/empty.jpg"}
                alt="empty cart"
              />
              <Typography
                variant="h6"
                component="h5"
                sx={{ textAlign: "center" }}
              >
                No order yet!
              </Typography>
              <Typography
                variant="subtitle1"
                component="h5"
                sx={{ textAlign: "center" }}
              >
                Looks like you haven't made your choice yet.
              </Typography>
              <Link to="/restaurants">
                <Button variant="outlined" color="error">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default CartContent;
