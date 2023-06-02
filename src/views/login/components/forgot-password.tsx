import _ from "lodash";
import React, { useEffect, useState } from "react";

// Global Components
import Grid from "@mui/material/Unstable_Grid2";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import paletteColors from "src/theme/paletteColors";
import { fonts } from "src/shared/styles";
import { styles } from "../styles";

export interface IForgotPasswordProps {
	username?							: string;
	onClick								: Function;
}

export function DrawForgotPassword(props:IForgotPasswordProps): React.ReactElement {
	const { onClick, username }									= props;

	const [emailOrMobile, setEmailOrMobile] 					= useState(username || "");
	function handleChangeEmailOrMobile(event: React.ChangeEvent<HTMLInputElement>) {
	  setEmailOrMobile(event.target.value);
	}

	function sendClicked() { if(emailOrMobile!="") onClick.call(this,emailOrMobile)}

	return (
	  <Grid container width="100%" sx={{ maxWidth: { xs: "100%", sm: "740px" }}}>
		<Grid
		  xs={12}
		  sx={{...fonts.portuguesa, fontWeight: "400", fontSize: "40px", lineHeight: "32px" }}
		  className={"profileHeader justifyGridCenter"}
		>
		  Forgot your Password?
		</Grid>
		<Grid xs={12} sx={{...fonts.matter, fontWeight: "400", fontSize: "20px", lineHeight: "30px" }}
		  className={"justifyGridCenter"}>
		Enter your email or mobile number, and if it matches an existing account we’ll send you a link to reset your password.
		</Grid>
		<Grid xs={12}>
		  <TextField
			type="text"
			placeholder={"Email or Mobile number"}
			label={"Email or Mobile Number"}
			value={emailOrMobile}
			onChange={handleChangeEmailOrMobile}
		  />
		</Grid>
		<Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
		<Button
			variant="contained"
			sx={{
				...styles.button,
				lineHeight : '14px'
			}}
			onClick={sendClicked}
		>
			{`Send`}
		</Button>
		</Grid>
	  </Grid>
	);
  }
