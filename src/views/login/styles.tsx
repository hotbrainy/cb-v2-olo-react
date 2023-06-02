import { effects, fonts } 		from "src/shared/styles";
import paletteColors 			from "src/theme/paletteColors";
import { checkoutStyles } 		from "../checkout/localStyles";
import theme 					from "src/theme";

export const styles = {
    ...checkoutStyles,
    form                      	: {
      ...checkoutStyles.form,
    },
	inputFields				  	: {
		"& .MuiInputBase-input"	: {
			fontSize			:"24px",
			fontWeight			: 700,
			textAlign			: "center",
		}
	},
    container1					: {
      paddingTop 				: theme.spacing(3),
      paddingBottom				: theme.spacing(3),
      minHeight					: "500px",
    },
    gridContainer: {
      "& .MuiGrid2-root"      : { marginBottom: "12px" },
    },
    centeredGrid: {
      width                   : "100%",
      display                 : "flex",
    },
    buttonGroup: {
      backgroundColor         : paletteColors.darkGrey,
      "& .MuiToggleButton-root": {
        ...fonts.portuguesa,
        border                : 0,
        fontStyle             : "normal",
        fontWeight            : "400",
        fontSize              : "24px",
        lineHeight            : "20px",
        display               : "flex",
        alignItems            : "flex-end",
        textAlign             : "center",
        letterSpacing         : "-0.05em",
      },
    },
    button                    : {
                              ...effects.buttonShadow,
      width                   : "360px !important",
      height                  : "72px !important",
      fontSize                : { xs: "12px", sm: "18px" },
      fontWeight              : '700',
      lineHeight              : { xs: "14px", sm: "20px" },
      backgroundColor         : paletteColors.red,
      border                  : "none",
      borderRadius            : "8px",
      color                   : paletteColors.white,
      textTransform           : 'unset',
      '& img'                 : {
        height                : '26px',
        marginRight           : '12px'
      },
      "&.apple"               : {
        backgroundColor       : paletteColors.black,
        color                 : paletteColors.white,
      },
      "&.google"              : {
        backgroundColor       : paletteColors.white,
        color                 : `${paletteColors.black}70`,
      },
    },
	forgotPasswordLink		 : {
		fontFamily			 : 'Matter',
		fontWeight			 : 700,
		fontSize			 : "20px",
		lineHeight			 : "18px",
		textDecoration		 : "underline",
		color				 : paletteColors.black,
		cursor				 : "pointer",
	},
  };

