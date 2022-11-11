import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import Layout from "../components/layouts/Layout";
import Breadcrumbs from "../components/breadcrumbs";
import PagesPlaceHolder from "../components/placeholders/PagesPlaceHolder";

const TermsConditions = () => {
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
      <Breadcrumbs title="Terms & Conditions" crumb="Terms & Conditions" />
      <Container>
        <div className="title-wrapper">
          <Typography variant="h4" component="h4" className="bold">
            Terms & <span className="highlight">Conditions</span>
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
              {" "}
              <Typography
                variant="body1"
                component="h5"
                dangerouslySetInnerHTML={{
                  __html: settings && settings.terms_conditions
                }}
              />
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default TermsConditions;
