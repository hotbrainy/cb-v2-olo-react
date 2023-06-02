import React from "react";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import paletteColors from "src/theme/paletteColors";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fonts } from "src/shared/styles";

export interface VMTwoColumn {
  heading?: string;
  content?: any;
  image?: string | null;
}

interface ITwoColumnProps {
  content?: VMTwoColumn;
  verticalAlignContent?: string;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  imageLeft?: boolean;
  imageHeight?: number;
  drawTitle?: boolean;
  sx?: SxProps<Theme>;
  leftColumnSx?: SxProps<Theme>;
}

export default function TwoColumn(props: ITwoColumnProps): React.ReactElement {
  const {
    content,
    verticalAlignContent = "center",
    imageLeft = false,
    imageHeight,
    drawTitle = true,
    sx,
    headerSx,
    contentSx,
    imageSx,
    leftColumnSx,
  } = props;
  const theme = useTheme();

  const styles = {
    root: {
      display: "flex",
      "& h2": {
        // -- Common
        fontFamily: "Matter",
        fontStyle: "normal",
        fontWeight: 900,
        fontTransform: "none",
        color: paletteColors.yellow,
        textShadow: `5px 5px 0 ${paletteColors.black}`,
        fontFeatureSettings: `'liga' off`,
        // Attempt to add font "border"
        WebkitTextStroke: `2px  ${paletteColors.black}`,
        // -- Mobile
        fontSize: { xs: "32px", sm: "48px" },
        lineHeight: { xs: "38px", sm: "58px" },
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
          ...sx,
          height: "100%",
          width: "100%",
          backgroundColor: "transparent"
      }}
    >
      <Grid
        container
        spacing={1}
        alignItems={verticalAlignContent}
        sx={{ flexDirection: imageLeft ? "row-reverse" : "row" }}
      >
        <Grid xs={12} sm={6} pt={0} pb={0} sx={{ ...leftColumnSx }}>
          <Grid
            xs={12}
            alignItems={verticalAlignContent}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            height="100%"
            paddingX={{xs:"15px",sm:0}}
          >
            {drawTitle && (
              <Typography
                variant="h6"
                display="flex"
                textAlign={"center"}
                width="100%"
                sx={{ ...headerSx }}
                mb={1}
              >
                {content && content.heading ? (
                  content.heading
                ) : (
                  <Skeleton variant="rounded" width={"100%"} height={75} />
                )}
              </Typography>
            )}
            {content && content.content ? (
              <Typography
                display="flex"
                flexDirection={"column"}
                width="100%"
                sx={{ ...fonts.matter, ...styles.root, whiteSpace: "break-spaces", ...contentSx }}
              >
                {documentToReactComponents(content.content)}
              </Typography>
            ) : (
              <Skeleton variant="rounded" width={"100%"} height={317} />
            )}
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", ...imageSx }}>
          {content && content.image ? (
            <Box
              height={imageHeight ? `${imageHeight}px` : "100%"}
              width={imageHeight ? `${imageHeight}px` : "100%"}
              sx={{
                backgroundImage: `url(${content.image})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                borderRadius: "12px",
                minHeight: imageHeight || 400,
                ...imageSx,
              }}
            />
          ) : (
            <Skeleton variant="rounded" width={"100%"} height={400} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
