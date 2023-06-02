import { effects, fonts } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import { checkoutStyles } from "../checkout/localStyles";

export const locationsStyles = {
	containerStyle : {
		width        : '100%',
		height       : '720px',
		borderRadius : '12px'
	},
	root           : {
		'& .heading'        : {
			fontSize : '40px'
		},
		'& .horizontalLine' : {
			maxWidth   : '50%',
			marginLeft : 0
		},
		'& .button'         : {
			width  : {xs : '100%', sm : '170px !important'},
			height : {xs : '35px', sm : '48px'},
			...fonts.ceraPro,
			fontSize   : '18px',
			fontWeight : 700
		},
		'& .yellow'         : {
			color           : paletteColors.black,
			backgroundColor : paletteColors.yellow
		},
		'& .black'          : {
			backgroundColor : paletteColors.black
		}
	},
	deliveryButton : {
		lineHeight                     : 'normal',
		'& .MuiToggleButtonGroup-root' : {
			height : {xs : '30px', sm : '50px'}
		},
		'& .MuiToggleButton-root'      : {
			...fonts.matter,
			minWidth      : {xs : '110px !important', sm : '240px !important'},
			padding       : {xs : '2px', sm : '12px'},
			border        : 0,
			fontStyle     : 'normal',
			fontWeight    : '400',
			fontSize      : {xs : '16px !important', sm : '24px !important'},
			lineHeight    : 'normal',
			display       : 'flex',
			alignItems    : 'flex-end',
			textAlign     : 'center',
			letterSpacing : '-0.05em'
		}
	},
	storeList      : {
		'& .MuiInputBase-root'            : {
			backgroundColor : `${paletteColors.lightGrey} !important`,
			border          : `0 !important`
		},
		'& .filter'                       : {
			...fonts.portuguesa,
			color      : paletteColors.black,
			fontWeight : 700,
			fontSize   : '20px',
			cursor     : 'pointer'
		},
		'& .collapse'                     : {
			...fonts.matter,
			color      : paletteColors.black,
			fontWeight : 700,
			fontSize   : '12px',
			cursor     : 'pointer'
		},
		'& .selected'                     : {
			color                    : paletteColors.red,
			textDecoration           : 'underline',
			textDecoractionThickness : '2px'
		},
		'& .storeName'                    : {
			...fonts.portuguesa,
			fontWeight : 700,
			fontSize   : {xs : '20px', sm : '32px'},
			lineHeight : 'normal'
		},
		'& .addressBlock'                 : {
			display        : 'flex',
			justifyContent : {xs : 'start', sm : 'start'}
		},
		'& .storeABN': {
			display        : 'flex',
			justifyContent : {xs : 'start', sm : 'start'}
		},
		'& .open'                         : {
			color      : paletteColors.green,
			fontWeight : 700
		},
		'& .closed'                       : {
			color      : paletteColors.red,
			fontWeight : 700
		},
		'& .storeDetail'                  : {
			...fonts.matter,
			paddingTop    : '2px',
			paddingBottom : '12px',
			marginBottom  : '12px'
		},
		'& .storeDetail:not(:last-child)' : {
			borderBottom : `2px solid ${paletteColors.black}60`
		},
		'& .moreInfo'                     : {
			fontFamily     : 'Matter',
			fontWeight     : 700,
			fontSize       : '14px',
			textDecoration : 'underline',
			cursor         : 'pointer',
			'& svg'        : {
				height      : '15px',
				width       : '15px',
				marginRight : '4px'
			}
		}
	},
	storeLookup    : {
		'& .searchBox'  : {
			...fonts.portuguesa
		},
		backgroundColor : paletteColors.white,
		...effects.buttonShadow,
		...checkoutStyles.form,
		borderRadius            : {xs : '25px', sm : '12px'},
		borderBottomLeftRadius  : {xs : 0, sm : '12px'},
		borderBottomRightRadius : {xs : 0, sm : '12px'},
		height                  : 'fit-content',
		zIndex                  : {xs : 'unset', sm : 1},
		padding                 : '12px',
		'& .MuiInputBase-input' : {
			padding : '4px'
		}
	},
	storeSelector  : {
		...fonts.matter,
		backgroundColor : paletteColors.white,
		...effects.buttonShadow,
		boxShadow               : {xs : 'none', sm : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`},
		padding                 : '12px',
		maxHeight               : '515px',
		overflow                : 'auto',
		height                  : {xs : '100%', sm : 'unset'},
		borderBottomRightRadius : '12px',
		borderBottomLeftRadius  : '12px',
		marginTop               : '-5px',
		paddingTop              : '17px'
	},
	backButton     : {
		...effects.buttonShadow,
		height          : '48px',
		width           : '220px',
		backgroundColor : paletteColors.white,
		padding         : '8px',
		fontFamily      : 'Matter',
		fontWeight      : 700,
		fontSize        : '24px',
		cursor          : 'pointer',
		display         : 'flex',
		alignItems      : 'center',
		borderRadius    : '12px',
		'& img'         : {
			marginRight : '4px'
		},
		'&:hover'       : {
			backgroundColor : paletteColors.lightGrey
		}
	},
	distance       : {
		...fonts.matter,
		fontWeight  : 700,
		fontSize    : '16px',
		paddingTop	: "2px",
	},
	favourite      : {
		'& svg' : {
			fill     : paletteColors.yellow,
			stroke   : paletteColors.yellow,
			fontSize : '18px'
		}
	},
};