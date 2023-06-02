import React, { useState } from "react";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import paletteColors from "src/theme/paletteColors";
import { VMCarouselItem } from "./vmCarousel";
import { fontVariants } from "src/shared/styles";
import flame from "src/assets/images/adornments/flame.svg";

interface ITileProps {
  item: VMCarouselItem;
  overrideTitleStyles?: any;
  centerTitle?: boolean;
  sx?: SxProps<Theme>;
  fancyFlame?: boolean;
}

export default function TileComponent(props: ITileProps): React.ReactElement {
  const { item, sx, overrideTitleStyles, centerTitle, fancyFlame = false } = props;
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));

  const drawFlame = fancyFlame && /^flame/i.test(props.item?.title || '');

  const styles = {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const Item = (props: { item: VMCarouselItem }) => {
    return (
      <Paper elevation={0} sx={{ ...styles }}>
        <Typography
          sx={{
            ...fontVariants.heroTitle,
            ...overrideTitleStyles,
            textAlign: centerTitle ? "center" : "",
            whiteSpace: fancyFlame ? "break-spaces" : "",
          }}
        >
          {drawFlame && (
            <img
              alt={''}
              src={flame}
              height={smAndUp ? 150 : 75}
              style={{
                filter: `drop-shadow(5px 5px 6px ${paletteColors.oportoBlack})`,
                marginLeft: smAndUp ? "103px" : "50px",
                position: "absolute",
                marginTop: smAndUp ? "-25px" : "-10px",
              }}
            />
          )}
          {drawFlame
              ? props.item?.title?.replace("Flame", `Fl ${" "} me`)
              : (props.item?.title || '')
          }
        </Typography>
        <Typography variant="body1">
            {props.item?.content}
        </Typography>
      </Paper>
    );
  };
  return (
    <Box
      key={`item-${new Date().getTime()}`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: item?.backgroundImageHeight || "100%",
        width: "100%",
        backgroundImage: `url(${item?.backgroundImage?.url || item?.backgroundImageURL || ''})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        ...sx,
      }}
    >
      <Item item={item} />
    </Box>
  );
}
