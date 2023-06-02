import _ from "lodash";
import React, { useEffect, useState } from "react";
import theme from "src/theme";

// Global Components
import Grid from "@mui/material/Unstable_Grid2";
import { Button, IconButton, InputAdornment, SxProps, TextField } from "@mui/material";
import ButtonGroup from "src/components/buttons/button-group";
import paletteColors from "src/theme/paletteColors";
import { fonts } from "src/shared/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styles } from "../styles";

export interface ISignupDetail {
	firstname?							: string;
	lastname?							: string;
	email?								: string;
	mobile?								: string;
}

export interface ISignupPanelProps {
	signupDetail?						: ISignupDetail;
	firstnameHelperText?				: string;
	lastnameHelperText?					: string;
	emailHelperText?					: string;
	mobileHelperText?					: string;
	onChange?							: Function;
	onSubmit?							: Function;
}

export function DrawSignupPanel(props:ISignupPanelProps): React.ReactElement {
	const {
		onChange, onSubmit,
		firstnameHelperText,
		lastnameHelperText,
		emailHelperText,
		mobileHelperText,
	}															= props;
	const firstname 											= props.signupDetail?.firstname;
	const lastname 												= props.signupDetail?.lastname;
	const email 												= props.signupDetail?.email;
	const mobile 												= props.signupDetail?.mobile;

	const [formValidState, setFormValidState] 					= useState(false);

	const [firstnameState, setFirstnameState] 					= useState(firstname || "");
	const [firstnameHelperTxt, setFirstnameHelperTxt] 			= useState(firstnameHelperText || "");
	function handleChangeFirstname(event: React.ChangeEvent<HTMLInputElement>) {
	  setFirstnameState(event.target.value);
	}
	const [lastnameState, setLastnameState] 					= useState(lastname || "");
	const [lastnameHelperTxt, setLastnameHelperTxt] 			= useState(lastnameHelperText || "");
	function handleChangeLastname(event: React.ChangeEvent<HTMLInputElement>) {
	  setLastnameState(event.target.value);
	}
	const [emailState, setEmailState] 					= useState(email || "");
	const [emailHelperTxt, setEmailHelperTxt] 			= useState("");
	function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const txt = event.target.value;
		if(!_.isEmpty(txt))
			setEmailHelperTxt(emailValid(txt) ? "" : emailHelperText || "");
		else
			setEmailHelperTxt("");
	  	setEmailState(txt);
	}
	const [mobileState, setMobileState] 				= useState(mobile || "");
	const [mobileHelperTxt, setMobileHelperTxt] 		= useState("");
	function handleChangeMobile(event: React.ChangeEvent<HTMLInputElement>) {
		const txt = event.target.value;
		if(!_.isEmpty(txt))
			setMobileHelperTxt(mobileValid(txt) ? "" : mobileHelperText || "");
		else
			setMobileHelperTxt("");
	  setMobileState(txt);
	}

	function firstnameValid(txt:string){
		//TODO add validation
		if(txt=="") return false;
		return true;
	}
	function lastnameValid(txt:string){
		//TODO add validation
		if(txt=="") return false;
		return true;
	}
	function emailValid(txt:string){
		const emailRegex:RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return testRegex(txt,emailRegex);
	}
	function mobileValid(txt:string){
		const mobileRegex:RegExp = /^\d{10}$/;
		const tstVal = txt.replaceAll(" ","").replaceAll("-","");
		const tstResult = testRegex(tstVal,mobileRegex);
		console.log(txt,tstVal,tstResult);
		return tstResult;
	}
	function testRegex(tstVal:string, tstRegEx:RegExp){
		if(!tstVal) return false;
		if(!tstRegEx) return true;
		const tstResult = tstRegEx.test(tstVal);
		return tstResult;
	}
	function doSignup(){
		if(onSubmit) onSubmit?.call(this,{firstname:firstnameState, lastname:lastnameState, email:emailState,mobile:mobileState});
	}
	useEffect(()=>{
		setFormValidState(firstnameValid(firstnameState) && lastnameValid(lastnameState) && emailValid(emailState) && mobileValid(mobileState));
		if(onChange) onChange.call(this,{
			firstname:firstnameState, lastname:lastnameState,
			email:emailValid(emailState) ? emailState : "",
			mobile:mobileValid(mobileState) ? mobileState : "" });
	},[firstnameState,lastnameState,emailState,mobileState])

	return (
	  <Grid container width="100%" sx={{ maxWidth: { xs: "100%", sm: "740px" }}}>
		<Grid
		  xs={12}
		  sx={{...fonts.portuguesa, fontWeight: "400", fontSize: "40px", lineHeight: "32px" }}
		  className={"profileHeader justifyGridCenter"}
		>
		  Sign Up To Flame Rewards
		</Grid>
		<Grid xs={12}sx={{...fonts.matter, fontWeight: "400", fontSize: "20px", lineHeight: "30px" }} className={"justifyGridCenter"}>
		Join our Oporto familia today!
		</Grid>
		<Grid xs={6}>
		  <TextField
			type="text"
			placeholder={"First name"}
			label={"Your First Name"}
			value={firstnameState}
			helperText={firstnameHelperTxt}
			onChange={handleChangeFirstname}
		  />
		</Grid>
		<Grid xs={6}>
		  <TextField
			type="text"
			placeholder={"Last name"}
			label={"Your Last Name"}
			value={lastnameState}
			helperText={lastnameHelperTxt}
			onChange={handleChangeLastname}
		  />
		</Grid>

		<Grid xs={12}>
		  <TextField
			type="text"
			placeholder={"Email"}
			label={"Your Email"}
			value={emailState}
			helperText={emailHelperTxt}
			onChange={handleChangeEmail}
		  />
		</Grid>
		<Grid xs={12}>
		  <TextField
			type="text"
			placeholder={"Mobile"}
			label={"Your Mobile"}
			value={mobileState}
			helperText={mobileHelperTxt}
			onChange={handleChangeMobile}
		  />
		</Grid>
		<Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
		<Button
			variant="contained"
			disabled={!formValidState}
			sx={{
				...styles.button,
				lineHeight : '14px'
			}}
			onClick={doSignup}
		>
			{`Continue`}
		</Button>
		</Grid>
	  </Grid>
	);
  }