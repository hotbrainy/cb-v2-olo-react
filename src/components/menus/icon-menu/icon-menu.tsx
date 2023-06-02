import React, { useState } from "react";
import { Box, Paper, Skeleton, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import paletteColors from "src/theme/paletteColors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { VMNavTile } from "../nav-swiper/nav-swiper";
import focussedBottom from "../../../assets/images/franchising/focussedBottom.png";
import { guid } from "src/utils/utils";

interface IIconMenuProps {
  keyId: string | number;
  title?: string;
  tileItems?: VMNavTile[];
  tileWidth?: number;
  boxSx?: SxProps<Theme>;
  topSx?: SxProps<Theme>;
  bottomSx?: SxProps<Theme>;
  headingSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  focussedItem?: number;
  followURL?: boolean;
  onSelect?: any;
  sx?: SxProps<Theme>;
  navSx?: SxProps<Theme>;
}

export default function IconMenu(props: IIconMenuProps): React.ReactElement {
  const {
    keyId,
    title,
    tileItems,
    sx,
    boxSx,
    topSx,
    bottomSx,
    navSx,
    headingSx,
    imageSx,
    followURL = false,
    onSelect,
    focussedItem,
    tileWidth = 90,
  } = props;
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));

  const styles = {
    root: {
      height: "160px",
      "& .swiper-wrapper": { ...navSx, display: "flex" },
      "& .swiper-slide": {
        width: `${tileWidth + 4}px !important`,
        [theme.breakpoints.down("sm")]: {
          width: undefined,
          zIndex: 1,
          //opacity: 0.2,
        },
      },
      "& .swiper-slide-active": {
        opacity: 1,
        zIndex: 2,
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

  const TileItem = (props: { tile?: VMNavTile }) => {
    const isFocussed = focussedItem === props.tile?.id;
    return (
      <Paper
        key={guid()}
        elevation={0}
        sx={{
          ...boxSx,
          width: tileWidth ? tileWidth : "120px",
          height: "134px",
          boxSizing: "border-box",
          borderRadius: "12px",
          paddingLeft: "10px",
        }}
      >
        <Grid
          container
          width={"100%"}
          height={"100%"}
          sx={{
            borderRadius: "12px",
            marginLeft: "4px",
            marginRight: "4px",
            backgroundColor: isFocussed ? "#FCB84F" : "transparent",
            position: "relative",
            zIndex: isFocussed ? 10 : 1,
          }}
        >
          <Grid
            xs={12}
            justifyContent="center"
            alignItems={"center"}
            display={"flex"}
            height={"50%"}
            sx={topSx}
          >
            {props.tile && props.tile.image ? (
              <img src={props.tile.image} alt={props.tile.heading} height={48} />
            ) : (
              <Skeleton variant="circular" height={48} width={48} />
            )}
          </Grid>
          <Grid
            xs={12}
            height={"50%"}
            display="flex"
            justifyContent={"center"}
            alignItems="baseline"
            sx={bottomSx}
          >
            {props.tile && props.tile.heading ? (
              <Typography variant={"subtitle1"} sx={{ ...headingSx }}>
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
          </Grid>
        </Grid>
        {isFocussed && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={focussedBottom} />
          </div>
        )}
      </Paper>
    );
  };

  return (
    <Paper elevation={0} key={`pp-${keyId}`} sx={{ backgroundColor: "transparent" }}>
      <Grid container spacing={1}>
        <Grid xs={12} sx={{ ...styles.root }} pt={1}>
          <Swiper
            key={keyId}
            navigation={false}
            pagination={false}
            //modules={[Navigation, Pagination]}
            //centeredSlides={!smAndUp}
            slidesPerView={3}
            breakpoints={{
              600: {
                slidesPerView: 4,
              },
              900: {
                slidesPerView: 9,
              },
              1400: {
                slidesPerView: 10,
              },
            }}
            style={{
              height: "100%",
              paddingTop: "10px",
              paddingLeft: "10px",
              cursor: onSelect ? "pointer" : "",
            }}
          >
            {tileItems
              ? tileItems.map((itm, idx) => (
                  <SwiperSlide
                    className={focussedItem === itm.id ? "active" : ""}
                    key={`ns-${idx}`}
                    onClick={() => handleClick(itm)}
                  >
                    <TileItem tile={itm} />
                  </SwiperSlide>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => (
                  <SwiperSlide key={`ns-${idx}`} onClick={() => handleClick({ id: n })}>
                    <TileItem tile={{ id: n }} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </Grid>
      </Grid>
    </Paper>
  );
}
