import { fonts } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";

export const receiptStyles = {
	root : {
		alignSelf   			: 'center',
		justifySelf 			: 'center',
		width       			: '-webkit-fill-available',
		height      			: '100%',
		alignItems  			: 'center',
		...fonts.ceraPro,
		'& .MuiGrid2-root' : {
			display        		: 'flex'
		},
		"& .topLine"  : {
			borderTop 			: `2px solid ${paletteColors.lightGrey}`,
		},
		"& .bigHead" 	: {
			fontWeight  		: '700',
			fontSize			: {xs:"24px", sm:"32px"},
		},
		"& .smallHead" 			: {
			fontWeight			: "700",
			fontSize			: {xs:"16px", sm:"24px"},
		},
		"& .left": {
			textAlign			:"left",
			justifyContent		: "flex-start",
		},
		"& .cardDetails" : {
			fontWeight			: "400",
			fontSize			: {xs:"12px", sm:"16px"},
			"& img": {
				 height			: {xs:"25px"}
			},
		},
		"& .addressDetails" : {
			fontWeight			: "400",
			fontSize			: {xs:"12px", sm:"16px"},
		},
		"& .summaryDetails" : {
			fontWeight			: "400",
			fontSize			: {xs:"14px", sm:"18px"},
		},
		"& .capitalize": {
			textTransform 		: "capitalize",
		},
		"& .totalSection" :{
			...fonts.matter,
			fontWeight			:"700",
			fontSize			:{xs:"20px",sm:"20px"}
		},
		"& .topDotted": {
			backgroundImage		: "linear-gradient(to right, black 30%, rgba(255,255,255,0) 0%)",
			backgroundPosition	: "top",
			backgroundSize		: "6px 1px",
			backgroundRepeat	: "repeat-x",
		}
	},
	section : {
		...fonts.ceraPro,
		fontWeight				: '700',
		fontSize				: {xs:'12px', sm:'16px'},
		paddingBottom 			: '24px',
	},
	paperTear : {
		backgroundSize			: "contain",
		backgroundRepeatX		: "repeat",
		height					: {xs:"15px", sm:"25px"},
		minHeight				: {xs:"15px", sm:"25px"},
		backgroundColor			: "transparent",
		zIndex					: 10,
		borderRight				: '3px solid #00000015',
		borderLeft				: '3px solid #00000015',
		width					: {xs:'91%',sm:'calc(100% + 6px)'},
	}
};
