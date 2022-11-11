import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import Layout from "../components/layouts/Layout";
import Breadcrumbs from "../components/breadcrumbs";
import PagesPlaceHolder from "../components/placeholders/PagesPlaceHolder";

const Privacy = () => {
  const [settings, setSettings] = useState();
  const [isLoading, setLoading] = useState(true);
  const Settings = () => {
    api
      .get_settings()
      .then((response) => {
        if (!response.error) {
          setLoading(false);
          setSettings(response.data);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Settings();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Privacy Policy">
      <Breadcrumbs title="Privacy" crumb="Privacy" />
      <Container>
        <div className="title-wrapper">
          <Typography variant="h4" component="h4" className="bold">
            Privacy <span className="highlight">Policy</span>
          </Typography>
          <Typography weight="light">
            ullamcorper morbi tincidunt ornare massa eget egestas
          </Typography>
        </div>
        <div className="privacy-content">
          {isLoading ? (
            <PagesPlaceHolder />
          ) : (
            <>
              <Typography
                variant="h6"
                component="h5"
                dangerouslySetInnerHTML={{
                  __html: settings && settings.privacy_policy
                }}
              />
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Privacy;
