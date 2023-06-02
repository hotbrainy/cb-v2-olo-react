import { Box } from "@mui/material";
import React, { useState } from "react";
import { effects, fonts } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import Grid from "@mui/material/Unstable_Grid2";

export interface IQuantitySelectorProps {
  value: number;
  incrementAmount?: number;
  onChange?: any;
  width?: number;
  height?: number;
  pillPadding?: number;
  isHorizontal?: boolean;
}

const defaults = {
  height: 120,
  width: 48,
  initialValue: 1,
  incrementAmount: 1,
  pillPadding: 3,
};

/**
 * Draws a pill incrementor as per Figma
 * @param props : IQuantitySelectorProps
 * @returns a Grid element to the design
 */
const QuantitySelector = (props: IQuantitySelectorProps) => {
  const {
    value = defaults.initialValue,
    incrementAmount = defaults.incrementAmount,
    width = defaults.width,
    height = defaults.height,
    pillPadding = defaults.pillPadding,
    onChange,
    isHorizontal = false,
  } = props;
  const padding: number = pillPadding;

  const [selectorValue, setSelectorValue] = useState(value);
  /** Update selector value and send Event to parent
   * @param amount - number, how much to increment by
   */
  const changeSelectorValue = (amount: number) => {
    const newValue = selectorValue + amount > 0 ? selectorValue + amount : 1;
    //console.log("cv: ", newValue, onChange);
    setSelectorValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Grid container sx={{ width: `${width}px`, height: `${height}px` }} justifyContent="center">
      <Grid
        xs={12}
        width="100%"
        height="100%"
        justifyContent="center"
        textAlign="center"
        sx={{ backgroundColor: paletteColors.yellow, borderRadius: "40px" }}
      >
        <Grid
          container
          width="100%"
          height="100%"
          display="flex"
          flexDirection={isHorizontal ? "row" : "column"}
        >
          <Grid
            xs={isHorizontal ? 4 : 12}
            p={`${padding}px`}
            height={isHorizontal ? height : width}
            display="flex"
          >
            <Box
              display="flex"
              height={isHorizontal ? `${height - padding * 2}px` : `${width - padding * 2}px`}
              width={isHorizontal ? `${height - padding * 2}px` : "100%"}
              justifyContent="center"
              textAlign={"center"}
              alignItems="center"
              sx={{
                ...fonts.ceraPro,
                fontSize: isHorizontal ? "32px" : "26px",
                paddingTop: isHorizontal ? "8px" : "6px",
                backgroundColor: paletteColors.white,
                borderRadius: "48px",
                color: isHorizontal
                  ? selectorValue > 1
                    ? paletteColors.black
                    : `${paletteColors.black}30`
                  : paletteColors.black,
              }}
              className={"noSelect"}
              onClick={() =>
                changeSelectorValue(isHorizontal ? incrementAmount * -1 : incrementAmount)
              }
            >
              {isHorizontal ? "-" : "+"}
            </Box>
          </Grid>
          <Grid
            xs={isHorizontal ? 4 : 12}
            display="flex"
            justifyContent="center"
            textAlign={"center"}
            alignItems="center"
            flex={1}
            height={isHorizontal ? `${height}px` : `${width / 2}px`}
            //width={isHorizontal ? `${width-height*2}px` : `${width}px`}
            sx={{
              ...fonts.ceraBlack,
              paddingTop: "5px",
              color:"white",
              fontSize: selectorValue < 100 ? "24px" : "18px",
            }}
          >
            {selectorValue}
          </Grid>
          <Grid
            xs={isHorizontal ? 4 : 12}
            p={`${padding}px`}
            height={isHorizontal ? height : width}
            display="flex"
            alignItems="end"
            justifyContent={isHorizontal ? "end" : "center"}
          >
            <Box
              display="flex"
              height={isHorizontal ? `${height - padding * 2}px` : `${width - padding * 2}px`}
              width={isHorizontal ? `${height - padding * 2}px` : "100%"}
              justifyContent="center"
              textAlign={"center"}
              alignItems="center"
              maxHeight={width}
              sx={{
                ...fonts.ceraPro,
                fontSize: isHorizontal ? "26px" : "32px",
                paddingTop: isHorizontal ? "8px" : "6px",
                backgroundColor: paletteColors.white,
                borderRadius: "48px",
                color: isHorizontal
                  ? paletteColors.black
                  : selectorValue > 1
                  ? paletteColors.black
                  : `${paletteColors.black}30`,
              }}
              className={"noSelect"}
              onClick={() =>
                changeSelectorValue(isHorizontal ? incrementAmount : incrementAmount * -1)
              }
            >
              {isHorizontal ? "+" : "-"}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuantitySelector;
