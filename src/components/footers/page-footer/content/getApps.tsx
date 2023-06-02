import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton } from "@mui/material";
import { Link } from "@mui/material";
import appStore from "src/assets/images/figma/logos/AppStore.png";
import playStore from "src/assets/images/figma/logos/PlayStore.png";

export interface IComponentProps {
  vertical?: boolean;
}

export default function GetApps(props: IComponentProps): React.ReactElement {
  const { vertical = false } = props;
  const appStoreLink = "/";
  const playStoreLink = "/";

  return (
    <Grid
      container
      width={vertical ? "100%" : "63%"}
      flexDirection={vertical ? "column" : "row"}
      my={vertical ? 0 : 3}
    >
      <Grid
        display="flex"
        alignItems="center"
        justifyContent={vertical ? "center" : "start"}
        xs={vertical ? 12 : 6}
        height={vertical ? 50 : 30}
      >
        <IconButton
          component={Link}
          href={appStoreLink}
          sx={{ justifyContent: vertical ? "center" : "flex-start", padding: 0 }}
          target={"_blank"}
        >
          <img
            src={appStore}
            height={vertical ? 50 : 30}
            alt={"Oporto iOS app from the app store"}
          />
        </IconButton>
      </Grid>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent={vertical ? "center" : "end"}
        xs={vertical ? 12 : 6}
      >
        <IconButton
          component={Link}
          href={playStoreLink}
          target={"_blank"}
          sx={{ justifyContent: vertical ? "center" : "flex-end", padding: 0 }}
        >
          <img
            src={playStore}
            height={vertical ? 50 : 30}
            alt={"Oporto Android app from the play store"}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
