import React         from 'react';
import {Button}      from '@mui/material';
import {Theme}       from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {settings}    from 'src/shared/config-settings';
import {effects}     from 'src/shared/styles';
import {fonts}       from 'src/shared/styles';
import {images}      from 'src/shared/styles';
import { ArrowBackIos } from '@mui/icons-material';
// import {jumpTo}      from 'src/views/content/drawSection';

const styles = {
    actionButton : {
        '&:hover' : {
            ...effects.buttonShadow,
            backgroundColor : (theme: Theme) => theme.palette.common.white
        },
        ...effects.buttonShadow,
        ...fonts.ceraBlack,
        cursor          : 'pointer',
        padding         : '10px 16px',
        fontSize        : '20px',
        lineHeight      : '22px',
        color           : (theme: Theme) => theme.palette.common.black,
        backgroundColor : (theme: Theme) => theme.palette.common.white,
        textTransform   : 'none',
        letterSpacing   : '0.002em'
    }
};

export function DrawCheckoutFlowHeaderRow() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <Button
            variant={'text'}
            sx={{
                ...styles.actionButton,
                borderRadius : settings.borderRadius
            }}
            onClick={() => goBack()}
            startIcon={
                <ArrowBackIos sx={{fontSize:'24px'}} />
            }
        >
            {'Back'}
        </Button>
    );
}