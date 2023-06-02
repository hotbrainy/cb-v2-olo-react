import React            from 'react';
import {SxProps}        from '@mui/material';
import Grid             from '@mui/material/Unstable_Grid2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import paletteColors    from '../../../../theme/paletteColors';
import {fonts}          from '../../../../shared/styles';


export interface IComponentProps
{
    title: string;
    detail: string;
    onClick?: Function | null;
    sxProps?: SxProps | null;
}


export default function BlackRoundedBox(props: IComponentProps): React.ReactElement {
    const {title, detail, onClick, sxProps} = props;

    const localStyles = {
        rootContainer : {
            ...sxProps,
            color           : paletteColors.white,
            backgroundColor : paletteColors.black,
            borderRadius    : '14px',
            paddingTop      : '8px'
        },

        title : {
            ...fonts.portuguesa,
            fontSize   : '14px',
            lineHeight : '16px'
        },

        detail : {
            ...fonts.matter,
            fontSize   : '24px',
            fontWeight : '600',
            alignItems : 'center',
            '& svg'    : {
                marginBottom : '8px',
                marginLeft   : '8px'
            }
        }
    };


    return (
        <Grid
            container
            spacing={0}
            padding={0}
            width={'100%'}
            height={'100%'}
            sx={{...localStyles.rootContainer}}
        >
            <Grid
                xs={12}
                sx={{...localStyles.title}}
                className={'justifyGridCenter'}
            >
                {title}
            </Grid>

            <Grid
                xs={12}
                sx={{...localStyles.detail}}
                className={'justifyGridCenter'}
            >
                {detail} <InfoOutlinedIcon onClick={() => onClick?.call(this)}/>
            </Grid>
        </Grid>
    );
}
