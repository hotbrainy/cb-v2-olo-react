import React from "react";
import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import spinnerImage from "src/assets/images/spinner.gif";

interface ILoadingProps {
  text?: string;
  size?: number;
  horizontalAlign?: string;
  noMargin?:boolean;
}

const defaultText = "Loading menu items please wait...";
const defaultSize = 50;
const defaultJustify = "center";

export default function LoadingSpinner(props: ILoadingProps): React.ReactElement {
  const theme = useTheme();
  const { text = defaultText, size = defaultSize, horizontalAlign = defaultJustify, noMargin } = props;
  return (
    <Grid xs={12} p={1} display="flex" alignItems="center" justifyContent={horizontalAlign}>
      <Grid xs={3} display={"flex"} justifyContent={"center"}>
        <img
          src={spinnerImage}
          alt="Waiting"
          height={size}
          width={size}
          style={{ marginRight: noMargin ? '' : size }}
        />
      </Grid>
      <Grid xs={9} justifyContent="center" display="flex">
        <Typography variant="h6" sx={{ fontSize: { xs: "12px", sm: "20px" } }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}
