import _ from "lodash";
import React, { useEffect, useState } from "react";
import theme from "src/theme";

// Global Components
import Grid from "@mui/material/Unstable_Grid2";
import { IconButton, InputAdornment, SxProps, TextField } from "@mui/material";
import ButtonGroup from "src/components/buttons/button-group";
import paletteColors from "src/theme/paletteColors";
import { fonts } from "src/shared/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface ILoginPanelProps {
	username?							: string;
	usernameHelperText?					: string;
	password?							: string;
	passwordHelperText?					: string;
	onChange							: Function;
}

export function DrawLoginPanel(props:ILoginPanelProps): React.ReactElement {
	const {
		onChange,
		username,usernameHelperText,
		password,
		passwordHelperText
	}															= props;

	const [emailOrMobile, setEmailOrMobile] 					= useState(username || "");
	const [emailOrMobileHelperText, setEmailOrMobileHelperText] = useState(usernameHelperText || "");
	function handleChangeEmailOrMobile(event: React.ChangeEvent<HTMLInputElement>) {
	  setEmailOrMobile(event.target.value);
	}

	const [pword, setPword] 									= useState(password || "");
	const [pwordHelperText, setPwordHelperText] 				= useState(passwordHelperText || "");
	function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
	  setPword(event.target.value);
	}
	const [showPassword, setShowPassword] 						= useState(false);
  	const handleClickShowPassword = () => setShowPassword((show) => !show);
  	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    	event.preventDefault();
  	};

	useEffect(()=>{
		if(onChange) onChange.call(this,{username:emailOrMobile,password:pword});
	},[pword, emailOrMobile])

	return (
	  <Grid container width="100%" sx={{ maxWidth: { xs: "100%", sm: "740px" }}}>
		<Grid
		  xs={12}
		  sx={{...fonts.portuguesa, fontWeight: "400", fontSize: "40px", lineHeight: "32px" }}
		  className={"profileHeader justifyGridCenter"}
		>
		  Login To Flame Rewards
		</Grid>
		<Grid xs={12}>
		  <TextField
			type="text"
			placeholder={"Email or Mobile number"}
			label={"Email or Mobile Number"}
			value={emailOrMobile}
			helperText={emailOrMobileHelperText}
			onChange={handleChangeEmailOrMobile}
		  />
		</Grid>
		<Grid xs={12}>
		  <TextField
			type={showPassword ? 'text' : 'password'}
			placeholder={"Password"}
			label={"Password"}
			value={pword}
			helperText={pwordHelperText}
			onChange={handleChangePassword}
			InputProps={{
			endAdornment:
				<InputAdornment position="end">
				  <IconButton
				  	aria-label="toggle password visibility"
					onClick={handleClickShowPassword}
					onMouseDown={handleMouseDownPassword}
					edge="end"
				  >
					{showPassword ? <VisibilityOff /> : <Visibility />}
				  </IconButton>
				</InputAdornment>
			  }}
		  />
		</Grid>
	  </Grid>
	);
  }
