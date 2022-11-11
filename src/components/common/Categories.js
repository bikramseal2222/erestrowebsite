import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import * as api from "../../utils/api";
import ProductCard from "../products/ProductCard";
import ProductCardPlaceHolder from "../placeholders/ProductCardPlaceHolder";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";
import Aos from "aos";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const Categories = () => {
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { categories, setCategory } = useSearch();

  const Categories_data = () => {
    api
      .get_categories()
      .then((response) => {
        if (!response.error) {
          setLoading(false);
          setCategory(response.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    Categories_data();
    Aos.init({ duration: 1000 });
    // eslint-disable-next-line
  }, []);

  const city = localStorage.getItem("city");

  return (
    <>
      {city !== null ? (
        <>
          <Container className="mb20">
            <div
              className="title-wrapper"
              style={{ paddingTop: "0px" }}
              data-aos="fade-up"
            >
              <Typography variant="h4" component="h4" className="bold">
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={["Cuisine"]}
                  autoEscape={true}
                  textToHighlight={t("latest_cuisine")}
                />
              </Typography>
              <Typography weight="light">{t("top_most_cuisine")}</Typography>
            </div>
            <div className="category-wrapper">
              <Swiper
                spaceBetween={20}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1
                  },
                  768: {
                    slidesPerView: 1
                  },
                  1024: {
                    slidesPerView: 4
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <SwiperSlide>
                      <ProductCardPlaceHolder />
                    </SwiperSlide>
                    <SwiperSlide>
                      <ProductCardPlaceHolder />
                    </SwiperSlide>
                  </>
                ) : (
                  <>
                    {categories &&
                      categories.map((category, index) => {
                        const { name, image, slug } = category;
                        return (
                          <SwiperSlide key={index}>
                            <Link to={`categories/${slug}`}>
                              <ProductCard title={name} image={image} />
                            </Link>
                          </SwiperSlide>
                        );
                      })}
                  </>
                )}
              </Swiper>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default Categories;
