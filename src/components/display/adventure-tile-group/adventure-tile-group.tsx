import React from "react";
import Grid from "@mui/system/Unstable_Grid";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Paper } from "@mui/material";
import { fonts, rootStyles } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import { guid } from "src/utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { getJustification } from "src/views/content/drawSection";

export interface IContentfulAdventureTileGroup {
  name: string;
  justification: string;
  adventureTiles: IContentfulAdventureTile[];
}

export interface IContentfulAdventureTile {
  title: string;
  content: any;
  backgroundColor: string;
}

export const extractAdventureTileGroupFromContentful = (
  fields: any
): IContentfulAdventureTileGroup => {
  const retVal = {
    name: fields.name,
    justification: fields.justification,
    adventureTiles: fields.adventureTiles.map((rt: any) =>
      extractAdventureTileFromContentful(rt.fields)
    ),
  };
  return retVal;
};

export const extractAdventureTileFromContentful = (fields: any): IContentfulAdventureTile => {
  const retVal = {
    title: fields.title,
    content: fields.content,
    backgroundColor: fields.backgroundColor,
  };
  return retVal;
};

export const DrawAdventureTileGroup = (props: {
  adventureTileGroup: IContentfulAdventureTileGroup;
}) => {
  const thisItem = props.adventureTileGroup;
  return (
    <Grid
      key={guid()}
      container
      className="theme"
      width="100%"
      display="flex"
      justifyContent={getJustification(thisItem.justification ? thisItem.justification : "")}
      sx={{ ...rootStyles.swiper }}
    >
      <Swiper
        key={guid()}
        direction={"horizontal"}
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
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
      >
        {thisItem.adventureTiles.map((thisTile: any, iidx: number) => {
          return (
            <SwiperSlide key={`tile-${iidx}`}>
              <DrawAdventureTile adventureTile={thisTile} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Grid>
  );
};
export const DrawAdventureTile = (props: { adventureTile: IContentfulAdventureTile }) => {
  const thisItem = props.adventureTile;
  let number = "";
  let title = thisItem.title;
  if (thisItem.title.indexOf(". ")) {
    number = `${thisItem.title.split(". ")[0]}.`;
    title = thisItem.title.split(". ")[1];
  }
  return (
    <Paper
      key={guid()}
      sx={{
        width: { xs: "272px" },
        minHeight: { sm: "348px", xs: "300px" },
        margin: "8px",
        borderRadius: "14px",
        ...fonts.matter,
        fontSize: "12px",
        backgroundColor: thisItem.backgroundColor || "#EAAF21",
      }}
    >
      <Grid container width="100%" height="100%">
        <Grid
          xs={12}
          display="flex"
          justifyContent={"center"}
          alignItems={"start"}
          sx={{
            ...fonts.portuguesa,
            height: "20%",
            color: paletteColors.white,
          }}
        >
          <Grid container width="100%" px={2}>
            <Grid
              xs={2}
              sx={{
                fontSize: "64px",
                lineHeight: "60px",
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
              }}
            >
              {number}
            </Grid>
            <Grid
              xs={10}
              sx={{
                fontSize: "25px",
                lineHeight: "23px",
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              {title}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection="column"
          sx={{
            ...fonts.matter,
            fontSize: "16px",
            lineHeight: "18px",
            textAlign: "start",
            height: "80%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              padding: "20px",
              whiteSpace: "break-spaces",
            }}
          >
            {documentToReactComponents(thisItem.content)}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
