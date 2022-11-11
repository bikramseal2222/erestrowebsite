import { Typography, Grid, Pagination, Button, Checkbox } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import ProductFlatCard from "../components/products/ProductFlatCard";
import Breadcrumbs from "../components/breadcrumbs";
import * as api from "../utils/api";
import ResPlaceholder from "../components/placeholders/ResPlaceholder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useSearch } from "../context/SearchContext";
import { useFavorites } from "../context/FavoriteContext";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";
import Nofound from "./Nofound";

const RestaurantsListing = () => {
  const { restaurants, isLoading, setRestaurants } = useSearch();

  const [active, setActive] = useState();
  const { add, remove } = useFavorites();
  const { t } = useTranslation();

  // veg filter
  const vegFilter = (veg) => {
    setActive(veg);
    api
      .get_partners("", "", "", 1)
      .then((response) => {
        if (!response.error) {
          setRestaurants(response.data);
        }
      })
      .catch(() => {});
  };

  // non veg filter
  const nonvegFilter = (non_veg) => {
    setActive(non_veg);
    api
      .get_partners("", "", "", 2)
      .then((response) => {
        if (!response.error) {
          setRestaurants(response.data);
        }
      })
      .catch(() => {});
  };

  // get all data

  const AllFilter = (all) => {
    setActive(all);
    api
      .get_partners("", "", "")
      .then((response) => {
        if (!response.error) {
          setRestaurants(response.data);
        }
      })
      .catch(() => {});
  };

  //   pagination

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const pages = parseInt(
    Math.ceil(restaurants && restaurants.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  //   favorites add or remove

  const handleInput = (event, partner_id) => {
    if (event.target.checked) {
      add("partners", partner_id);
    } else {
      remove("partners", partner_id);
    }
  };

  const city = localStorage.getItem("city");

  return (
    <Layout title={t("Restaurants_crumb")}>
      <Breadcrumbs
        title={t("Restaurants_crumb")}
        crumb={t("Restaurants_crumb")}
      />
      {restaurants && restaurants !== null && city !== null ? (
        <>
          <Container>
            <div className="title-wrapper">
              <Typography variant="h4" component="h4" className="bold">
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={["Restaurants"]}
                  autoEscape={true}
                  textToHighlight={t("top_restaurants")}
                />
              </Typography>
              <Typography>It takes two hands to hold a Whopper</Typography>
            </div>
            <div className="restaurants-filter mb20 filter">
              <Button
                variant="outlined"
                color="error"
                sx={{ mr: "10px" }}
                className={active === "all" ? "active" : ""}
                onClick={() => AllFilter("all")}
              >
                All
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ mr: "10px" }}
                className={active === "veg" ? "active" : ""}
                onClick={() => vegFilter("veg")}
              >
                Vegetarian
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ mr: "10px" }}
                className={active === "non_veg" ? "active" : ""}
                onClick={() => nonvegFilter("non_veg")}
              >
                Non Vegetarian
              </Button>
            </div>
            <div className="restaurants-list-wrapper">
              {restaurants && restaurants !== null && city !== null ? (
                <>
                  <Grid container spacing={2}>
                    {isLoading ? (
                      <ResPlaceholder number={8} />
                    ) : (
                      <>
                        {restaurants &&
                          restaurants
                            .slice(
                              (page - 1) * itemsPerPage,
                              page * itemsPerPage
                            )
                            .map((product, index) => {
                              const {
                                partner_id,
                                partner_name,
                                partner_profile,
                                description,
                                partner_rating,
                                partner_cook_time,
                                slug,
                                is_restro_open,
                                price_for_one,
                                partner_indicator
                              } = product;
                              return (
                                <Grid
                                  item
                                  xl={3}
                                  key={index}
                                  className="res-card"
                                >
                                  <ProductFlatCard
                                    title={partner_name}
                                    image={partner_profile}
                                    des={description}
                                    rating={partner_rating}
                                    cooking_time={partner_cook_time}
                                    slug={slug}
                                    open={is_restro_open}
                                    price={price_for_one}
                                    partner_indicator={partner_indicator}
                                    icon={
                                      <Checkbox
                                        className="favorites"
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                        onChange={(event) =>
                                          handleInput(event, partner_id)
                                        }
                                      />
                                    }
                                  />
                                </Grid>
                              );
                            })}
                      </>
                    )}
                  </Grid>
                </>
              ) : (
                <>
                  <div>
                    <div className="not-found-res">
                      <img
                        src={process.env.PUBLIC_URL + "/images/oopsie.gif"}
                        alt="not-found"
                      />
                    </div>
                    <Typography
                      variant="h6"
                      component="h5"
                      sx={{ textAlign: "center" }}
                    >
                      sorry, online ordering isn't available at your location.
                    </Typography>
                  </div>
                </>
              )}
            </div>
            <div className="pagination">
              <Pagination
                count={pages}
                color="error"
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                page={page}
              />
            </div>
          </Container>
        </>
      ) : (
        <>
          <Nofound />
        </>
      )}
    </Layout>
  );
};

export default RestaurantsListing;
