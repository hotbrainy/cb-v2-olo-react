import { fonts } from "src/shared/styles";
import theme from "src/theme";
import paletteColors from "src/theme/paletteColors";
import { checkoutStyles } from "src/views/checkout/localStyles";

export const flameStyles = {
	'& .MuiGrid2-root'      : {
		display					: "flex",
		marginBottom			: 0,
		paddingRight			: 0,
	},
	'& .MuiButtonBase-root'		: {
		height					: "46px",
	},
	tagTypeOne				: {
		flexDirection			: "column",
		width					: "100%",
		"& .heading1":{
			alignItems			: "end",
			height				: "30%",
			width				: "100%",
			fontSize			: "24px",
			fontWeight			: 700,
		},
		"& .levelLabel":{
			width				: "100%",
			height				: "70%",
			alignItems			: "start",
			paddingTop			: "5%",
								...fonts.portuguesa,
			fontSize			: {xs: "50px", sm:"60px"},
			fontWeight			: "700",
			lineHeight			: "normal",
			textTransform		: "uppercase",
			"& img": {
				height			: {xs:"60px", sm:"70px"},
				marginTop		: "5px",
			},
		},
		"& .dollarAmount":{
			width				: "100%",
			height				: "70%",
			alignItems			: "start",
			paddingTop			: "1%",
								...fonts.portuguesa,
			fontSize			: "75px",
			fontWeight			: "400",
			lineHeight			: "normal",
			textTransform		: "uppercase",
			"& .orange":{
				color			: paletteColors.oportoOrange,
			},
			"& img": {
				height			: "70px",
				marginTop		: "5px",
			},
		},
	},
};