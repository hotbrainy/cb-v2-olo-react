import _ from "lodash";
import React, { useEffect, useState } from "react";

// Global Components
import Grid from "@mui/material/Unstable_Grid2";
import ButtonGroup from "src/components/buttons/button-group";
import { styles } from "../../styles";
import { flameStyles } from "./flame-styles";
import { Box, Paper } from "@mui/material";
import { getLinearStyle } from "src/components/display/reward-tier-panel/reward-tier-panel";
import { getRewardBadge } from "../flame-rewards";
import { IMemberDetails } from "../../account";
import { DrawCallToActionChart, DrawCallToActionTag } from "./call-to-action-tag";
import { images } from "src/shared/styles";

export function DrawFlameLevelTag(props:{level:string}){
	const {level} = props;
	return <Paper sx={{width:"100%", borderRadius:"12px",minHeight:"204px"}}>
		<Grid container width="100%" height="100%" sx={flameStyles.tagTypeOne}>
			<Grid xs={4} alignItems="center" justifyContent={"center"} className="heading1">Flame Level</Grid>
			<Grid xs={8} alignItems="center" justifyContent={"center"} className={`${getLinearStyle(level)} levelLabel`}><img src={getRewardBadge(level)} />{level}</Grid>
		</Grid></Paper>
}

export function DrawRewardDollarsTag(props:{rewardDollars:number}){
	const {rewardDollars} = props;
	return <Paper sx={{width:"100%", borderRadius:"12px",minHeight:"204px"}}>
		<Grid container width="100%" height="100%" sx={flameStyles.tagTypeOne}>
			<Grid xs={4} alignItems="center" justifyContent={"center"} className="heading1">Your Reward Dollars</Grid>
			<Grid xs={8} alignItems="center" justifyContent={"center"} className="dollarAmount"><span className="orange">$</span>{rewardDollars.toFixed(2)}</Grid>
		</Grid></Paper>
}

export function DrawFlamePage(props:{memberDetails:IMemberDetails}) {
	const { memberDetails } = props;
	const percentageThroughLevel = Math.round(memberDetails.visits / memberDetails.visitsRequiredForNextLevel * 100);
    return (
        <Grid container width={"100%"} className="theme" mt={2} columnGap={"18px"} rowGap={"18px"}>
            <Grid xs={12} width={"100%"} className="justifyGridCenter" columnGap={"18px"} rowGap={"18px"} flexDirection={{xs:"column", sm:"row"}}>
				<Grid xs={12} sm={6} justifyContent="center">
					<DrawFlameLevelTag level={memberDetails.level} />
				</Grid>
				<Grid xs={12} sm={6} justifyContent="center">
					<DrawRewardDollarsTag rewardDollars={memberDetails.rewardDollars} />
				</Grid>
            </Grid>
			<Grid xs={12} width={"100%"} className="justifyGridCenter" >
				<Grid container width="100%" columnGap={"18px"} rowGap={"18px"}>
					<Grid xs={12} sm={4}>
						<DrawCallToActionChart sxProps={{height:{minHeight:"250px"}}} type={2} tagDetail={{ percentage:percentageThroughLevel, subText:`Complete your profile for hotter rewards.` }} memberDetails={memberDetails} />
					</Grid>
					<Grid xs={12} sm={4}>
						<DrawCallToActionChart sxProps={{height:{minHeight:"250px"}}} tagDetail={{ percentage:percentageThroughLevel, subText:`Before you hit ${memberDetails.nextLevel} Flame.` }} memberDetails={memberDetails}/>
					</Grid>
					<Grid xs={12} sm={4}>
						<DrawCallToActionTag sxProps={{height:{minHeight:"250px"}}} tagDetail={{ icon:images.profileOrange, topText:"Share the love get $10 OFF.", subText:"Refer a friend and you both get $10 off." }} />
						</Grid>
					<Grid xs={12} sm={4}>
						<DrawCallToActionTag sxProps={{height:{minHeight:"250px"}}} tagDetail={{ icon:images.giftOrange, topText:<Box sx={{width:"100%", justifyContent:"center",textAlign:"center"}}><Box>Spice up your</Box><Box>b-day!</Box></Box>, subText:"Add your DOB to your Profile and get a hot treat on us." }} />
					</Grid>
				</Grid>
			</Grid>
        </Grid>
    );
}
