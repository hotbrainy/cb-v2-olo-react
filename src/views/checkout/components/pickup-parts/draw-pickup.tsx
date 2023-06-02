import _               from 'lodash';
import React           from 'react';
import {useState}      from 'react';
import Grid            from '@mui/material/Unstable_Grid2';
import {Box}           from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {Slider}        from '@mui/material';
import {SliderRail}    from '@mui/material';
import {SliderThumb}   from '@mui/material';
import {SliderTrack}   from '@mui/material';
// import {breakpoints}   from 'src/shared/styles';
import {fonts}         from 'src/shared/styles';
import home            from 'src/assets/images/icons/home.svg';
import mainPin         from 'src/assets/images/icons/mainPinRed.svg';
import woody           from 'src/assets/images/icons/woody.png';
import paletteColors   from 'src/theme/paletteColors';
import rightNotch      from 'src/assets/images/icons/rightNotch.png';
import leftNotch       from 'src/assets/images/icons/leftNotch.png';
import {ChevronRight}  from '@mui/icons-material';
import theme           from 'src/theme';

export interface IPickupProps
{
    orderNumber?: string;
    estimatedCookTime: string;
    onStart: any;
    onSlideChange?: Function;
}


export function DrawPickupGraphic(props: { isCooking: boolean, slidePosition?: number }): React.ReactElement {
    const {isCooking, slidePosition} = props;

    const smAndUp                    = useMediaQuery(theme.breakpoints.up('sm'));
    const maxLeft                    = smAndUp ? 90 : 70;
    const actualPosition             = slidePosition && slidePosition < maxLeft ? slidePosition : maxLeft;

    return (
        <Grid container width="100%" sx={{borderBottom : `2px dashed black`}}>
            <Grid
                xs={10}
                justifyContent={'start !important'}
                alignItems="end"
                sx={{
                    '& img' : {
                        position : 'relative',
                        left     : slidePosition ? `${actualPosition}%` : ''
                    }
                }}
            >
                <img src={woody} height="50px" alt="cool wagon with surfboard"/>
            </Grid>
            <Grid xs={2} justifyContent={'end'} flexDirection="column">
                <Grid
                    xs={12}
                    justifyContent={'end !important'}
                    sx={{paddingRight : '5px', '& .svg' : {fill : paletteColors.red}}}
                >
                    <img src={mainPin} height="40px" alt={'pin icon'}/>
                </Grid>
                <Grid
                    xs={12}
                    justifyContent={'end !important'}
                    sx={{'& svg' : {fill : paletteColors.oportoOrange}}}
                >
                    <img src={home} height="40px" alt={'home icon'}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export function DrawNotchedLine(): React.ReactElement {
    return (
        <Grid xs={12} padding="0" width={'100%'} height={'50px'} alignItems="center">
            <Box
                className="justifyGridLeft"
                alignItems={'center'}
                sx={{float : 'left', '& img' : {marginLeft : '-15px'}}}
            >
                <img src={leftNotch} alt="notch"/>
            </Box>
            <Box sx={{width : '100%', borderBottom : `2px dashed ${paletteColors.lightGrey}`}}></Box>
            <Box
                alignItems={'center'}
                className="justifyGridRight"
                sx={{float : 'right', '& img' : {marginRight : '-15px'}}}
            >
                <img src={rightNotch} alt="notch"/>
            </Box>
        </Grid>
    );
}

export function DrawPickup(props: IPickupProps): React.ReactElement {
    const {orderNumber, estimatedCookTime, onStart, onSlideChange} = props;

    // const smAndUp = useMediaQuery(breakpoints['sm']);

    const [isCooking, setIsCooking] = useState(false);

    function startCooking(): void {
        setIsCooking(!isCooking);
        onStart?.call(this, !isCooking);
    }

    //#region Slider Part
    const [sliderPosition, setSliderPosition] = useState(0);
    const handleSliderChange                  = (event: Event, newValue: number) => {
        if (!isCooking) {
            onSlideChange?.call(this, newValue);
            if (newValue > 80) {
                newValue = 100;
                startCooking();
            }
            setSliderPosition(newValue * 0.78);
        }
    };

    interface IAmHereComponentProps extends React.HTMLAttributes<unknown> {}

    function IAmHereTrack(props: IAmHereComponentProps) {
        const {children, ...other} = props;
        const parentWidth          = _.get(props, 'ownerState.value', 0);
        return (
            <SliderTrack {...other}>
                {children}
                <Box width={`calc(100% + 72px)`} height={'100%'}
                     sx={{
                         alignItems      : 'center',
                         whiteSpace      : 'nowrap',
                         backgroundColor : parentWidth > 10 ? paletteColors.green : 'transparent',
                         borderRadius    : '40px',
                         minWidth        : '72px'
                     }}><Box sx={{
                    fontFamily    : fonts.ceraPro.fontFamily,
                    marginLeft    : {xs : '25px', sm : '80px'},
                    overflow      : 'hidden',
                    color         : paletteColors.white,
                    fontSize      : '18px',
                    paddingTop    : '24px',
                    letterSpacing : '2px'
                }}>Cooking Underway</Box>
                </Box>
            </SliderTrack>
        );
    }

    function IAmHereRail(props: IAmHereComponentProps) {
        const {children, ...other} = props;

        // const parentWidth          = _.get(props, 'ownerState.value', 0);

        return (
            <SliderRail {...other}>
                {children}
                <Box sx={{
                    fontFamily    : fonts.ceraPro.fontFamily,
                    marginLeft    : {xs : '87px', sm : '90px'},
                    overflow      : 'hidden',
                    color         : paletteColors.white,
                    fontSize      : '18px',
                    paddingTop    : '24px',
                    letterSpacing : {xs : 'normal', sm : '2px'}
                }}>Slide to start cooking
                </Box>
            </SliderRail>
        );
    }

    function IAmHereThumb(props: IAmHereComponentProps) {
        const {children, ...other} = props;
        const parentWidth          = _.get(props, 'ownerState.value', 0);
        return (
            <SliderThumb {...other}>
                {children}
                <ChevronRight sx={{color : parentWidth > 10 ? paletteColors.green : paletteColors.red, fontSize : '48px'}}/>
            </SliderThumb>
        );
    }

    //#endregion Slider Parts

    const localStyles = {
        slider : {
            width               : '360px',
            marginLeft          : 'auto',
            marginRight         : 'auto',
            lineHeight          : 'inherit',
            '& .MuiGrid2-root'  : {
                padding       : '2px !important',
                paddingTop    : '6px !important',
                paddingBottom : '4px !important'
            },
            '& .MuiSlider-root' : {
                height                    : '77px',
                borderRadius              : '40px',
                paddingTop                : 0,
                paddingBottom             : 0,
                '& .MuiSlider-rail'       : {
                    backgroundColor : sliderPosition > 70 ? paletteColors.green : paletteColors.red,
                    opacity         : 1,
                    border          : '2px'
                },
                '& .MuiSlider-track'      : {
                    backgroundColor : `transparent`,
                    height          : '100%',
                    border          : 0
                },
                '& .MuiSlider-thumb'      : {
                    marginLeft                                 : '39px',
                    backgroundColor                            : `${paletteColors.white}`,
                    height                                     : '76px',
                    width                                      : '76px',
                    borderRadius                               : '38px',
                    border                                     : `2px solid ${sliderPosition > 10 ? paletteColors.green : paletteColors.red}`,
                    boxShadow                                  : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
                    '&:before, &:focus, &:hover, &.Mui-active' : {
                        boxShadow              : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
                        '@media (hover: none)' : {
                            boxShadow : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`
                        }
                    }
                },
                '& .MuiSlider-valueLabel' : {
                    display         : 'none',
                    color           : paletteColors.black,
                    backgroundColor : 'transparent',
                    fontWeight      : '700',
                    fontSize        : '24px',
                    top             : '45px'
                }
            }
        }
    };

    return (
        <Grid container width={'100%'}>
            <Grid xs={12} my={2}>
                <Box
                    sx={{
                        width           : '360px',
                        borderRadius    : '12px',
                        backgroundColor : paletteColors.oportoBlack,
                        color           : paletteColors.white
                    }}
                >
                    <Grid container width="100%">
                        <Grid
                            xs={12}
                            justifyContent="center"
                            display="flex"
                            sx={{...fonts.portuguesa, fontSize : '20px'}}
                        >
                            estimated cook time
                        </Grid>
                        <Grid
                            xs={12}
                            justifyContent="center"
                            display="flex"
                            sx={{...fonts.matter, fontSize : '32px'}}
                        >
                            {estimatedCookTime}
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid xs={12} justifyContent="center" display="flex">
                <Box
                    sx={{...localStyles.slider}}
                >
                    <Slider
                        onChange={handleSliderChange}
                        value={sliderPosition}
                        max={100}
                        aria-label="Default"
                        valueLabelDisplay={'off'}
                        slots={{rail : IAmHereRail, track : IAmHereTrack, thumb : IAmHereThumb}}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
