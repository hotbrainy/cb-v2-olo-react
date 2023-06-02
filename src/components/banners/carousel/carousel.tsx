import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import paletteColors from "src/theme/paletteColors";
import { VMCarouselItem } from "./vmCarousel";
import Carousel from "react-material-ui-carousel";
import TileComponent from "./tile";

interface ICarouselProps {
  items: VMCarouselItem[];
  indicators?: boolean;
  autoplay?: boolean;
  sx?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  centerTitle?: boolean;
  fancyFlame?: boolean;
}

export default function CarouselComponent(props: ICarouselProps): React.ReactElement {
  const {
    items = [],
    sx,
    sxTitle,
    indicators = false,
    autoplay = false,
    centerTitle,
    fancyFlame,
  } = props;
  const theme = useTheme();

  const styles = {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Carousel
      height={"100%"}
      indicators={indicators}
      autoPlay={autoplay}
      sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center" }}
    >
      {items.map((item, idx) => (
        <TileComponent
          overrideTitleStyles={sxTitle}
          key={`tiile-${idx}`}
          item={item}
          centerTitle={centerTitle}
          fancyFlame={fancyFlame}
        />
      ))}
    </Carousel>
  );
}
