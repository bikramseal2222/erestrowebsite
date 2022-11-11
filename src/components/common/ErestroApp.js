import React, { useState, useEffect } from "react";
import { Typography, Container, Grid } from "@mui/material";
import * as api from "../../utils/api";
import Highlighter from "react-highlight-words";

const ErestroApp = () => {
  const [settings, setSettings] = useState();

  const Settings = () => {
    api
      .get_settings()
      .then((response) => {
        if (!response.error) {
          setSettings(response.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    Settings();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="side-img-wrapper" style={{ marginLeft: "50px" }}>
        <img src={process.env.PUBLIC_URL + "/images/donuts.png"} alt="donuts" />
      </div>
      <div className="side-img-wrapper right dnone">
        <img
          src={process.env.PUBLIC_URL + "/images/64809-pizza-loading.gif"}
          alt="pizzaslice"
        />
      </div>
      <Container>
        <div className="app-wrapper">
          <div className="app-store-wrapper">
            <Grid container spacing={2}>
              <Grid item md={4}>
                <div className="app-image">
                  <img
                    src={process.env.PUBLIC_URL + "/images/Mockup.gif"}
                    alt="erestro"
                  />
                </div>
              </Grid>
              <Grid item md={8}>
                <div className="app-desc-wrapper">
                  <div className="app-desc title-wrapper">
                    <Typography
                      variant="h4"
                      component="h4"
                      className="responsive-h1-font"
                    >
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={["eRestro"]}
                        autoEscape={true}
                        textToHighlight={
                          "Your eRestro is available for your Android or Apple."
                        }
                      />
                    </Typography>
                    <Typography variant="subtitle1" component="h6" color="#000">
                      {settings &&
                        settings.web_settings[0]
                          .app_download_section_short_description}
                    </Typography>
                  </div>
                  <div className="app-store">
                    <div className="playstore">
                      <a
                        href={
                          settings &&
                          settings.web_settings[0]
                            .app_download_section_playstore_url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={process.env.PUBLIC_URL + "/images/playstore.png"}
                          alt="erestro"
                        />
                      </a>
                    </div>
                    <div className="apple">
                      <a
                        href={
                          settings &&
                          settings.web_settings[0]
                            .app_download_section_appstore_url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={process.env.PUBLIC_URL + "/images/apple.png"}
                          alt="applestore"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
      <div className="side-img-wrapper right">
        <img
          src={process.env.PUBLIC_URL + "/images/green-leaf.png"}
          alt="leaf"
        />
      </div>
    </>
  );
};

export default ErestroApp;
