import * as React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as api from "../../utils/api";
import { toast } from "react-toastify";

const ProductSearch = ({
  setProducts,
  restaurant_slug,
  category,
  setSearch,
  search
}) => {
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }));

  //   product search

  const handleSearch = (event) => {
    setSearch(event.target.value);
    api
      .get_products(
        "",
        "",
        category,
        search,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "p.id",
        "",
        restaurant_slug
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className="mt20 d-none"
      style={{ position: "relative", float: "right" }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBase
        className="product-search"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Food"
        inputProps={{ "aria-label": "search Food" }}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default ProductSearch;
