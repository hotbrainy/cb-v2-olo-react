import { Theme } from "@emotion/react";
import { Box, Paper, Stack, SxProps, Typography, useMediaQuery } from "@mui/material";
import Grid                             from "@mui/material/Unstable_Grid2";
import React from "react";
import StandaloneButton from "src/components/buttons/standalone-button";
import theme from "src/theme";
import paletteColors from "src/theme/paletteColors";
import { ICallToAction } from "../call-to-action/call-to-action";

interface SnippyTileProps {
  elevation?: number;
  topLine?: string;
  midLine?: string;
  bottomLine?: string;
  callToAction?: ICallToAction[];
  tileSx?: SxProps<Theme>;
  topLineSx?: SxProps<Theme>;
  midLineSx?: SxProps<Theme>;
  bottomLineSx?: SxProps<Theme>;
}
const SnippyTile = (props: SnippyTileProps) => {
  const {
    elevation = 0,
    topLine,
    midLine,
    bottomLine,
    tileSx,
    topLineSx,
    midLineSx,
    bottomLineSx,
    callToAction,
  } = props;
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Paper sx={{ backgroundColor: "transparent", ...tileSx }} elevation={elevation}>
      <Grid container>
        <Grid
          xs={12}
          textAlign="center"
          p={0}
          display="flex"
          alignItems="end"
          justifyContent="center"
        >
          <Box sx={{ fontSize: "20px", fontWeight: 900, ...topLineSx }}>{topLine}</Box>
        </Grid>
        <Grid xs={12} textAlign="center" p={0}>
          <Box
            sx={{
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: 900,
              color: paletteColors.red,
              ...midLineSx,
            }}
          >
            {midLine}
          </Box>
        </Grid>
        <Grid
          xs={12}
          textAlign="center"
          p={0}
          display="flex"
          justifyContent="center"
          alignItems="start"
        >
          <Box
            sx={{
              maxWidth: "330px",
              minWidth: "260px",
              fontSize: "20px",
              lineHeight: "21px",
              fontWeight: 900,
              ...bottomLineSx,
            }}
          >
            {bottomLine}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SnippyTile;
