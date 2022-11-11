import {
  Box,
  Button,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import React, { useState } from "react";
import { useAddress } from "../../context/AddressContext";

const Edit = ({
  id,
  address,
  user_mobile,
  user_landmark,
  user_city,
  user_area,
  latitude,
  longitude,
  type
}) => {
  const [Editopen, setEditOpen] = useState(false);// eslint-disable-next-line
  const [addressType, setAddressType] = useState();
  const [alignment, setAlignment] = useState(type);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const { addresses, EditAddress, onMarkerDragEnd, setUser, userAddress } =
    useAddress();
  const [userAdd] = useState({
    userAddress: "",
    city: "",
    area: "",
    mobile: "",
    landmark: ""
  });

  const EditModalOpen = () => {
    setEditOpen(true);
  };
  const EditModalClose = () => setEditOpen(false);

  //   update data

  const onInputChange = (e) => {
    setUser({ ...userAdd, [e.target.name]: e.target.value });
  };

  const EditData = (e) => {
    e.preventDefault();
    const address_value = e.target.userAddress;
    const city_data = e.target.city;
    const area_data = e.target.area;
    const mobile_data = e.target.mobile;
    const landmark_data = e.target.landmark;

    const user_address = address_value.value;
    const user_city = city_data.value;
    const user_area = area_data.value;
    const user_mobile = mobile_data.value;
    const user_landmark = landmark_data.value;

    EditAddress(
      id,
      user_mobile,
      user_address,
      user_area,
      user_city,
      user_landmark
    );
    EditModalClose(true);
  };

  const lati = parseFloat(latitude);
  const long = parseFloat(longitude);

  const center = {
    lat: lati,
    lng: long
  };

  const handleInput = (e) => {
    setAddressType(e.target.value);
  };

  return (
    <>
      <Button sx={{ mt: "10px" }} variant="text" onClick={EditModalOpen}>
        Edit
      </Button>
      <Modal
        open={Editopen}
        onClose={EditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="map-modal">
          <div className="map-wrapper">
            <Typography variant="h5" component="h5" className="mb20">
              Set Your Location
            </Typography>

            <form onSubmit={EditData}>
              <GoogleMap id="google-map" center={center} zoom={10}>
                <Marker
                  position={center}
                  draggable={true}
                  onDragEnd={onMarkerDragEnd}
                >
                  <InfoWindow position={center}>
                    <div>{addresses}</div>
                  </InfoWindow>
                </Marker>
              </GoogleMap>

              <TextField
                fullWidth
                label="userAddress"
                id="userAddress"
                className="mb20 mt20"
                name="userAddress"
                defaultValue={userAddress ? userAddress : address}
                onChange={onInputChange}
              />
              <TextField
                fullWidth
                label="city"
                id="city"
                name="city"
                className="mb20"
                defaultValue={user_city}
                onChange={onInputChange}
              />
              <TextField
                fullWidth
                label="area"
                id="area"
                name="area"
                className="mb20"
                defaultValue={user_area}
                onChange={onInputChange}
              />
              <TextField
                fullWidth
                label="mobile"
                id="mobile"
                className="mb20 mt20"
                name="mobile"
                defaultValue={user_mobile}
                onChange={onInputChange}
              />
              <TextField
                fullWidth
                label="landmark"
                defaultValue={user_landmark}
                name="landmark"
                className="mb20"
                onChange={onInputChange}
              />
              <div className="btn-grp mt20">
                <ToggleButtonGroup
                  value={alignment}
                  color="error"
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton
                    value="home"
                    aria-label="home"
                    onClick={(e) => handleInput(e)}
                  >
                    Home
                  </ToggleButton>
                  <ToggleButton
                    value="office"
                    aria-label="office"
                    onClick={(e) => handleInput(e)}
                  >
                    Office
                  </ToggleButton>
                  <ToggleButton
                    value="other"
                    aria-label="other"
                    onClick={(e) => handleInput(e)}
                  >
                    Other
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                color="error"
                sx={{ marginTop: "20px" }}
              >
                update
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Edit;
