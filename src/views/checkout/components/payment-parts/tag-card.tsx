import React         from 'react';
import {Box}         from '@mui/material';
import {Paper}       from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import {fonts}       from '../../../../shared/styles';
import paletteColors from '../../../../theme/paletteColors';

interface IComponentProps
{
    title: string;
    line1: string;
    line2: string;
    line3: string;
    onChangeClick?: Function;
}


export default function TagCard(props: IComponentProps): React.ReactElement {
    const {title, line1, line2, line3, onChangeClick} = props;

    const fireChange = () => onChangeClick?.call(this);

    const styles = {
        root : {
            lineHeight         : 'inherit',
            '& .MuiGrid2-root' : {
                padding       : '2px !important',
                paddingTop    : '6px !important',
                paddingBottom : '4px !important'
            }
        }
    };

    return (
        <Paper
            sx={{
                ...styles.root,
                ...fonts.matter,
                width        : '100%',
                fontSize     : '16px',
                lineHeight   : '18px',
                borderRadius : '14px',
                padding      : '8px'
            }}
        >
            <Grid
                container
                width={'100%'}
                sx={{padding : '0 !important'}}
                flexDirection="row"
                display="flex"
            >
                <Grid
                    xs={10}
                    sx={{
                        ...fonts.portuguesa,
                        fontSize   : '32px',
                        lineHeight : '32px'
                    }}
                >
                    {title}
                </Grid>

                <Grid
                    xs={2}
                    sx={{
                        ...fonts.matter,
                        fontSize   : '14px',
                        lineHeight : '14px',
                        color      : paletteColors.red,
                        cursor     : 'pointer'
                    }}
                    className="justifyGridRight"
                >
                    <Box onClick={fireChange}>Change</Box>
                </Grid>

                <Grid
                    xs={12}
                    sx={{
                        fontWeight : '600',
                        fontSize   : '20px',
                        lineHeight : '20px'
                    }}
                >
                    {line1}
                </Grid>

                <Grid xs={12}>{line2}</Grid>

                <Grid xs={12}>{line3}</Grid>
            </Grid>
        </Paper>
    );
}
