import React, { useEffect, useRef, useState } from "react";
import config from "../../utils/config";
import { Grid, IconButton, Paper, InputBase } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { toast } from "react-toastify";
import * as api from "../../utils/api";
import useOutsideClick from "./useOutsideClick";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSearch } from "../../context/SearchContext";
import { initMapScript } from "../../utils/functions";
import { useAddress } from "../../context/AddressContext";

const apiKey = config.YOUR_GOOGLE_MAPS_API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function MobileSearchBar({ width, data }) {
  const searchInput = useRef(null);
  const [show, setSate] = useState(false);// eslint-disable-next-line
  const [address, setAddress] = useState({});
  const { extractAddress } = useAddress();

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show) setSate(false);
  });

  const { setLoading, get_restaurants, city_deliverable, city, get_products } =
    useSearch();

  //filter data
  const [filteredData, setFilteredData] = useState([]);

  //input searchbar

  const handleSearch = (e) => {
    api
      .get_products(
        "",
        "",
        "",
        "",
        e.target.value,
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
        city,
        ""
      )
      .then((response) => {
        if (!response.error) {
          setFilteredData(response.data);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //set geolocation in localstorage
  const lat_long = (key, value) => {
    localStorage.setItem(key, value);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    lat_long("latitude", lat);
    lat_long("longitude", lng);
    setAddress(extractAddress(place));
    const selected_city = extractAddress(place);
    setLoading(false);
    localStorage.setItem("selected_city", selected_city.city);
    localStorage.removeItem("current_city");
    const deliverable_city = localStorage.getItem("selected_city");
    // get restaurant
    city_deliverable(deliverable_city).then(() => {
      const city_select = localStorage.getItem("city");
      get_restaurants(city_select);
      get_products(city_select);
    });
  };

  // init autocomplete

  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );

    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  //revrseGeocode

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        localStorage.setItem("current_city", _address.city);
        localStorage.removeItem("selected_city");

        const deliverable_city = localStorage.getItem("current_city");
        // get restaurant
        city_deliverable(deliverable_city).then(() => {
          const city = localStorage.getItem("city");
          get_restaurants(city);
          get_products(city);
        });
        searchInput.current.value = _address.plain();
      });
  };

  //find my location
  const findMyLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
        lat_long("latitude", position.coords.latitude);
        lat_long("longitude", position.coords.longitude);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete()); // eslint-disable-next-line
  }, []);

  const city_id = localStorage.getItem("city");

  const selected_city = localStorage.getItem("selected_city");
  const current_city = localStorage.getItem("current_city");
  return (
    <>
      <div className="mobile-header">
        <Paper
          ref={ref}
          component="form"
          className="searchbar-form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { width },
            margin: "auto",
            padding: "10px",
            backgroundColor: "#fff"
          }}
        >
          <div className="searchBar-sec">
            <div>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Grid container>
                    <Grid item md={6} sx={{ margin: "auto" }}>
                      <PlaceIcon color="error" />
                    </Grid>
                    <Grid item md={6}>
                      <div className="search">
                        <input
                          ref={searchInput}
                          type="text"
                          placeholder="Search location...."
                          defaultValue={
                            current_city ? current_city : selected_city
                          }
                          style={{ backgroundColor: "#fff" }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <IconButton onClick={findMyLocation}>
                    <MyLocationIcon className="svg-color" />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
        <Paper
          ref={ref}
          component="form"
          className="searchbar-form mt20"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { width },
            margin: "auto",
            padding: "10px",
            backgroundColor: "#fff"
          }}
        >
          <div className="input_dropdown">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => handleSearch(e)}
              onClick={() => setSate(!show)}
            />

            <div className="dropdown_Sec">
              {show && (
                <>
                  {city_id !== null ? (
                    <>
                      {filteredData.map((value, index) => {
                        return (
                          <div className={`dropdown_data`} key={index}>
                            {value.partner_details.map(
                              (partner_details, index) => (
                                <Link
                                  to={`/restaurant/${partner_details.slug}`}
                                >
                                  <div className="list_Data" key={index}>
                                    <div className="partner_image">
                                      <img
                                        className="partner_profile"
                                        src={partner_details.partner_profile}
                                        alt="logo"
                                      />
                                    </div>
                                    <div className="partner_detail">
                                      <p className="partner_name">
                                        {partner_details.partner_name}
                                      </p>
                                      <div className="rating_and_time">
                                        <p className="staricon">
                                          <StarRateIcon />
                                          {partner_details.partner_rating}
                                        </p>
                                        <p className="cooktime">
                                          <AccessTimeIcon />
                                          {partner_details.partner_cook_time}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className={`dropdown_data`}>
                        <h5>Sorry, no result found</h5>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default MobileSearchBar;
