import { Theme } from "@emotion/react";
import { Box, Paper, Stack, SxProps, Typography, useMediaQuery } from "@mui/material";
import Grid                             from "@mui/material/Unstable_Grid2";
import React, { ReactNode } from "react";
import StandaloneButton from "src/components/buttons/standalone-button";
import theme from "src/theme";
import paletteColors from "src/theme/paletteColors";
import speechBubble from "src/assets/images/figma/backgrounds/speechBubble.png";
import { ICallToAction } from "../call-to-action/call-to-action";

interface SpeechBubbleProps {
  callToAction?: ICallToAction[];
  tileSx?: SxProps<Theme>;
  content?: ReactNode;
}

export const getSpeechBubbleContent = (
  heading: string,
  content: string,
  contentSx?: SxProps<Theme>
) => {
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const lineLength = heading.length * 30;
  const factor = smAndUp ? 0.08 : 0.047;
  const width = smAndUp ? 500 : 324;
  const baseFontSize = smAndUp ? 64 : 34;
  const optimumFontSize = lineLength > width ? Math.round(lineLength * factor) : baseFontSize;
  return (
    <Grid container>
      <Grid
        xs={12}
        justifyContent="center"
        textAlign="center"
        pt={{ xs: "20px", sm: "60px" }}
        pb={{ xs: "8px", sm: 0 }}
      >
        <Box
          display={"flex"}
          justifyContent="center"
          className="speechBubbleHeading"
          sx={{
            lineHeight: optimumFontSize > 14 ? `${optimumFontSize + 3}px` : `${baseFontSize + 3}px`,
            fontSize: optimumFontSize > 14 ? `${optimumFontSize}px` : `${baseFontSize}px`,
            textShadow: {
              xs: `2px 2px 0px #000000`,
              sm: optimumFontSize < 45 ? `2px 2px 0px #000000` : `5px 5px 0px #000000`,
            },
          }}
        >
          {heading}
        </Box>
      </Grid>
      <Grid
        xs={12}
        pl="30px"
        pr="30px"
        pt={{ xs: 0, sm: "20px" }}
        display="flex"
        justifyContent={"center"}
        alignItems="start"
        maxHeight="160px"
        overflow="hidden"
      >
        <Box
          className="speechBubbleContent"
          textAlign={"center"}
          fontSize={"32px"}
          lineHeight="32px"
          fontWeight={700}
          textTransform={"uppercase"}
          sx={contentSx}
        >
          {content}
        </Box>
      </Grid>
    </Grid>
  );
};

const SpeechBubble = (props: SpeechBubbleProps) => {
  const { callToAction, tileSx, content } = props;
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        width: "500px",
        height: "310px",
        backgroundImage: `url(${speechBubble})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        ...tileSx,
      }}
    >
      {content}
    </Box>
  );
};

export default SpeechBubble;
