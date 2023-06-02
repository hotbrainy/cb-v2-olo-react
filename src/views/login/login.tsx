import _ from "lodash";
import React, { useEffect, useState } from "react";

// Global Components
import Page from "../../components/page";
import { useAppDispatch } from "src/store";
import useConfig from "src/components/useConfig";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Container, FormGroup, TextField } from "@mui/material";
import ButtonGroup from "src/components/buttons/button-group";
import { DrawLoginPanel } from "./components/login";
import { styles } from "./styles";
import { fonts, images } from "src/shared/styles";
import { DrawForgotPassword } from "./components/forgot-password";
import { DrawSignupPanel, ISignupDetail } from "./components/sign-up";
import { DrawPasscodePanel } from "./components/enter-passcode";
import { jumpTo } from "../content/drawSection";

export default function LoginPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const config = useConfig();

  const [username,setUsername]          = useState("")
  const [password,setPassword]          = useState("")

  const [loginType, setLoginType]       = useState("LOGIN");
  function changeLoginType(evt: any) {
    setLoginType(evt === "0" ? "LOGIN" : "SIGNUP");
    setFocusSection(evt === "0" ? "login" : "signup");
  
  }

  const [focusSection, setFocusSection]   = useState('login');
  function changeFocusSection(newSection:string) { setFocusSection(newSection)};

  ///#region Login Functions
  /** Returned from Login Component onChange
   * @param loginDetails contains the username & password as they are keyed in
   */
  function setLoginDetails(loginDetails:{username:string,password:string}) {
    setUsername(loginDetails.username);
    setPassword(loginDetails.password);
  }
  function doLogin() {
    //TODO action the login
    console.log("Do Login",username,password);
  }
  function loginWithApple() {
    //TODO action log in with apple
    console.log("Log In with Apple");
  }
  function loginWithGoogle() {
    //TODO action log in with google
    console.log("Log In with Google");
  }
  /** Fired by forgotten password
   * @param username provided from the forgotten password component
   */
  function initiateRecoverPassword(username:string) {
    //TODO initiate recover password
    console.log("Initiate recover password: ", username)
  }
  ///#endregion Login Functions

  ///#region Sign Up Functions
  /** Returned from Sign Up Component onChange
   * @param signupDetails contains the username & password as they are keyed in
   */
  function setSignupDetails(signupDetails:{firstname:string, lastname:string, email:string, mobile:string}) {
    console.log("Set signup details: ", signupDetails);
  }
  function doSignup(signupDetail:ISignupDetail) {
    //TODO action the signup
    console.log("Do Signup",signupDetail);
    setFocusSection("passcode");
  }
  function signinWithApple() {
    //TODO action sign in with apple
    console.log("Sign In with Apple");
  }
  function signinWithGoogle() {
    //TODO action sign in with google
    console.log("Sign In with Google");
  }
  ///#endregion Signup Functions

  ///#region Passcode Functions
  function setPasscodeDetails(passcode:string){
    //TODO handle change in passcode
    console.log("Passcode changed: ", passcode);
  }
  function submitPasscodeDetails(passcode:string){
    //TODO handle submit in passcode
    console.log("Passcode submitted: ", passcode);
    setFocusSection("login");
  }
  function resendPasscode(){
    //TODO handle resend passcode
    console.log("Resend Passcode requested...");
  }
  function correctWrongNumber(){
    //TODO handle correct wrong number
    console.log("Correct Wrong Number...");
    jumpTo("/account");
  }
  ///#endregion Passcode Functions
  return (
    <Page>
      <Container>
        <FormGroup>
          <Grid container width={"100%"} className="theme" mt={2} sx={styles.gridContainer}>
            <Grid xs={12} width={"100%"} className="justifyGridCenter">
              <ButtonGroup
                defaultSelectedId={loginType === "LOGIN" ? "0" : "1"}
                sx={styles.buttonGroup}
                onSelected={changeLoginType}
                options={[
                  { title: "Login", id: "0" },
                  { title: "Sign Up", id: "1" },
                ]}
              />
            </Grid>
            {loginType === "LOGIN" && (
              <Grid container width="100%">
                <Grid container display={focusSection=="login" ? "flex" : "none"}>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <DrawLoginPanel onChange={setLoginDetails} />
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Box marginTop={4} marginBottom={4} sx={styles.forgotPasswordLink} onClick={()=>changeFocusSection('forgot')}>Forgot your password?</Box>
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Button
                        variant="contained"
                        sx={{
                            ...styles.button,
                            lineHeight : '14px'
                        }}
                        onClick={doLogin}
                    >
                        {`Login`}
                    </Button>
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    OR
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Button
                          variant={'outlined'}
                          sx={styles.button}
                          onClick={loginWithGoogle}
                          className={`google`}
                    >
                      <img src={images.googleIcon} alt={'google pay icon'}/> Login with Google
                    </Button>
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Button
                          variant={'outlined'}
                          sx={styles.button}
                          className={`apple`}
                          onClick={loginWithApple}
                    >
                      <img src={images.appleIcon} alt={'apple pay icon'}/> Login with Apple
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    ...styles.form,
                    ...styles.centeredGrid,
                    display: (focusSection==="forgot") ? "flex" : "none"
                  }}
                  className="justifyGridCenter"
                >
                  <DrawForgotPassword onClick={initiateRecoverPassword} />
                </Grid>
                <Grid
                  container
                  sx={{
                    ...styles.form,
                    ...styles.centeredGrid,
                    display: (focusSection==="forgot") ? "flex" : "none"
                  }}
                  className="justifyGridCenter"
                >
                  <Box 
                    marginTop={4} 
                    marginBottom={4} 
                    sx={{
                      ...styles.forgotPasswordLink,
                      fontSize:"14px"
                    }}
                    onClick={()=>changeFocusSection('login')}
                    >return to login</Box>
                </Grid>
            </Grid>

            )}
            {focusSection === "passcode" && (
              <Grid container width="100%">
                <Grid
                  xs={12}
                  className="justifyGridCenter"
                  sx={{
                    ...styles.form,
                    ...styles.centeredGrid,
                    ...fonts.portuguesa,
                    fontWeight: "400",
                    fontSize: "40px",
                    lineHeight: "32px"
                  }}
                >
                  <DrawPasscodePanel
                      phone={"0400 000 000"}
                      onChange={setPasscodeDetails}
                      onSubmit={submitPasscodeDetails}
                      onResend={resendPasscode}
                      onWrong={correctWrongNumber}
                  />
                </Grid>
              </Grid>
              )}
            {focusSection === "signup" && (
              <Grid container width="100%">
              <Grid
                xs={12}
                className="justifyGridCenter"
                sx={{
                  ...styles.form,
                  ...styles.centeredGrid,
                  ...fonts.portuguesa,
                  fontWeight: "400",
                  fontSize: "40px",
                  lineHeight: "32px"
                }}
              >
                <DrawSignupPanel 
                  onChange={setSignupDetails}
                  onSubmit={doSignup}
                  signupDetail={undefined}
                  emailHelperText={"Enter a valid email"} 
                  mobileHelperText={"Enter a valid mobile number"} 
                />
              </Grid>
              <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    OR
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Button
                          variant={'outlined'}
                          sx={styles.button}
                          onClick={signinWithGoogle}
                          className={`google`}
                    >
                      <img src={images.googleIcon} alt={'google pay icon'}/> Sign In with Google
                    </Button>
                  </Grid>
                  <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                    <Button
                          variant={'outlined'}
                          sx={styles.button}
                          className={`apple`}
                          onClick={signinWithApple}
                    >
                      <img src={images.appleIcon} alt={'apple pay icon'}/> Sign In with Apple
                    </Button>
                  </Grid>
                </Grid>
            )}
          </Grid>
        </FormGroup>
      </Container>
    </Page>
  );
}
