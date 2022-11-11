import { Grid, Typography, Container, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import * as api from "../../utils/api";

const Footer = ({ settings }) => {
  const [cities, setCities] = useState();

  useEffect(() => {
    api
      .get_cities(3)
      .then((response) => {
        if (!response.error) {
          setCities(response.data);
        }
      })
      .catch(() => {});
      // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/background.jpg"
        })`
      }}
      className="footer-content-wrapper"
    >
      <div className="side-img-wrapper">
        <img
          src={process.env.PUBLIC_URL + "/images/red-chilli-paste.png"}
          alt="chilli"
        />
      </div>
      <Container>
        <div className="footer-wrapper">
          <Grid container spacing={2} justify="center">
            <Grid item md={3}>
              <div className="footer-logo-wrapper">
                <div className="footer-logo">
                  <img
                    src={settings && settings.web_settings[0].light_logo}
                    alt="logo"
                  />
                </div>
                <div className="footer-desc-wrapper">
                  <Typography color="#fff">
                    {settings && settings.web_settings[0].app_short_description}
                  </Typography>
                </div>
                <div className="become-partner" style={{ marginTop: "20px" }}>
                  <a
                    href="http://erestro.wrteam.co.in/partner/auth/sign_up"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="contained" color="error">
                      Become a partner
                    </Button>
                  </a>
                </div>
              </div>
            </Grid>
            <Grid item md={3} sx={{ width: "100%" }}>
              <div className="footer-services-wrapper">
                <div className="footer-desc-title">
                  <Typography color="#fff" variant="h6" component="h6">
                    Learn <span className="highlight">More</span>
                  </Typography>
                </div>
                <div className="footer-services">
                  <ul>
                    <li>
                      <Link to="/privacy">
                        <Typography variant="subtitle1" component="h6">
                          Privacy
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions">
                        <Typography variant="subtitle1" component="h6">
                          Terms & Conditions
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact-us">
                        <Typography variant="subtitle1" component="h6">
                          Contact Us
                        </Typography>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="footer-product-wrapper">
                <div className="footer-desc-title">
                  <Typography color="#fff" variant="h6" component="h6">
                    We <span className="highlight">Deliver</span> to
                  </Typography>
                </div>
                <div className="footer-services">
                  <ul>
                    {cities &&
                      cities.map((city, index) => {
                        return (
                          <li key={index}>
                            <Typography variant="subtitle1" component="h6">
                              {city.name}
                            </Typography>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item md={3}>
              <div className="contactUs-wrapper">
                <div className="footer-desc-title">
                  <Typography color="#fff" variant="h6" component="h6">
                    <span className="highlight"> Contact</span> Us
                  </Typography>
                </div>
                <div className="footer-services">
                  <Typography
                    color="#fff"
                    dangerouslySetInnerHTML={{
                      __html: settings && settings.web_settings[0].address
                    }}
                  />
                  <Typography color="#fff">
                    {settings && settings.web_settings[0].support_email}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="footer-bottom">
          <Grid container spacing={2}>
            <Grid item md={6}>
              <div className="footer-bottom-Typography ">
                <Typography color="#fff" variant="subtitle1" component="h6">
                  © Copyright 2016 - 2022 -
                  <span className="highlight">
                    <a
                      href="https://wrteam.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WRTeam
                    </a>
                  </span>
                </Typography>
              </div>
            </Grid>
            <Grid item md={6} justify="end">
              <div className="social-icons">
                <Link to="/">
                  <FacebookIcon />
                </Link>
                <Link to="/">
                  <InstagramIcon />
                </Link>

                <Link to="/">
                  <WhatsAppIcon />
                </Link>
                <Link to="/">
                  <LinkedInIcon />
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Footer;
