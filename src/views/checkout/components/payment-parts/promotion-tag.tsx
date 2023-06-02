import _                  from 'lodash';
import React              from 'react';
import {useState}         from 'react';
import Grid               from '@mui/material/Unstable_Grid2';
import {Box}              from '@mui/material';
import {CircularProgress} from '@mui/material';
import {Button}           from '@mui/material';
import {TextField}        from '@mui/material';
import {Paper}            from '@mui/material';
import {SxProps}          from '@mui/material';
import ChevronRightIcon   from '@mui/icons-material/ChevronRight';
import {fonts}            from '../../../../shared/styles';
import paletteColors      from '../../../../theme/paletteColors';
import {settings}         from '../../../../shared/config-settings';
import {ICoupon}          from '../../../../store/coupons';
import {Close}            from '@mui/icons-material';

export interface IComponentProps
{
    text: string;
    sxProps?: SxProps;
    tagProps?: SxProps;
    textProps?: SxProps;
    onCheckClicked?: Function;
    currentCoupon?: ICoupon;
    couponValid?: boolean | null;
    disabled?: boolean;
    busy?: boolean;
}

export default function PromotionTag(props: IComponentProps): React.ReactElement {
    const {text, sxProps, tagProps, textProps, onCheckClicked, currentCoupon, couponValid, disabled, busy} = props;

    const [tagOpen, setTagOpen]       = useState<boolean>(true);
    const [couponText, setCouponText] = useState<string>('');

    function validateCoupon(): void {
        onCheckClicked?.call(this, couponText);
    }

    function clearCoupon(): void {
        onCheckClicked?.call(this, '');
    }

    return (
        <Paper
            sx={{
                paddingY     : {xs : '0px', sm : '12px'},
                paddingX     : {xs : '8px', sm : '8px'},
                borderRadius : settings.borderRadius,
                lineHeight   : 'normal',
                width        : {xs : '90%', sm : '100%'},
                alignSelf    : 'center',
                ...sxProps
            }}
        >
            <Box
                width={'100%'}
                height={'100%'}
                sx={{
                    cursor             : 'pointer',
                    '& .MuiGrid2-root' : {
                        padding      : '4px',
                        paddingRight : '0px'
                    },
                    ...tagProps
                }}
            >
                <Grid container width={'100%'} p={0} px={{xs : '8px', sm : 0}} pb={1} spacing={0} sx={{...fonts.ceraPro, fontSize : '20px'}}>
                    <Box onClick={() => setTagOpen(!tagOpen)} display={'flex'} sx={{width : '100%', flexDirection : 'row'}}>
                        <Grid flex={5} sx={{...fonts.portuguesa, fontSize : '28px', ...textProps}} className="justifyGridLeft">
                            {text}
                        </Grid>

                        <Grid
                            flex={1}
                            textAlign={'right'}
                            sx={{color : paletteColors.red, alignItems : 'center'}}
                            className="justifyGridRight"
                        >
                            <ChevronRightIcon sx={{fontSize : '40px', transform : `rotate(${tagOpen ? '90' : '0'}deg)`}}/>
                        </Grid>
                    </Box>

                    <Box width={'100%'} display={tagOpen ? 'flex' : 'none'}>
                        {(_.isEmpty(currentCoupon) || !couponValid)
                            ? <Box display={'flex'} sx={{width : '100%', flexDirection : 'row'}} mb={2}>
                                <Grid flex={3}>
                                    <TextField
                                        fullWidth
                                        value={couponText}
                                        onChange={(event) => setCouponText(event.target.value)}
                                        helperText={(couponValid || _.isNull(couponValid)) ? '' : 'Coupon not valid'}
                                        sx={{
                                            height                      : '60px',
                                            '& .MuiFormHelperText-root' : {
                                                marginLeft : 0,
                                                fontSize   : '14px',
                                                color      : 'red'
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid flex={1}>
                                    <Button
                                        onClick={() => validateCoupon()}
                                        sx={{
                                            width            : '100%',
                                            height           : '60px',
                                            mr               : 1,
                                            '&.Mui-disabled' : {
                                                color : paletteColors.grey
                                            }
                                        }}
                                        variant="outlined"
                                        disabled={disabled || _.isEmpty((couponText || '').trim())}
                                    >
                                        {busy
                                            ? (<CircularProgress/>)
                                            : `Check`
                                        }
                                    </Button>
                                </Grid>
                            </Box>
                            : <Box display={'flex'} sx={{width : '100%', flexDirection : 'row'}} mb={2}>
                                <Grid flex={5} className="justifyGridLeft">
                                    <Box>
                                        Coupon applied:
                                    </Box>
                                    <Box sx={{fontWeight : '700', marginLeft : '12px'}}>
                                        {currentCoupon.title}
                                    </Box>
                                </Grid>

                                <Grid
                                    flex={1}
                                    textAlign={'right'}
                                    sx={{color : paletteColors.red, alignItems : 'center'}}
                                    className="justifyGridLeft"
                                >
                                    <Box onClick={() => clearCoupon()} sx={{color : paletteColors.grey, cursor : 'pointer'}}>
                                        <Close sx={{fontSize : '20px'}}/>
                                    </Box>
                                </Grid>
                            </Box>
                        }
                    </Box>
                </Grid>
            </Box>
        </Paper>
    );
}
