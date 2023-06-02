import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box, Hidden, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import React from "react";
import { rootStyles } from "src/shared/styles";
import {settings} from '../../../shared/config-settings';
import paletteColors from "src/theme/paletteColors";
import { guid } from "src/utils/utils";
import { getFontFamily, jumpTo } from "src/views/content/drawSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { IContentfulContentItem } from "src/store/pages/pages";
import { Keyboard } from "swiper";
import { Mousewheel } from "swiper";

export interface IContentfulApplicationProcessTileGroup {
  name: string;
  headerColour?: string;
  applicationProcessItems: IContentfulApplicationProcessTile[];
}

export interface IContentfulApplicationProcessTile {
  title: string;
  body: any;
}

export const extractApplicationProcessGroupFromContentful = (fields: any): IContentfulApplicationProcessTileGroup => {
  const retVal = {
    name: fields.name,
    headerColour: fields.headerColour,
    applicationProcessItems: fields.applicationProcessItems.map((rt: any) => extractApplicationProcessTileFromContentful(rt.fields)),
  };
  return retVal;
};

export const extractApplicationProcessTileFromContentful = (fields: any): IContentfulApplicationProcessTile => {
  const retVal = {
    body         : fields.body,
    title        : fields.title,
  };
  return retVal;
};

export const DrawApplicationProcessTileGroup = (props: { applicationProcessTileGroup: IContentfulApplicationProcessTileGroup }) => {
  const { applicationProcessTileGroup } = props;
  const thisItem = applicationProcessTileGroup;

  const numberOfTiles = thisItem.applicationProcessItems.length;
  const gridWidth = Math.round(12 / numberOfTiles);
  const maxGridWidth = 4; // 3 tiles wide
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid
      key={guid()}
      container
      className="theme"
      width="100%"
      justifyContent={"center"}
      sx={{ ...rootStyles.swiper, cursor: "pointer" }}
      spacing={2}
    >
    <Swiper
        spaceBetween={2}
        slidesPerView={isDesktop ? 4 : 1}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        // mousewheel={true}
        navigation={true}
        modules={[Keyboard, Mousewheel, Navigation, Pagination]}
      >
        {thisItem.applicationProcessItems.map((thisTile: any, ii: number) => (
          <SwiperSlide
            key={`application-process-${ii}`}
            style={{
              height: "auto",
              paddingBottom: "1em",
            }}
          >
            <Stack
              spacing={1}
              sx={{
                m: 1,
                height: "100%",
                backgroundColor: (theme) => theme.palette.common.white,
                boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
            <DrawApplicationProcessTile
                headerColour={thisItem.headerColour}
                applicationProcessTile={{...thisTile, heightMobile: 130}}
                tileNumber={ii+1}
            />
            </Stack>
            </SwiperSlide>
            ))}
      </Swiper>
    </Grid>
  );
};

export const DrawApplicationProcessTile = (props: { applicationProcessTile: IContentfulApplicationProcessTile, headerColour?:string, tileNumber?:number }) => {
  const tileNumber = props.tileNumber;
  const thisItem = props.applicationProcessTile;
  const headerColour:string = props?.headerColour || "";
  const title = thisItem.title;

  const displayContent = documentToReactComponents(thisItem.body);
  return (
    <Paper elevation={0}>
      <Box
        textAlign={"left"}
        sx={{
          p: "1em",
          height: "50px",
          backgroundColor: headerColour
              ? headerColour
              : (theme) => theme.palette.common.red
            ,
        }}
      >
        <Typography
          variant={"h4"}
          sx={{
            color: (theme) => theme.palette.common.white,
            fontSize: { xs: "16px", lg: "20px" },
            lineHeight: { xs: "19px", lg: "24px" },
          }}
        >
          <span style={{ fontSize: "32px" }}>{`${tileNumber}. `}</span>
          {`${title}`}
        </Typography>
      </Box>

      <Box textAlign={"left"} sx={{ p: "0 1em" }}>
        <Typography
          variant={"subtitle1"}
          sx={{
            fontSize: { xs: "14px", lg: "16px" },
            lineHeight: "20px",
          }}
        >
          {displayContent}
        </Typography>
      </Box>
    </Paper>
  );
};
