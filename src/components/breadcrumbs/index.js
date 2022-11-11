import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const index = ({
  crumb,
  category,
  partner_name,
  crumb_link = "",
  link = ""
}) => {
  return (
    <div>
      <div className="breadcrumb-wrapper">
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              to="/"
            >
              Home
            </Link>
            <Link to={crumb_link}>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.primary"
              >
                {crumb}
              </Typography>
            </Link>
            {category !== 0 && category !== null ? (
              <Link to="">{category}</Link>
            ) : null}
            {partner_name !== 0 && partner_name !== null ? (
              <Link to={link}>{partner_name}</Link>
            ) : null}
          </Breadcrumbs>
        </Container>
      </div>
    </div>
  );
};

export default index;
