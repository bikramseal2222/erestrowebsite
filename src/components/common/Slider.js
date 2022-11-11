import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Card } from "@mui/material";
import * as api from "../../utils/api";
import { toast } from "react-toastify";

const Slider = () => {
  const [slider, setSlider] = useState();

  const sliderData = () => {
    api
      .getSliders()
      .then((response) => {
        if (!response.error) {
          setSlider(response.data);
        } else {
          toast.error("No Slider Image Found");
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    sliderData();
    // eslint-disable-next-line
  }, []);

  const swiperOption = {
    navigation: true,
    autoplay: true,
    loop: true,
    modules: [Navigation]
  };

  return (
    <Container className="mb20 mt20">
      <Swiper {...swiperOption} className="mySwiper">
        <Card>
          {slider &&
            slider.map((imagedata, index) => {
              const { banner_image } = imagedata;
              return (
                <SwiperSlide key={index}>
                  <div className="image_slider">
                    <img src={banner_image} alt="banner" />
                  </div>
                </SwiperSlide>
              );
            })}
        </Card>
      </Swiper>
    </Container>
  );
};

export default Slider;
