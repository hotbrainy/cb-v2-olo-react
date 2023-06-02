import { effects, fonts } from "src/shared/styles";
import theme from "src/theme";
import paletteColors from "src/theme/paletteColors";
import { checkoutStyles } from "../checkout/localStyles";

export const styles = {
	...checkoutStyles,
	form: {
		...checkoutStyles.form,
	},
	container1: {
		paddingTop              : theme.spacing(3),
		paddingBottom           : theme.spacing(3),
		minHeight               : '500px',
	},
	menu: {
		boxShadow				: {	sm:`0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
									xs:"none"
		},
		backgroundColor			: {	xs:"transparent",
									sm:paletteColors.white 
		},
		padding					: {	xs:0, 
									sm:'12px'
		},
		width					: '100%',
		borderRadius			: '14px'
	},
	gridContainer: {
		'& .profile'			: {
			fontSize			: {xs:"14px", sm:"20px"},
		},
		'& .MuiGrid2-root'      : {
			marginBottom		: {
									xs: "8px",
									sm: '12px',
			},
			paddingRight		: {
									xs:0,
									sm:"12px"
			},
			"& .noOffset": {
				marginBottom	:0,
				paddingRight	:0,
			},
		},
		'& .heading': {
			fontSize            : '34px',
			lineWeight          : '36px',
			...fonts.portuguesa,
		},
		'& .smallHeading': {
			fontSize            : '34px',
			lineWeight          : '36px',
			...fonts.portuguesa,
		},
		'& .tagline': {
			fontSize            : '16px',
			lineWeight          : '16px',
			color               : `${paletteColors.black}50`,
			...fonts.matter,
		},
		'& .menuline': {
			fontSize            : '20px',
			lineWeight          : '20px',
			padding             : "8px",
			color               : `${paletteColors.black}`,
			cursor              : "pointer",
			backgroundColor		: {
									xs:paletteColors.white,
									sm: "transparent",
								},
			borderRadius    	: "8px",
			boxShadow			: {	xs:`0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
									sm:"none"},
			...fonts.portuguesa,
			"&.selected":{
				backgroundColor : paletteColors.oportoOrange,
				color           : paletteColors.white,
			},
		},
	},
	buttonGroup: {
		backgroundColor         : paletteColors.darkGrey,
		width					:"100%",
		'& .MuiToggleButton-root': {
								...fonts.portuguesa,
			border              : 0,
			width				: "50%",
			fontStyle           : 'normal',
			fontWeight          : '400',
			fontSize            : '24px',
			lineHeight          : '20px',
			display             : 'flex',
			alignItems          : 'flex-end',
			textAlign           : 'center',
			letterSpacing       : '-0.05em',
			minWidth			: {xs:"unset", sm:"240px"}
		},
	},
};