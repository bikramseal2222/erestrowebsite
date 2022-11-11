import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header1 from "../layouts/Header1";
import Footer from "../layouts/Footer";
import MobileNav from "./MobileNav";
import * as api from "../../utils/api";
import BottomNav from "./BottomNav";

const Layout = ({ children, ...props }) => {
  const [settings, setSettings] = useState();
  // eslint-disable-next-line
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
      <Header1 settings={settings} />
      <MobileNav logo={settings && settings.web_settings[0].logo} />
      <HelmetProvider>
        <Helmet>
          <title>{props.title} | eRestro</title>
          <link
            rel="icon"
            href={settings && settings.web_settings[0].favicon}
          />
          <link
            rel="apple-touch-icon"
            href={settings && settings.web_settings[0].favicon}
          />
        </Helmet>
        {children}
      </HelmetProvider>
      <Footer settings={settings} />
      <BottomNav />
    </>
  );
};

export default Layout;
