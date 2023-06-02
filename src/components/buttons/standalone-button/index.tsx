import _                      from 'lodash';
import React                  from 'react';
import {Box}                  from '@mui/material';
import {Button}               from '@mui/material';
// import {ButtonVariants}       from '@mui/material';
import {SxProps}              from '@mui/material';
import {Theme}                from '@mui/material';
import {useTheme}             from '@emotion/react';
import {getButtonVariant}     from 'src/utils/utils';
// import {getTypographyVariant} from 'src/utils/utils';

export interface IComponentProps
{
    buttonText: string;
    buttonTextColor?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
    fullWidth?: boolean;
    font?: string;
    buttonClick?: Function | null;
    variant?: string;
    disabled?: boolean;
    sx?: SxProps<Theme>;
    containerSx?:SxProps<Theme>;
    backgroundImage?: string;
    maxButtonWidth?: number;
}

/**
 * Absorb the themed button, but allow for a few changes for font and button colors
 * @param props Button Text, foreground/hover color, font if you need a different font
 * @returns styled <Button/>
 */
export default function StandaloneButton(props: IComponentProps): React.ReactElement {
    const {
              buttonText,
              buttonTextColor,
              buttonColor,
              buttonHoverColor,
              backgroundImage,
              font,
              buttonClick,
              fullWidth = false,
              sx,
              containerSx,
              disabled,
              variant   = 'contained',
              maxButtonWidth
          }     = props;
    // const theme = useTheme();

    const isImageButton = !_.isEmpty(backgroundImage);

    let style = {
        root : {
            width:"100%",
            justifyContent:"center",
            display:"flex",
            '& .MuiButtonBase-root' : {
                fontFamily      : font,
                fontWeight      : "400",
                marginLeft      : '4px',
                marginRight     : '4px',
                marginBottom    : "10px",
                '&:hover'       : {
                    backgroundColor : buttonHoverColor || ''
                },
                color           : buttonTextColor || '',
                backgroundColor : isImageButton ? 'transparent !important' : buttonColor || '',
                boxShadow       : isImageButton ? 'none' : '',
                '& img'         : {
                    maxWidth : `${maxButtonWidth || 250}px`
                }
            }
        }
    };

    return (
        <Box sx={{...style.root, ...containerSx}}>
            <Button
                disabled={disabled}
                disableElevation={isImageButton}
                variant={getButtonVariant(variant)}
                fullWidth={fullWidth}
                sx={{...sx}}
                onClick={() => buttonClick?.call(this)}
            >
                {
                    backgroundImage
                        ? <img src={backgroundImage} alt={''}/>
                        : buttonText
                }
            </Button>
        </Box>
    );
}
