import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React from "react";
import theme from "src/theme";
import Pillar from "../scrapbook/pillar";
import { Box } from "@mui/material";
import { IShowcaseItem } from "src/utils/utils";

interface ISwiperProps {
  items: any[];
}

const styles = {
  swiper: {
    marginTop: "40px",
    maxWidth: "100vw",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
    "& .swiperSlide": {
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "300px",
    },
    "& .swiperSlide img": {
      display: "block",
      width: "100%",
    },
  },
};
const sliderSettings = {
  440: {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  600: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  900: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};

const SwiperRow = (props: ISwiperProps) => {
  const { items } = props;
  return (
    <Box sx={{ ...styles.swiper }}>
      <Swiper
        breakpoints={sliderSettings}
        grabCursor={true}
        pagination={false}
        navigation={true}
        modules={[Navigation]}
      >
        {" "}
        {items.map((itm: IShowcaseItem, idx) => (
          <SwiperSlide key={`idx${idx}`}>
            <Pillar
              id={itm.id.toString()}
              name={itm.title}
              imageUrl={itm.image}
              blurb={itm.blurb}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperRow;
