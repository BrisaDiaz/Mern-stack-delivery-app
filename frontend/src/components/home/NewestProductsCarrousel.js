import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../menu/MenuItem";
import AddToCartButton from "../AddToCartButton";
import useNewestProducts from "../../hooks/useNewestProducts";
import ProductsCarrouselSkeleton from "../ProductsCarrouselSkeleton";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function ProductsCarrousel() {
  const { isLoading, latestProducts } = useNewestProducts();

  if (isLoading) return <ProductsCarrouselSkeleton />;
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper  "
        breakpoints={{
          330: {
            width: 660,
            slidesPerView: 2,
          },

          660: {
            width: 970,
            slidesPerView: 3,
          },
          970: {
            width: 1200,
            slidesPerView: 4,
          },
        }}
      >
        {latestProducts.map((product) => {
          return (
            <SwiperSlide key={product._id}>
              <Item item={product}>
                <AddToCartButton thisProductInfo={product} />
              </Item>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
