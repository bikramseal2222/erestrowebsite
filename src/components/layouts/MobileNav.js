import React from "react";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import Login from "../common/Login";

const MobileNav = ({ logo }) => {
  return (
    <nav className="mobile-header home-header">
      <Grid container className="mobileNav">
        <Grid item md={8} className="mobileNavGrid">
          <div className="logo">
            <NavLink to="/">
              <div className="header-logo">
                <img src={logo} alt="logo" />
              </div>
            </NavLink>
          </div>
        </Grid>
        <Grid item md={2} className="mobileNavGrid" sx={{ marginLeft: "auto" }}>
          <Login />
        </Grid>
      </Grid>
      <div id="recaptcha-container"></div>
    </nav>
  );
};

export default MobileNav;
