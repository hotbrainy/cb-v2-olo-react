import React         from 'react';
import {useState}    from 'react';
import {Box}         from '@mui/material';
import {Paper}       from '@mui/material';
import {Slider}      from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import paletteColors from '../../../../theme/paletteColors';
import {fonts}       from '../../../../shared/styles';

interface IComponentProps
{
    available: number;
    onChange: Function;
}


export default function PointsBalanceTool(props: IComponentProps): React.ReactElement {
    const {available, onChange}                   = props;
    const [availableBalance, setAvailableBalance] = useState(available);
    const [useAmount, setUseAmount]               = useState(available / 2);

    const handleSliderChange = (event: Event, newValue: number): void => {
        setUseAmount(newValue);
        onChange?.call(this, newValue);
    };

    const styles = {
        root : {
            lineHeight          : 'inherit',
            '& .MuiGrid2-root'  : {
                padding       : '2px !important',
                paddingTop    : '6px !important',
                paddingBottom : '4px !important'
            },
            '& .MuiSlider-root' : {
                height                    : '42px',
                '& .MuiSlider-rail'       : {
                    backgroundColor : `${paletteColors.black}25`,
                    border          : '3px inset'
                },
                '& .MuiSlider-track'      : {
                    backgroundColor : `${paletteColors.oportoOrange}`,
                    height          : '36px',
                    marginLeft      : '4px',
                    borderRadius    : '10px'
                },
                '& .MuiSlider-valueLabel' : {
                    color           : paletteColors.black,
                    backgroundColor : 'transparent',
                    fontWeight      : '700',
                    fontSize        : '24px',
                    top             : '45px'
                },
                '& .MuiSlider-thumb'      : {
                    backgroundColor                            : `${paletteColors.white}`,
                    height                                     : '55px',
                    width                                      : '55px',
                    borderRadius                               : '10px',
                    border                                     : `3px solid ${paletteColors.oportoOrange}`,
                    boxShadow                                  : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
                    '&:before, &:focus, &:hover, &.Mui-active' : {
                        boxShadow              : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
                        '@media (hover: none)' : {
                            boxShadow : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`
                        }
                    }
                }
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
                    xs={12}
                    sx={{
                        ...fonts.matter,
                        fontSize   : '16px',
                        lineHeight : '18px'
                    }}
                    className="justifyGridLeft"
                >
                    {/* TODO: format this value */}
                    {`You currently have $${available} dollars in your Flame Rewards Balance. How many would you like to use on this order?`}
                </Grid>

                <Grid xs={12}>
                    <Slider
                        onChange={handleSliderChange}
                        value={useAmount}
                        max={available}
                        aria-label="Default"
                        valueLabelDisplay={'on'}
                    />
                </Grid>

                <Grid
                    xs={12}
                    sx={{
                        ...fonts.matter,
                        height     : '50px',
                        alignItems : 'center'
                    }}
                    className="justifyGridCenter"
                >
                    <Box
                        sx={{
                            ...fonts.matter,
                            fontWeight : '400',
                            fontSize   : '16px',
                            alignItems : 'center'
                        }}
                    >
                        {`Remaining Flame Rewards Balance:`}
                    </Box>

                    <Box
                        sx={{
                            ...fonts.portuguesa,
                            fontWeight    : '700',
                            fontSize      : '40px',
                            alignItems    : 'center',
                            paddingBottom : '18px'
                        }}
                    >
                        {/* TODO: format this value */}
                        ${available - useAmount}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
