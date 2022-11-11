import { Button, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductFlatCard from "../../components/products/ProductFlatCard";
import { useFavorites } from "../../context/FavoriteContext";

const PartnerFilter = () => {
  const { favorites, get_favorites, page, handlePageChange, currentPage } =
    useFavorites();

  useEffect(() => {
    get_favorites("partners");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {favorites !== 0 ? (
        <>
          <Grid container spacing={2}>
            {favorites &&
              favorites.map((favorite, index) => {
                const {
                  type_id,
                  profile,
                  partner_name,
                  partner_rating,
                  owner_name,
                  is_restro_open,
                  cooking_time,
                  is_favorite,
                  slug
                } = favorite;
                return (
                  <Grid item md={4} key={index} sx={{ width: "100%" }}>
                    <ProductFlatCard
                      title={partner_name}
                      image={profile}
                      rating={partner_rating}
                      des={owner_name}
                      cooking_time={cooking_time}
                      is_favorite={is_favorite}
                      open={is_restro_open}
                      slug={slug}
                      type="partners"
                      type_id={type_id}
                    />
                  </Grid>
                );
              })}
          </Grid>
          <div className="pagination">
            <Pagination
              count={page}
              color="error"
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              page={currentPage}
            />
          </div>
        </>
      ) : (
        <div className="no-cart-data">
          <img
            src={process.env.PUBLIC_URL + "/images/wishlist.gif"}
            alt="empty cart"
          />
          <div>{"No Favorites yet!"}</div>
          <div>{"Like a dish you see? Save them here to your favorite."}</div>
          <Link to="/restaurants">
            <Button variant="outlined" color="error">
              Browse Menu
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PartnerFilter;
