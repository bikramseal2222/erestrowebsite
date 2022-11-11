import React from "react";
import { Typography, Container } from "@mui/material";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import SearchBarNew from "../Search/SearchBarNew";
import MobileSearchBar from "../Search/MobileSearchBar";

const Header = ({ settings }) => {
  return (
    <div className="header-wrapper">
      <Container>
        <nav>
          <Navbar settings={settings} />
          <MobileNav logo={settings && settings.web_settings[0].light_logo} />
        </nav>
      </Container>
      <div className="hero-section-wrapper">
        <Typography variant="h4" component="h4">
          Feeling <span className="highlight">hungry</span>, but don't want to
          go out?
        </Typography>
        <Typography variant="h6" component="h6">
          Don't worry! We can help you find, order & deliver food quickly &
          easily.
        </Typography>
        <div className="searchbar">
          <SearchBarNew width="700px" />
          <MobileSearchBar width="700px" />
        </div>
      </div>
    </div>
  );
};

export default Header;
