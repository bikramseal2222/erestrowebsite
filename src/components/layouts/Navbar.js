import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "react-phone-input-2/lib/style.css";
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import * as api from "../../utils/api";
import i18next from "i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useCart } from "../../context/CartContext";
import Login from "../common/Login";
import OfflineCart from "../cart/OfflineCart";
import { isLogin } from "../../utils/functions";
import { toast } from "react-toastify";

const Navbar = ({ settings }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [languages, setLanguages] = useState();
  const { cartTotal } = useCart();
  const [isloading] = useState(true);

  const Languages = () => {
    api.get_languages().then((response) => {
      if (!response.error) {
        setLanguages(response.data);
      }
    });
  };

  useEffect(() => {
    Languages();
    // eslint-disable-next-line
  }, []);

  //   for language menu

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Nologin = () => {
    toast.error("Please Login.");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="desktop-header">
        <AppBar
          position="static"
          sx={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar className="main-header">
            <Link to="/">
              <div className="logo-wrapper">
                {isloading ? (
                  <>
                    <img
                      src={process.env.PUBLIC_URL + "/images/light-logo.png"}
                      alt="logo"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={settings && settings.web_settings[0].light_logo}
                      alt="logo"
                    />
                  </>
                )}
              </div>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/" style={{ margin: "auto" }}>
                <Typography
                  variant="subtitle1"
                  component="h6"
                  sx={{ marginRight: "15px" }}
                >
                  Home
                </Typography>
              </Link>

              {/* login component */}
              <Login />

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
              {/* {currentUser !== undefined && currentUser !== null ? (
                <Link to="/cart">
                  <>
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
                  </>
                </Link>
              ) : (
                <OfflineCart />
              )} */}

              {isLogin() ? (
                <Link to="/favorites">
                  <Tooltip title="favorites">
                    <IconButton size="large" aria-label="cart" color="inherit">
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
                    sx={{ fontSize: "18px", color: "#fff" }}
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
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
