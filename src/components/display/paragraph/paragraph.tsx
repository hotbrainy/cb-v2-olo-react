import React from "react";
import { Paper, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
// import paletteColors from "src/theme/paletteColors";
import { getTypographyVariant } from "src/utils/utils";
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export interface VMParagraph {
  showHeading?: boolean;
  heading: string;
  content?: string;
  docToNode?: any;
}

interface IParagraphProps {
  paragraph?: VMParagraph;
  headingVariant?: string;
  justifyContent?: string;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export default function Paragraph(props: IParagraphProps): React.ReactElement {
  const {
    paragraph,
    justifyContent = "center",
    sx,
    headerSx,
    contentSx,
    headingVariant = "h6",
  } = props;
  const theme = useTheme();
  const typographyVariant = getTypographyVariant(headingVariant);

  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: justifyContent,
    },
  };

  return (
    <Paper elevation={0} sx={{ ...sx }}>
      <Grid container spacing={1}>
        {paragraph?.showHeading && (
          <Grid xs={12} alignItems="center" justifyContent="center">
            {paragraph?.heading ? (
              <Typography
                variant={typographyVariant}
                textAlign={"center"}
                sx={{ display: "flex", ...headerSx }}
              >
                {paragraph.heading}
              </Typography>
            ) : (
              <Skeleton variant="rounded" width={"100%"} height={75} />
            )}
          </Grid>
        )}
        <Grid xs={12} pt={1} sx={{ ...styles, ...contentSx }}>
          {
            paragraph?.docToNode
              ? documentToReactComponents(paragraph.docToNode)
              : paragraph?.content
                  ? (
                      <Typography
                          dangerouslySetInnerHTML={{ __html: paragraph.content }}
                          sx={{ ...contentSx }}
                      />
                  )
                  : (<Skeleton variant="rounded" width={"100%"} height={100} />)
          }
        </Grid>
      </Grid>
    </Paper>
  );
}
