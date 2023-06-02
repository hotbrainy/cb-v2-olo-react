import React                from 'react';
import {Box}                from '@mui/material';
import {useMediaQuery}      from '@mui/material';
// import {Button}             from '@mui/material';
import {Container}          from '@mui/material';
import {Grid}               from '@mui/material';
import {Hidden}             from '@mui/material';
// import {useTheme}           from '@emotion/react';
import StandaloneButton     from '../buttons/standalone-button';
import paletteColors        from 'src/theme/paletteColors';
import feedback_mobile      from '../../assets/images/Feedback Icon/Mobile_Feedback.png';
import feedback_desktop     from '../../assets/images/Feedback Icon/Desktop_Feedback.png';
import theme                from 'src/theme';
import {setStorePickerOpen} from 'src/store/app';
import {useNavigate}        from 'react-router-dom';

export interface IComponentProps
{
    dispatch?: any;
    includeFindOutMore?: boolean;
}

export default function CallToAction(props: IComponentProps): React.ReactElement {
    const {dispatch, includeFindOutMore = true} = props;

    const navigate  = useNavigate();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const feedbackButton = {
        borderRadius                   : '50px',
        height                         : '100px',
        width                          : '100px',
        display                        : 'flex',
        alignItems                     : 'center',
        justifyContent                 : 'center',
        position                       : 'relative',
        marginTop                      : '-10px',
        marginLeft                     : '16px',
        backgroundColor                : paletteColors.green,
        cursor                         : 'pointer',
        boxShadow                      : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
        '&:hover'                      : {
            boxShadow : 'unset'
        },
        [theme.breakpoints.down('lg')] : {
            '& img'      : {
                height : '35px'
            },
            borderRadius : '35px',
            height       : '70px',
            width        : '70px',
            marginTop    : '-10px',
            marginBottom : '-78px'
        },
        [theme.breakpoints.down('sm')] : {
            borderRadius : '30px',
            height       : '60px',
            width        : '60px',
            marginTop    : '-54px',
            marginBottom : 0,
            '& img'      : {
                height : '30px'
            }
        }
    };

    const mobileFeedbackButton = {
        ...feedbackButton,
        marginTop    : '-20px',
        marginBottom : 0
    };

    function showStorePicker() {
        if (isDesktop) {
            // Open the Modal
            dispatch(setStorePickerOpen(true));
        }
        else {
            // Navigate to the Locations Page
            navigate('/locations');
        }
    }

    return (
        <>
            <Hidden smUp>
                <Container maxWidth="lg" sx={{p : 1}}>
                    <Grid container>
                        <Grid item xs={12} sx={{position : 'relative', zIndex : 100}}>
                            <Box
                                sx={{
                                    // position: "absolute",
                                    display        : 'flex',
                                    justifyContent : 'center',
                                    marginTop      : '-75px'
                                }}
                            >
                                <StandaloneButton
                                    buttonText="Order Now"
                                    buttonClick={() => (window.location.href = '/locations')}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{display : 'flex', justifyContent : 'end', position : 'relative', zIndex : 100}}
                        >
                            <Box
                                sx={{
                                    width          : '100%',
                                    display        : 'flex',
                                    justifyContent : 'flex-end',
                                    marginTop      : '-5px',
                                    paddingRight   : '50px'
                                }}
                            >
                                <StandaloneButton
                                    buttonClick={() => (window.location.href = '/feedback')}
                                    buttonColor={paletteColors.green}
                                    buttonHoverColor={paletteColors.green}
                                    buttonText={'Feedback'}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display        : 'flex',
                                justifyContent : 'end',
                                position       : 'relative',
                                zIndex         : 100
                            }}
                        >
                            <Box
                                sx={{...mobileFeedbackButton}}
                                onClick={() => (window.location.href = '/feedback')}
                            >
                                <img src={feedback_mobile} alt="Feedback"/>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Hidden>
            <Hidden smDown>
                <Container maxWidth="lg" sx={{p : 1}}>
                    <Grid container>
                        <Grid item xs={3} sx={{position : 'relative', zIndex : 100}}>
                            <Box
                                sx={{
                                    position   : 'absolute',
                                    display    : 'flex',
                                    marginTop  : '-5px',
                                    marginLeft : '260px'
                                }}
                            >
                                <StandaloneButton
                                    buttonText="Order Now"
                                    buttonClick={() => showStorePicker()}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3} sx={{position : 'relative', zIndex : 100}}>
                            {includeFindOutMore && (
                                <StandaloneButton
                                    buttonColor={paletteColors.black}
                                    buttonText="Find Out More"
                                    buttonHoverColor={paletteColors.darkGrey}
                                    buttonClick={() => {console.log('CLICKED: Find Out More');}}
                                />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            sx={{display : 'flex', justifyContent : 'end', position : 'relative', zIndex : 100}}
                        >
                            <Box sx={{display : 'flex', marginTop : '92px', marginBottom : '-10px'}}>
                                <StandaloneButton
                                    buttonClick={() => (window.location.href = '/feedback')}
                                    buttonColor={paletteColors.green}
                                    buttonHoverColor={paletteColors.green}
                                    buttonText={'Feedback'}
                                    //font={"Comic Book"}
                                />
                                <Box
                                    sx={{...feedbackButton}}
                                    onClick={() => (window.location.href = '/feedback')}
                                >
                                    <img src={feedback_desktop} alt="Feedback"/>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Hidden>
        </>
    );
}
