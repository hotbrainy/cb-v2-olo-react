import {CommonColors as MuiCommonColors} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette'
{
    // Extend the MUI CommonColors interface
    interface CommonColors extends MuiCommonColors
    {
        // black: string; // already defined via MUI
        // white: string; // already defined via MUI
        red: string;
        yellow: string;
        brown: string;
        grey: string;
        coolGrey: string;
        lightGrey: string; // TODO: review this... in Figma design, but undocumented
        grey10: string;
        darkGrey: string;
        green: string;
    }
}
