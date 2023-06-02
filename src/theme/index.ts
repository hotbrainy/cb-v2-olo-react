// ref: https://www.welcomedeveloper.com/react-mui-theme

import {createTheme}       from '@mui/material';
import {createBreakpoints} from '@mui/system';
import {effects}           from '../shared/styles';
import {fonts}             from '../shared/styles';

import paletteColors from './paletteColors';


function pxToRem(value: number): string {
    return `${value / 16}rem`;
}


// WORK-AROUND: need to access the theme breakpoints (before they're defined)
const breakpoints = createBreakpoints({});

const theme = createTheme({
    breakpoints, // ensure the theme is using the same instance

    shape     : {borderRadius : 0},
    direction : 'ltr',

    components : {
        MuiAccordion : {
            defaultProps : {
                defaultExpanded : false
            },

            variants : [
                {
                    props : {},
                    style : {
                        background   : paletteColors.white,
                        borderRadius : 0,
                        marginBottom : '24px',

                        // TODO: move to a const ???
                        boxShadow : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`
                    }
                }
            ]
        },

        MuiAccordionSummary : {
            variants : [
                {
                    props : {},
                    style : {
                        // TODO: move to a const ???
                        ...{
                            fontFamily    : 'Cera',
                            fontWeight    : 'bold',
                            fontTransform : 'none',
                            fontSize      : '20px',
                            lineHeight    : '24px'
                        },

                        // color               : paletteColors.black,
                        fontFeatureSettings : `'liga' off`,
                        textTransform       : 'none'
                    }
                }
            ]
        },

        MuiAccordionDetails : {
            variants : [
                {
                    props : {},
                    style : {
                        // TODO: move to a const ???
                        ...{
                            fontFamily    : 'Cera',
                            fontWeight    : 'normal',
                            fontTransform : 'none',
                            fontSize      : '16px',
                            lineHeight    : '20px'
                        },

                        // color               : paletteColors.black,
                        fontFeatureSettings : `'liga' off`,
                        textTransform       : 'none'
                    }
                }
            ]
        },

        MuiButton : {
            defaultProps : {
                disableElevation   : true, // disable elevation, since a custom shadow will be applied
                disableFocusRipple : true,
                disableRipple      : true
            },

            variants : [
                {
                    // Over-ride the default "contained" variant
                    props : {variant : 'contained'},
                    style : {
                        // -- Common
                        ...{
                            color               : paletteColors.white,
                            background          : paletteColors.red,
                            textTransform       : 'none',
                            fontFamily          : 'Cera',
                            fontStyle           : 'normal',
                            fontWeight          : 900,
                            fontTransform       : 'none',
                            fontFeatureSettings : `'liga' off`,
                            boxShadow           : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`
                        },
                        // -- Mobile
                        ...{
                            fontSize   : pxToRem(16),
                            lineHeight : pxToRem(19)
                        },
                        // -- Desktop
                        ...{
                            [breakpoints.up('lg')] : {
                                fontSize   : pxToRem(20),
                                lineHeight : pxToRem(24)
                            }
                        }
                    }
                }
            ]
        },

        MuiMenuItem : {
            styleOverrides : {
                root : {
                    backgroundColor : 'transparent',
                    //color           : paletteColors.black,

                    // '&.Mui-focusVisible' : {
                    //     backgroundColor : paletteColors.red,
                    //     color           : paletteColors.white
                    // },

                    '&.Mui-selected' : {
                        backgroundColor : paletteColors.red,
                        color           : paletteColors.white
                    }
                }
            }
        },

        MuiListItemIcon : {
            styleOverrides : {
                root : {
                    minWidth : 0
                }
            }
        },

        MuiTypography : {
            defaultProps : {
                variantMapping : {
                    h1        : 'h2',
                    h2        : 'h2',
                    h3        : 'h2',
                    h4        : 'h2',
                    h5        : 'h2',
                    h6        : 'h2',
                    subtitle1 : 'h2',
                    subtitle2 : 'h2',
                    body1     : 'span',
                    body2     : 'span'
                    // TODO: custom variants here ...
                }
            }
        }
    },

    palette : {
        common : paletteColors,

        primary : {
            main         : paletteColors.red,
            light        : paletteColors.red,
            dark         : paletteColors.red,
            contrastText : paletteColors.white
        },

        secondary : {
            main         : paletteColors.black,
            light        : paletteColors.black,
            dark         : paletteColors.black,
            contrastText : paletteColors.white
        },

        // error             : PaletteColorOptions,
        // warning           : PaletteColorOptions,
        // info              : PaletteColorOptions,
        // success           : PaletteColorOptions,
        mode : 'light',
        // tonalOffset       : PaletteTonalOffset,
        // contrastThreshold : number,
        // common            : Partial < CommonColors >,
        // grey              : ColorPartial,
        // text              : Partial < TypeText >,
        divider : paletteColors.grey,
        action  : {
            // active             : string,
            hover        : paletteColors.grey,
            hoverOpacity : 0.6,
            // selected           : string,
            // selectedOpacity    : number,
            disabled           : paletteColors.white,
            disabledOpacity    : 1,
            disabledBackground : paletteColors.grey
            // focus              : string,
            // focusOpacity       : number,
            // activatedOpacity   : number
        }
        // background        : Partial < TypeBackground >,
        // getContrastText   : (background: string) => string
    },

    shadows : [
        'none',
        `0 4px 8px 2px rgba(0, 0, 0, 0.2)`, // Button Shadow
        `5px 5px 0 ${paletteColors.black}`, // Title Shadow
        `6px 8px 0 ${paletteColors.red}`,   // Hero Title Shadow
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none'
    ],

    typography : {
        h1        : {
            // -- Common
            fontFamily          : 'Comic Book',
            fontStyle           : 'normal',
            fontWeight          : 400,
            fontTransform       : 'none',
            color               : paletteColors.white,
            fontFeatureSettings : `'liga' off`,
            // -- Mobile
            fontSize   : pxToRem(48),
            lineHeight : pxToRem(61),
            textShadow : `4px 4px 0 ${paletteColors.red}`,
            // -- Desktop
            [breakpoints.up('lg')] : {
                fontSize   : pxToRem(150),
                lineHeight : pxToRem(192),
                textShadow : `6px 8px 0 ${paletteColors.red}`
            }
        },
        h2        : {
            // -- Common
            fontFamily          : 'Comic Book',
            fontStyle           : 'normal',
            fontWeight          : 900,
            fontTransform       : 'none',
            color               : paletteColors.yellow,
            textShadow          : `5px 5px 0 ${paletteColors.black}`,
            fontFeatureSettings : `'liga' off`,
            // Attempt to add font "border"
            WebkitTextStroke : `2px  ${paletteColors.black}`,
            // -- Mobile
            fontSize   : pxToRem(32),
            lineHeight : pxToRem(38),
            // -- Desktop
            [breakpoints.up('lg')] : {
                fontSize   : pxToRem(48),
                lineHeight : pxToRem(58)
            }
        },
        h3        : {},
        h4        : {
            // -- Common
            fontFamily          : 'Cera',
            fontStyle           : 'normal',
            fontWeight          : 900,
            fontTransform       : 'none',
            color               : paletteColors.black,
            fontFeatureSettings : `'liga' off`,
            // -- Mobile
            fontSize   : pxToRem(20),
            lineHeight : pxToRem(24),
            // -- Desktop
            [breakpoints.up('lg')] : {
                fontSize   : pxToRem(32),
                lineHeight : pxToRem(38)
            }
        },
        h5        : {},
        h6        : {
            // -- Common
            fontFamily          : 'Cera',
            fontStyle           : 'normal',
            fontWeight          : 900,
            fontTransform       : 'none',
            color               : paletteColors.black,
            fontFeatureSettings : `'liga' off`,
            // -- Mobile
            fontSize   : pxToRem(16),
            lineHeight : pxToRem(19),
            // -- Desktop
            [breakpoints.up('lg')] : {
                fontSize   : pxToRem(32),
                lineHeight : pxToRem(38)
            }
        },
        subtitle1 : {
            // -- Common
            fontFamily          : 'Cera',
            fontStyle           : 'normal',
            fontWeight          : 400,
            fontTransform       : 'none',
            color               : paletteColors.black,
            fontFeatureSettings : `'liga' off`,
            // -- Mobile
            fontSize   : pxToRem(12),
            lineHeight : pxToRem(16),
            // -- Desktop
            [breakpoints.up('lg')] : {
                fontSize   : pxToRem(24),
                lineHeight : pxToRem(24)
            }
        },
        subtitle2 : {},
        body1     : {},
        body2     : {},
        button    : {},
        caption   : {},
        overline  : {}

    }
});

export default theme;
