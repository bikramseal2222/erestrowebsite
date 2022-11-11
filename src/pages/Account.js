import {
  Container,
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
  Button,
  Modal,
  TextField
} from "@mui/material";
import React, { Fragment } from "react";
import Layout from "../components/layouts/Layout";
import PropTypes from "prop-types";
import OrderListing from "./OrderListing";
import UserAddress from "./UserAddress";
import Breadcrumbs from "../components/breadcrumbs/";
import { useState } from "react";
import Transactions from "./Transactions";
import { useTranslation } from "react-i18next";
import { useProfile } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import { isLogin } from "../utils/functions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Account = () => {
  const [value, setValue] = useState(0);
  const [addresses, setAddress] = useState([]);
  const { t } = useTranslation();
  const { editProfile, UserInfo } = useProfile();
  const { currentUser } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // edit profile

  const [user, setUser] = useState({ username: "", email: "" });
  const { username, email } = user;

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const EditUserData = () => {
    editProfile(username, email);
    handleClose(true);
  };

  return (
    <Fragment>
      <Layout title={t("Accounts")}>
        <Breadcrumbs title={t("Accounts")} crumb={t("Accounts")} />
        <Container>
          {isLogin() ? (
            <>
              <div className="profile-sec">
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Typography variant="h5" component="h5">
                      {UserInfo !== null
                        ? UserInfo.username
                        : currentUser.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h5"
                      className="light"
                    >
                      {currentUser.mobile}
                      {bull}
                      {UserInfo !== null ? UserInfo.email : currentUser.mobile}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sx={{ textAlign: "end" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleOpen}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className="desktop-tabs">
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex"
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className="vertical-tab"
                    aria-label="Vertical tabs example"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider"
                    }}
                  >
                    <Tab
                      label="My Orders"
                      {...a11yProps(0)}
                      className="tabs-btn"
                    />
                    <Tab
                      label="Address"
                      {...a11yProps(1)}
                      className="tabs-btn"
                    />
                    <Tab
                      label="Transactions"
                      {...a11yProps(2)}
                      className="tabs-btn"
                    />
                  </Tabs>

                  <TabPanel value={value} index={0}>
                    <OrderListing />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <UserAddress
                      addresses={addresses}
                      setAddress={setAddress}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Transactions />
                  </TabPanel>
                </Box>
              </div>

              <div className="mobile-tabs">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab
                      label="My Orders"
                      {...a11yProps(0)}
                      className="tabs-btn"
                    />
                    <Tab
                      label="Address"
                      {...a11yProps(1)}
                      className="tabs-btn"
                    />
                    <Tab
                      label="Transactions"
                      {...a11yProps(2)}
                      className="tabs-btn"
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <OrderListing />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <UserAddress />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Transactions />
                </TabPanel>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="edit-modal">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    className="mb20"
                  >
                    Edit Your Profile
                  </Typography>
                  <TextField
                    fullWidth
                    label="username"
                    defaultValue={
                      UserInfo !== undefined && UserInfo !== null
                        ? UserInfo.username
                        : currentUser.username
                    }
                    name="username"
                    className="mb20"
                    onChange={handleInput}
                  />
                  <TextField
                    fullWidth
                    label="mobile"
                    className="mb20"
                    name="mobile"
                    disabled
                    value={
                      UserInfo !== undefined && UserInfo !== null
                        ? UserInfo.mobile
                        : currentUser.mobile
                    }
                    onChange={handleInput}
                  />
                  <TextField
                    fullWidth
                    label="email"
                    id="fullWidth"
                    className="mb20"
                    name="email"
                    defaultValue={
                      UserInfo !== undefined && UserInfo !== null
                        ? UserInfo.email
                        : currentUser.email
                    }
                    onChange={handleInput}
                  />

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => EditUserData()}
                  >
                    Save
                  </Button>
                </Box>
              </Modal>
            </>
          ) : (
            <div className="no_login">
              <img
                src={process.env.PUBLIC_URL + "/images/Mobile-login.jpg"}
                alt="login"
              />
              <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: "center" }}
              >
                Please <span className="highlight">Login.</span>
              </Typography>
            </div>
          )}
        </Container>
      </Layout>

      {/* model */}
    </Fragment>
  );
};

export default Account;
