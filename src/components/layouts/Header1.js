import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Badge
} from "@mui/material";
import SearchBarNew from "../Search/SearchBarNew";
import { Box, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import i18next from "i18next";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../../context/CartContext";
import Login from "../common/Login";
import * as api from "../../utils/api";
import OfflineCart from "../cart/OfflineCart";
import { toast } from "react-toastify";
import { isLogin } from "../../utils/functions";

const Header1 = ({ settings }) => {
  const [languages, setLanguages] = useState();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { cartTotal } = useCart();
  const [isloading] = useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    api.get_languages().then((response) => {
      if (!response.error) {
        setLanguages(response.data);
      }
    });
    // eslint-disable-next-line
  }, []);

  const Nologin = () => {
    toast.error("Please Login.");
  };
  return (
    <Container>
      <div className="header-wrapper-sec desktop-header">
        <Grid container spacing={2}>
          <Grid item md={3}>
            <div className="logo-wrapper">
              {isloading ? (
                <>
                  <Link to="/">
                    <img
                      src={process.env.PUBLIC_URL + "/images/dark-logo.png"}
                      alt="logo"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <img
                      src={settings && settings.web_settings[0].logo}
                      alt="logo"
                    />
                  </Link>
                </>
              )}
            </div>
          </Grid>
          <Grid item md={5} sx={{ margin: "auto" }} className="hidden-search">
            <SearchBarNew width="550px" />
          </Grid>
          <Grid item md={4} sx={{ margin: "auto" }}>
            <div className="menu-wrapper">
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to="/" style={{ margin: "auto" }}>
                  <Typography
                    variant="subtitle1"
                    component="h6"
                    sx={{ marginRight: "15px", color: "#000" }}
                  >
                    Home
                  </Typography>
                </Link>

                {/* login component */}
                <div className="login">
                  <Login />
                </div>

                {isLogin() ? (
                  <Link to="/cart">
                    <Tooltip title="Cart">
                      <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge
                          badgeContent={cartTotal !== 0 ? cartTotal : null}
                          color="error"
                        >
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Link>
                ) : (
                  <OfflineCart />
                )}

                {isLogin() ? (
                  <Link to="/favorites">
                    <Tooltip title="favorites">
                      <IconButton
                        size="large"
                        aria-label="cart"
                        color="inherit"
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                ) : (
                  <Tooltip title="favorites">
                    <IconButton
                      size="large"
                      aria-label="cart"
                      color="inherit"
                      onClick={Nologin}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <Box sx={{ flexGrow: 0, margin: "auto" }}>
                  <Tooltip title="Language">
                    <IconButton
                      className="share-btn"
                      onClick={handleOpenNavMenu}
                      sx={{ fontSize: "18px", color: "#000" }}
                    >
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    value="test"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left"
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    {languages &&
                      languages.map((lang, index) => {
                        const { country_code, code, language } = lang;
                        return (
                          <MenuItem
                            key={index}
                            onClick={handleCloseNavMenu}
                            value={language}
                          >
                            <Typography
                              onClick={() => i18next.changeLanguage(code)}
                              className="lng-btn"
                            >
                              <span className="flag-icon">
                                <ReactCountryFlag
                                  style={{
                                    width: "1.5em",
                                    height: "1.5em",
                                    marginRight: "20px"
                                  }}
                                  countryCode={country_code}
                                  svg
                                  title={country_code}
                                />
                              </span>
                              {language}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                  </Menu>
                </Box>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Header1;
