import React, { useState } from "react";
import { Box, Paper, Skeleton, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import paletteColors from "src/theme/paletteColors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

export interface VMNavTile {
  id: number;
  image?: string;
  heading?: string;
  content?: string;
  url?: string;
}

interface INavSwiperProps {
  title?: string;
  tileSx?: SxProps<Theme>;
  tileItems?: VMNavTile[];
  followURL?: boolean;
  onSelect?: any;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  spacing?: number;
}

export default function NavSwiper(props: INavSwiperProps): React.ReactElement {
  const {
    title,
    titleSx,
    contentSx,
    tileItems,
    sx,
    followURL = false,
    onSelect,
    spacing,
    tileSx,
  } = props;
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));

  const styles = {
    root: {
      "& .swiper-slide-active": {
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "center",
        },
      },
      "& .swiper-button-next": {
        backgroundColor: paletteColors.black,
        color: paletteColors.white,
        height: "48px",
        width: "48px",
        borderRadius: "50%",
      },
      "& .swiper-button-next::after": {
        fontSize: "24px",
      },
      "& .swiper-button-prev": {
        backgroundColor: paletteColors.black,
        color: paletteColors.white,
        height: "48px",
        width: "48px",
        borderRadius: "50%",
      },
      "& .swiper-button-prev::after": {
        fontSize: "24px",
      },
    },
  };

  const handleClick = (tile?: VMNavTile): void => {
    if (!tile) return;
    if (followURL && tile.url) window.location.href = tile.url;
    if (tile && onSelect) onSelect(tile);
  };

  const TileItem = (props: {
    tile?: VMNavTile;
    tileSx?: SxProps<Theme>;
    titleSx?: SxProps<Theme>;
    contentSx?: SxProps<Theme>;
  }) => {
    const { titleSx, contentSx, tileSx } = props;
    return (
      <Paper
        elevation={1}
        sx={{ width: "250px", height: "333px", borderRadius: "12px", padding: "10px", ...tileSx }}
      >
        <Grid container width={"100%"} height={"100%"} p={0}>
          <Grid
            xs={12}
            justifyContent="center"
            alignItems={"center"}
            display={"flex"}
            height={"45%"}
          >
            {props.tile && props.tile.image ? (
              <img src={props.tile.image} alt={props.tile.heading} height={96} />
            ) : (
              <Skeleton variant="circular" height={96} width={96} />
            )}
          </Grid>
          <Grid xs={12} height={"65%"}>
            {props.tile && props.tile.heading ? (
              <Typography variant={"subtitle1"} sx={{ minHeight: "50px", ...titleSx }}>
                {props.tile.heading}
              </Typography>
            ) : (
              <Skeleton
                variant="rectangular"
                height={25}
                width={"100%"}
                style={{ marginBottom: "4px" }}
              />
            )}
            {props.tile && props.tile.content ? (
              <Typography
                variant="body2"
                display="flex"
                sx={contentSx}
                dangerouslySetInnerHTML={{ __html: props.tile.content }}
              />
            ) : (
              <Skeleton variant="rectangular" height={"calc(100% - 50px)"} width={"100%"} />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Paper elevation={0} sx={sx}>
      <Grid container spacing={1}>
        {title && (
          <Grid xs={12} alignItems="center" justifyContent="center">
            <Typography variant="h6" textAlign={"center"}>
              {title}
            </Typography>
          </Grid>
        )}
        <Grid xs={12} height={"385px"} pt={1} sx={{ ...styles.root }}>
          <Swiper
            navigation={true}
            pagination={true}
            spaceBetween={spacing}
            centeredSlides={!smAndUp}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            style={{ height: "100%", paddingTop: "10px", paddingLeft: "10px" }}
          >
            {tileItems
              ? tileItems.map((itm, idx) => (
                  <SwiperSlide key={`ns-${idx}`} onClick={() => handleClick(itm)}>
                    <TileItem tile={itm} tileSx={tileSx} titleSx={titleSx} contentSx={contentSx} />
                  </SwiperSlide>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, idx) => (
                  <SwiperSlide key={`ns-${idx}`}>
                    <TileItem />
                  </SwiperSlide>
                ))}
          </Swiper>
        </Grid>
      </Grid>
    </Paper>
  );
}
