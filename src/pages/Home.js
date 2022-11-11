import React, { useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import ErestroApp from "../components/common/ErestroApp";
import Services from "../components/common/Services";
import Categories from "../components/common/Categories";
import Restaurants from "../components/common/Restaurants";
import ScrollTopSec from "../components/common/ScrollTopSec";
import Slider from "../components/common/Slider";
import Food from "../components/common/Food";
import * as api from "../utils/api";
import Faq from "../components/common/Faq";
import BottomNav from "../components/layouts/BottomNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

const Home = () => {
  const [settings, setSettings] = useState();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get_settings()
      .then((response) => {
        if (!response.error) {
          setSettings(response.data);
          setLoading(false);
        }
      })
      .catch(() => {});
      // eslint-disable-next-line
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home | eRestro</title>
          <link
            rel="icon"
            href={settings && settings.web_settings[0].favicon}
          />
          <link
            rel="apple-touch-icon"
            href={settings && settings.web_settings[0].favicon}
          />
        </Helmet>
      </HelmetProvider>
      {settings &&
      settings.system_settings[0].is_web_maintenance_mode_on &&
      settings.system_settings[0].is_web_maintenance_mode_on === 1 ? (
        <>
          <Container>
            <div className="maintenance-wrapper mt20">
              <div className="maintenance-img-wrapper">
                <img
                  alt="Home"
                  src={process.env.PUBLIC_URL + "/images/under-maintenance.gif"}
                />
              </div>
              <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                currently site is an
                <span className="highlight"> under maintanence</span>.
              </Typography>
            </div>
          </Container>
        </>
      ) : (
        <>
          <Header settings={settings} isloading={isloading} />
          <ScrollTopSec />
          <Categories />
          <Services />
          <Restaurants />
          <Slider />
          <Food />
          <Faq />
          <ErestroApp />
          <Footer settings={settings} />
          <BottomNav />
        </>
      )}
    </>
  );
};

export default Home;
