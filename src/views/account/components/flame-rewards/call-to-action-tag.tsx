import React 				from "react";
import { Box, CircularProgress, Paper, SxProps, useMediaQuery } 			from "@mui/material";
import Grid 				from "@mui/material/Unstable_Grid2";
import { breakpoints, fonts, images } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import { relative } from "path";
import { IMemberDetails } from "../../account";

export interface ICallToActionTag {
	icon?					: string;
	informationLink?		: string;
	topText?				: string | React.ReactElement;
	subText?				: string;
	maxValue?				: number;
	percentage?				: number;
}

const styles = {
	paper: {
		"& .paper": {
			padding			: "12px",
			width			:"100%",
			borderRadius	: "14px",
			"& .row1": {
				display		: "contents",
				height		: "10%",
				"& img": {
					height	: "40px",
				},
			},
			"& .row2": {
				...fonts.portuguesa,
				fontWeight: 400,
				fontSize: "44px",
				lineHeight: "38px",
			},
			"& .row3": {
				height		: "10%",
			},
			"& .row4": {
				height		: "30%",
				...fonts.portuguesa,
				color		: paletteColors.oportoBlack,
				fontWeight	: 500,
				fontSize	: "20px",
				lineHeight	: "22px",
			},
		},
	},
}

export function DrawCallToActionChart(props:{type?:number, sxProps?:SxProps, tagDetail:ICallToActionTag, memberDetails:IMemberDetails}){
	const { tagDetail,sxProps,type, memberDetails } 	= props;
	const correctedPercentage 							= tagDetail.percentage ? Math.round(75 * (tagDetail.percentage/100)) : 75;
	const nextLevelVisitsRequired 						= memberDetails.visitsRequiredForNextLevel-memberDetails.visits;
	const fontSize 										= nextLevelVisitsRequired>9 ? "70px" : "100px";
	const paddingTop 									= nextLevelVisitsRequired>9 ? "10px" : "5px";
	const smAndUp 										= useMediaQuery(breakpoints["sm"]);
	const circleSize 									= 220;

	const cpStyles = {
		circularProgress	:{
			position		: "relative",
			transform		:"rotate(-135deg)",
			color			: `${paletteColors.oportoBlack}70`,
			"& .MuiCircularProgress-circleDeterminate":{
				backgroundColor: "red",
			},
			"&.backgroundCircle": {
				position	: "absolute",
				color		: `${paletteColors.oportoBlack}30`,
			}
		},
		container : {
			"& .smallPercent": {
				fontSize		: "40px",
				display			: "flex",
				alignItems		: "end",
			},
		},
	}

	return (
	<Grid container width={"100%"} sx={styles.paper}>
		{!type && (
			<Paper sx={sxProps} className="paper">
				<Grid container width="100%" height="100%">
					<Grid xs={12} className="row1">
						<Grid xs={6} justifyContent="start">{tagDetail.icon && (<img src={tagDetail.icon} />)}</Grid>
						<Grid xs={6} justifyContent="end"><img src={images.infoIcon} /></Grid>
					</Grid>
					<Grid xs={12} className="row2" display="flex" justifyContent={"center"} alignItems="center">
						<Box sx={cpStyles.circularProgress}>
							<CircularProgress size={circleSize} thickness={5} color="inherit" variant="determinate" value={correctedPercentage} />
						</Box>
						<Box sx={cpStyles.circularProgress} className={"backgroundCircle"}>
							<CircularProgress size={circleSize} thickness={5} color="inherit" variant="determinate" value={75} />
						</Box>
						<Box position={"absolute"} width={150} sx={{marginTop:"-30px"}}>
							<Grid container>
								<Grid xs={12} justifyContent="center">Just</Grid>
								<Grid xs={4} sx={{color:paletteColors.oportoOrange, fontSize:{fontSize}, paddingTop:{paddingTop}}} alignItems="start">{nextLevelVisitsRequired}</Grid>
								<Grid xs={8}>
									<Grid container>
										<Grid xs={12}>more</Grid>
										<Grid xs={12}>visits</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid xs={12} className="row4" justifyContent={"center"}>{tagDetail.subText}</Grid>
				</Grid>
			</Paper>
		)}
		{type==2 && (
			<Paper sx={sxProps} className="paper">
				<Grid container width="100%" height="100%" sx={cpStyles.container}>
					<Grid xs={12} className="row1">
						<Grid xs={6} justifyContent="start">{tagDetail.icon && (<img src={tagDetail.icon} />)}</Grid>
						<Grid xs={6} justifyContent="end"><img src={images.infoIcon} /></Grid>
					</Grid>
					<Grid xs={12} className="row2" display="flex" justifyContent={"center"} alignItems="center">
						<Box sx={cpStyles.circularProgress}>
							<CircularProgress size={circleSize} thickness={5} color="inherit" variant="determinate" value={correctedPercentage} />
						</Box>
						<Box sx={cpStyles.circularProgress} className={"backgroundCircle"}>
							<CircularProgress size={circleSize} thickness={5} color="inherit" variant="determinate" value={75} />
						</Box>
						<Box position={"absolute"} width={150}>
							<Grid container className="centerText">
								<Grid xs={12} justifyContent="center">You're</Grid>
								<Grid xs={12} sx={{color: paletteColors.oportoOrange, fontSize:"100px"}} justifyContent="center" alignItems="end"
								><Box sx={{height:"60px"}}>{tagDetail.percentage}</Box><span className="smallPercent">%</span>
								</Grid>
								<Grid xs={12} justifyContent="center">there</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid xs={12} className="row4" justifyContent={"center"}>{tagDetail.subText}</Grid>
				</Grid>
			</Paper>
		)}
	</Grid>
	)
}

export function DrawCallToActionTag(props:{sxProps?:SxProps, tagDetail:ICallToActionTag}) {
	const { tagDetail,sxProps } = props;

	return (
		<Grid container width={"100%"} sx={styles.paper}>
			<Paper sx={sxProps} className="paper">
				<Grid container width="100%" height="100%">
				<Grid xs={12} className="row1">
				<Grid xs={6} justifyContent="start">{tagDetail.icon && (<img src={tagDetail.icon} />)}</Grid>
				<Grid xs={6} justifyContent="end"><img src={images.infoIcon} /></Grid>
				</Grid>
				<Grid xs={12} className="row2">{tagDetail.topText}</Grid>
				<Grid xs={12} className="row3"><Box sx={{borderBottom:`2px solid ${paletteColors.oportoOrange}`, width:"10%", height:"12px"}}></Box></Grid>
				<Grid xs={12} className="row4">{tagDetail.subText}</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}