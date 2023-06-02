import { fonts } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import { styles } from "../../styles";

export const profileStyles = {
	...styles,
	gridContainer: {
		...fonts.matter,
		fontSize: '20px',
		'& .MuiGrid2-root': { display:"flex", marginBottom: "4px", marginTop:"4px", alignItems:"center" },
		'& .heading': {
			fontSize: '30px',
			lineWeight: '32px',
			...fonts.portuguesa,
		},
		'& .MuiButtonBase-root': {
			'&:hover': {
				backgroundColor: paletteColors.lightGrey,
				color: `${paletteColors.black} !important`,
			},
		},
		'& .MuiOutlinedInput-input': {
			padding: '4px',
			paddingTop: '5px',
			paddingBottom: '3px',
			paddingLeft: '8px',
			fontSize: '20px',
			height: 'unset',
			backgroundColor: paletteColors.white,
			...fonts.matter,
		},
		'& .MuiInputBase-root': {
			borderRadius: '8px',
		},
	},
	buttonGroup: {
		backgroundColor: paletteColors.darkGrey,
		'& .MuiToggleButton-root': {
			...fonts.portuguesa,
			border: 0,
			fontStyle: 'normal',
			fontWeight: '400',
			fontSize: '24px',
			lineHeight: '20px',
			display: 'flex',
			alignItems: 'flex-end',
			textAlign: 'center',
			letterSpacing: '-0.05em',
		},
	},
	fieldValue:	{
		display						: "flex",
		color						: paletteColors.black,
		justifyContent				: "start",
		textAlign					: "start",
		paddingLeft					: '8px',
		"& .MuiOutlinedInput-input"	: {
			fontSize				: {
										xs: "14px",
										sm: "20px",
			},
		},
	},
	fieldTitleLabel: {
		color						: paletteColors.darkGrey,
		lineHeight					: "14px",
		alignItems					: "start",
	},
	editSaveButton: {
		...fonts.portuguesa,
		minWidth					: {
										xs: "45px",
										sx: "64px",
									},
		height						: {
										xs: '25px !important',
										sm: '30px !important',
									},
		width: '120px !important',
		borderRadius: '4px',
		fontSize					: {
										xs: '14px !important',
										sm: '18px !important',
									},
		color: `${paletteColors.darkGrey}  !important`,
		border: `1px solid ${paletteColors.darkGrey}`,
		boxShadow: `2px 2px 5px 2px ${paletteColors.oportoBlack}20`,
	},
};