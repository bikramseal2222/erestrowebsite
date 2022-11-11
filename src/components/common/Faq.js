import { Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as api from "../../utils/api";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";

const Faq = () => {
  const [cities, setCities] = useState();
  const [faqs, setFaqs] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    api.get_cities().then((response) => {
      if (!response.error) {
        setCities(response.data);
      }
    });

    api.get_faqs().then((response) => {
      if (!response.error) {
        setFaqs(response.data);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <div className="title-wrapper" data-aos="fade-up">
        <Typography variant="h4" component="h4" className="bold">
          <Highlighter
            highlightClassName="highlight"
            searchWords={["Queries?"]}
            autoEscape={true}
            textToHighlight={t("queries")}
          />
        </Typography>
        <Typography weight="light">{t("any_queries")}</Typography>
      </div>
      <div className="accordian">
        <Accordion className="mb20 accordian-wrapper">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography component="h5" variant="h6">
              Cities We Deliver
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {cities &&
                cities.map((city, index) => {
                  return (
                    <Grid item md={2} key={index}>
                      <Typography>{city.name}</Typography>
                    </Grid>
                  );
                })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {faqs &&
          faqs.map((faq, index) => {
            const { question, answer } = faq;
            return (
              <Accordion className="mb20 accordian-wrapper" key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography component="h5" variant="h6">
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </Container>
  );
};

export default Faq;
