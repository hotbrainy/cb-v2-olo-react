import React            from 'react';
import Grid             from '@mui/material/Unstable_Grid2';
import {Box}            from '@mui/material';
import {Paper}          from '@mui/material';
import {SxProps}        from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {jumpTo}         from '../../../content/drawSection';
import {fonts}          from '../../../../shared/styles';
import paletteColors    from '../../../../theme/paletteColors';

export interface IComponentProps
{
    text: string;
    linkUrl?: string;
    onClick?: Function;
    sxProps?: SxProps;
    tagProps?: SxProps;
    textProps?:SxProps;
}


export default function JumpTag(props: IComponentProps): React.ReactElement {
    const {text, linkUrl, onClick, sxProps, tagProps,textProps} = props;

    function doJump(): void {
        if (onClick) {
            onClick();
            return;
        }

        jumpTo(linkUrl);
    }


    return (
        <Paper
            sx={{
                padding      : {xs : '8px', sm : '24px'},
                paddingY     : {xs : '0px', sm : '12px'},
                borderRadius : '14px',
                lineHeight   : '35px',
                width        : {xs : '90%', sm : '100%'},
                alignSelf    : 'center',
                ...sxProps
            }}
        >
            <Box
                width={'100%'}
                height={'100%'}
                onClick={() => doJump()}
                sx={{
                    cursor             : 'pointer',
                    '& .MuiGrid2-root' : {
                        padding      : '4px',
                        paddingRight : '0px'
                    },
                    ...tagProps
                }}
            >
                <Grid container width={'100%'} p={0} spacing={0}>
                    <Grid xs={9} sx={{...fonts.portuguesa, fontSize : '28px', ...textProps}} className="justifyGridLeft">
                        {text}
                    </Grid>

                    <Grid
                        xs={3}
                        sx={{color : paletteColors.oportoOrange, alignItems : 'center'}}
                        className="justifyGridRight"
                    >
                        <ChevronRightIcon sx={{fontSize : '40px'}}/>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
