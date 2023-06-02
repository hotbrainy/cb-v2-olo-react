import { effects, fonts, formStyles } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";

export const checkoutStyles = {
  root: {
    ...formStyles.formBuilder,
    lineHeight: "16px",
    fontSize: "14px",
    "& .padBottom": {
      paddingBottom: "8px",
    },
    "& .portuguese": {
      ...fonts.portuguesa,
    },
    "& .matter": {
      ...fonts.matter,
    },
    "& .heading": {
      fontWeight: "700",
      fontSize: "14px",
    },
    "& .MuiSwitch-root": {
      "& .Mui-checked": {
        "& .MuiSwitch-thumb": {
          color: paletteColors.oportoOrange,
          "& :hover": {
            backgroundColor: "transparent",
          },
        },
        "& .MuiSwitch-track": { backgroundColor: paletteColors.oportoOrange },
      },
      "& :hover": {
        backgroundColor: "transparent",
      },
    },
  },
  button: {
    ...fonts.portuguesa,
    ...effects.buttonShadow,
    width: "100%",
    height: "36px",
    fontSize: { xs: "12px", sm: "18px" },
    lineHeight: { xs: "14px", sm: "20px" },
    backgroundColor: "#97979720",
    borderColor: "#97979750",
    borderRadius: "8px",
    color: "#979797",
    "&.selected": {
      backgroundColor: paletteColors.oportoOrange,
      color: paletteColors.white,
      "&:hover": {
        backgroundColor: `${paletteColors.oportoOrange}60`,
        borderColor: paletteColors.oportoOrange,
      },
    },
    "&:hover": {
      backgroundColor: "#97979740",
      borderColor: "#97979760",
    },
  },
  form: {
    ...formStyles.formBuilder,
    lineHeight: "16px",
    fontSize: "14px",
    "& .heading": {
      ...fonts.portuguesa,
      fontSize: "34px",
      lineHeight: "36px",
      fontWeight: "700",
    },
    "& .horizontalLine": {
      borderBottom: `1px solid ${paletteColors.grey}`,
    },
  },
};
