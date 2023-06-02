import React          from 'react';
import {ArrowBackIos} from '@mui/icons-material';
import {Button}       from '@mui/material';
import {Theme}        from '@mui/material';
import {settings}     from 'src/shared/config-settings';
import {effects}      from 'src/shared/styles';
import {fonts}        from 'src/shared/styles';

export function DrawBackButton(props: { onClick?: Function, buttonText?: string }): React.ReactElement {
    const {onClick, buttonText} = props;

    const styles = {
        actionButton : {
            '&:hover' : {
                ...effects.buttonShadow,
                backgroundColor : (theme: Theme) => theme.palette.common.white
            },
            ...effects.buttonShadow,
            ...fonts.ceraBlack,
            minWidth                 : 'auto',
            width                    : '48px',
            cursor                   : 'pointer',
            padding                  : '10px 16px',
            fontSize                 : '24px',
            lineHeight               : '22px',
            color                    : (theme: Theme) => theme.palette.common.black,
            backgroundColor          : (theme: Theme) => theme.palette.common.white,
            textTransform            : 'none',
            letterSpacing            : '0.002em',
            '& .MuiButton-startIcon' : {
                marginLeft  : '8px',
                marginRight : 0
            }
        }
    };

    return (
        <Button
            variant={'text'}
            sx={{...styles.actionButton, borderRadius : settings.borderRadius}}
            onClick={() => onClick?.call(this)}
            startIcon={(<ArrowBackIos sx={{fontSize : '24px'}}/>)}
        >
            {buttonText || ''}
        </Button>
    );
}
