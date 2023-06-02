import { Box } from "@mui/material";
import _ from "lodash";
import React from "react";
import TileComponent from "src/components/banners/carousel/tile";
import { VMCarouselItem } from "src/components/banners/carousel/vmCarousel";
import paletteColors from "src/theme/paletteColors";

/**
 * helper function to set the default video for a videoGroup
 * @param sec a page section
 */
export const setVideoGroupDefault = (sec: any, setVgFunction: any) => {
  const videoGroup = _.get(sec, "videoGroup", null);
  const defaultVGItem = videoGroup ? _.get(videoGroup, "defaultItem", 0) : 0;
  if (videoGroup) setVgFunction(defaultVGItem);
};

export const setNavBarLinkDefault = (sec: any, setNCIFunction: any) => {
  const navBar = _.get(sec, "navBar", null);
  if (navBar) console.log("nb sec: ", sec);
  const defaultNavItem = navBar ? _.get(navBar, "defaultItemLinkId", 0) : 0;
  if (navBar) setNCIFunction(defaultNavItem);
};

export const DrawTile = (props: { item: VMCarouselItem; url: string }) => {
  const styles = {
    tileText: {
      color: paletteColors.white,
      marginTop: "50%",
      minWidth: { xs: "270px", sm: "330px" },
      textAlign: "center",
      fontWeight: 700,
      fontSize: { xs: "40px", sm: "24px", md: "36px", lg: "48px" },
      textShadow: "6px 6px 6px rgba(0, 0, 0, 0.7)",
    },
    tilePosition: {
      borderRadius: "12px",
      width: "unset",
      margin: { xs: 0, sm: "4px" },
    },
  };

  return (
    <Box
      sx={{ height: "100%", width: "100%", cursor: "pointer" }}
      onClick={() => (window.location.href = props.url)}
    >
      <TileComponent
        overrideTitleStyles={styles.tileText}
        item={props.item}
        sx={styles.tilePosition}
      />
    </Box>
  );
};
