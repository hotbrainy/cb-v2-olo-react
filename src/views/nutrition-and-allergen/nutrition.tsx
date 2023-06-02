import _ from "lodash";
import React, { useState, useEffect } from "react";
import Grid               			from '@mui/material/Unstable_Grid2';
import { useParams, useNavigate } from "react-router-dom";
import Page from "src/components/page";
import useConfig from "src/components/useConfig";
import { useAppDispatch } from "src/store";
import { DrawCheckoutFlowHeaderRow } from "../checkout/components/header-row/checkout-flow-header";
import { receiptStyles } from "../checkout/components/receipt-parts/styles";
import { apiFetchNutrientInfo } from "src/store/nutrition-and-allergen";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import paletteColors from "src/theme/paletteColors";
import { Box, Typography } from "@mui/material";
import rehypeRaw from "rehype-raw";
import { images } from "src/shared/styles";
import { Expand, ExpandLess } from "@mui/icons-material";
import { useSelector } from "react-redux";

const nutritionStyles = {
	root : {
		marginLeft: "auto",
    	marginRight: "auto",
    	width: "100%",
    	alignSelf: "flex-start",
		paddingLeft: {xs:"12px",sm:0},
		paddingRight: {xs:"12px",sm:0},
	},
	markdown : {
		"& table" : {
			marginLeft		: "auto",
			marginRight		: "auto",
			borderCollapse	: "collapse",
			width			: "100%",
			lineHeight		: "normal",
			fontSize		: {xs:"14px", sm:""},
		},
		"& table thead tr th" : {
		},
		"& table th, table td" : {
			textAlign		: "start",
			padding			: "4px 8px",
		},
		"& td": {
			verticalAlign	: "top",
			textAlign		: "start",
			minWidth		: {xs:"130px",sm:"190px"},
		},
		"& p" : {
			marginTop		: "4px",
			marginBottom	: "4px",
		},
		"& h4": {
			marginTop		: "4px",
			marginBottom	: "4px",
		},
	},
}

export interface INutritionInfo {
	detail?			: string;
	ingredients?	: string;
	plu?			: string;
	productName?	: string;
}

export function NutritionPage() {
	const props = useParams();
	const productPlu = props.plu;
    const navigate = useNavigate();

	return (
        <Page>
			<Grid
				container
				className="theme"
				display="flex"
				flexDirection={"column"}
				sx={{...nutritionStyles.root}}
			>
				<Grid
					xs={12} flex={1}
					className={'theme'}
					width={"100%"}
					marginTop={'4px'}
					justifyContent={"flex-start !important"}
				>
					<DrawCheckoutFlowHeaderRow/>
				</Grid>
				<DrawNutrionInfo productPlu={productPlu} />
			</Grid>
		</Page>
    );
}

export function DrawNutrionInfo (props:{productPlu?: string}) {
	const {productPlu} = props;
	const config   = useConfig();
    const dispatch = useAppDispatch();

	const nutrientState    = useSelector((state: any) => state.nutritionAllergen);
	const {nutrientInfo} = nutrientState;

	//TODO - call the APi and drag the nutrition data from the ether
	const [iOpen, setIOpen] = useState(false);
	const [doneLookup,setDoneLookup] = useState(false);

	useEffect(()=>{
		// we have productPlu passed in from the url /nutrition/:plu
		if(!doneLookup && !_.isEmpty(productPlu) && !nutrientState.loading) {
			setDoneLookup(true);
			dispatch(apiFetchNutrientInfo({config, plu:productPlu!}))
		}
		if(doneLookup)  setIOpen((nutrientInfo?.ingredients || "").length<250);
	},[nutrientInfo,nutrientState,doneLookup])

	return <>
		<Grid
			width={'100%'}
			flex={1}
			paddingTop={0}
			flexDirection="column"
			className="justifyGridLeft"
			mt={{xs:1, sm:3}}
			mb={2}
			zIndex={1}
			sx={{...nutritionStyles.markdown, borderBottom:_.isEmpty(nutrientInfo) ? 0 : `1px solid ${paletteColors.grey}`,paddingBottom:"24px"}}
			textAlign={"center"}
		>
				<Typography variant="h6" sx={{textAlign:"center"}}>{nutrientInfo?.productName || "No nutritional information available"}</Typography>
		</Grid>
		{!_.isEmpty(nutrientInfo) && <Grid
			width={'100%'}
			flex={1}
			paddingTop={0}
			flexDirection="column"
			mt={{xs:1, sm:3}}
			zIndex={1}
			sx={{...nutritionStyles.markdown}}
		>
			{<ReactMarkdown remarkPlugins={[remarkGfm]} children={nutrientInfo?.detail || ""} />}
		</Grid>}
		{!_.isEmpty(nutrientInfo) && <Grid
			width={'100%'}
			flex={1}
			paddingTop={0}
			flexDirection="column"
			className="justifyGridLeft"
			mt={{xs:1, sm:3}}
			mb={2}
			zIndex={1}
			sx={{...nutritionStyles.markdown}}
		><Box onClick={()=>setIOpen(!iOpen)} sx={{cursor:"pointer"}}>
			<Box sx={{display:"flex", alignItems: "start",transform: `rotate(${iOpen ? '0' : '180'}deg)`,float:"right"}}><ExpandLess /></Box>
			<Typography variant="h6">Ingredients:</Typography>
		</Box>
			{iOpen && <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={nutrientInfo?.ingredients || ""} />}
		</Grid>}
	</>
}
