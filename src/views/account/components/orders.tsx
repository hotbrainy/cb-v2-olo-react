import _                            from 'lodash';
import React, {useEffect, useState} from 'react';
import theme                        from 'src/theme';

// Global Components
import Grid                    from '@mui/material/Unstable_Grid2';
import {Box}                   from '@mui/material';
import {Button}                from '@mui/material';
import {Container}             from '@mui/material';
import {FormGroup}             from '@mui/material';
import {Hidden}                from '@mui/material';
import {Paper}                 from '@mui/material';
import {SxProps}               from '@mui/material';
import {TextField}             from '@mui/material';
import ButtonGroup             from 'src/components/buttons/button-group';
import paletteColors           from 'src/theme/paletteColors';
import {fonts}                 from 'src/shared/styles';
import {settings}              from 'src/shared/config-settings';
import {checkoutStyles}        from 'src/views/checkout/localStyles';
import topNotch                from 'src/assets/images/icons/topNotch.png';
import bottomNotch             from 'src/assets/images/icons/bottomNotch.png';
import verticalDotBG           from 'src/assets/images/icons/verticalDotBG.png';
import {styles}                from '../styles';
import {getFormattedDate}      from 'src/utils/utils';
import {getSubTotalAsCurrency} from 'src/views/menu/components/utils';
import {debugItems}            from './orders-helper';

export interface IOrderVM extends Partial<IOrder>
{
    status: string;           // 'open' = active else recent
    receiptId: string;
    orderId: string;
}

const localStyles = {
    local       : {
        marginBottom       : '0 !important',
        paddingRight       : '0 !important',
        '& .MuiGrid2-root' : {
            marginBottom : 0,
            paddingRight : 0
        }
    },
    notchedLine : {
        marginBottom        : '0 !important',
        paddingRight        : '0 !important',
        backgroundImage     : `url(${verticalDotBG})`,
        backgroundPositionX : 'center',
        backgroundRepeatX   : 'no-repeat',
        backgroundSize      : 'auto',
        '& .MuiGrid2-root'  : {
            marginBottom : 0,
            paddingRight : 0
        }
    },
    button      : {
        ...checkoutStyles.button,
        ...fonts.portuguesa,
        fontSize      : '20px',
        textTransform : 'unset',
        fontWeight    : '400',
        letterSpacing : '-0.05em',
        width         : '140px'
    },
    orderTicket : {
        ...fonts.portuguesa,
        fontWeight    : 700,
        fontSize      : {xs : '14px', sm : '18px'},
        textTransform : 'capitalize',
        '& .header'   : {
            ...fonts.matter,
            fontWeight : 700,
            fontSize   : {xs : '18px', sm : '22px'}
        }
    },
    bagLine     : {
        fontSize   : {xs : '16px', sm : '20px'},
        alignItems : 'start !important',
        ...fonts.ceraBlack,
        '& .MuiGrid2-root' : {
            padding : '0 !important'
        },
        '& .productBox'    : {
            justifyContent : 'start',
            display        : 'flex',
            alignItems     : 'start',
            paddingLeft    : '5px !important',
            paddingRight   : '5px !important'
        },
        '& .productExtras' : {
            ...fonts.ceraPro,
            fontSize  : 'small',
            textAlign : 'left'
        },
        '& .qtyBox'        : {
            width           : '40px',
            height          : '40px',
            color           : paletteColors.white,
            backgroundColor : paletteColors.oportoOrange,
            borderRadius    : '5px',
            display         : 'flex',
            alignItems      : 'center',
            justifyContent  : 'center'
        }
    }
};

function getPriceOfOrderItem(bagItem: IOrderBasketItem): number {
    const total = (bagItem?.subItems || []).reduce((subtotal, bi) => {
        return subtotal + ((bi?.price || 0) * (bi?.quantity || 0));
    }, bagItem?.price || 0);

    return total * (bagItem?.quantity || 0);
}

export function DrawBasketForLoyaltyScreen(props: { bagItems: IOrderBasketItem[], hidePrices?: boolean, sxProps?: SxProps }): React.ReactElement {
    const {bagItems, hidePrices, sxProps} = props;

    return (
        <Grid
            container
            width={'100%'}
            padding={'0 !important'}
            lineHeight="normal"
            rowGap="10px"
            sx={{...sxProps}}
        >
            {
                (bagItems || []).map((bagItem: IOrderBasketItem, ii: number) => {
                    const listOfCustomisers: string[] = (bagItem?.subItems || []).map((si: IOrderBasketItem) => si?.name || '');

                    return (
                        <Grid container width="100%" sx={localStyles.bagLine} key={`bag-item-${ii}`}>
                            <Grid xs={2} alignItems="start">
                                <Box className="qtyBox">
                                    {bagItem.quantity}
                                </Box>
                            </Grid>

                            <Grid xs={hidePrices ? 8 : 7} alignItems="start" flexDirection="column" className="productBox">
                                <Box>
                                    {bagItem.name}
                                </Box>

                                <Box className="productExtras">
                                    {listOfCustomisers.join(', ')}
                                </Box>
                            </Grid>

                            {!hidePrices && (
                                <Grid xs={2} alignItems="start" justifyContent={'end'}>
                                    {getSubTotalAsCurrency(getPriceOfOrderItem(bagItem), 1)}
                                </Grid>
                            )}
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

export function DrawVerticalNotchedLine() {
    return (
        <Grid xs={12} width={'50px'} height={'100%'} display="flex" flexDirection={'column'} alignItems="center" sx={localStyles.notchedLine}>
            <Box mb={0} mr={0}
                 display="flex"
                 alignItems={'start'}
                 height="50%"
                 justifyContent={'center'}
                 sx={{'& img' : {position : 'relative', top : '-20px'}}}
            >
                <img src={topNotch} alt="notch"/>
            </Box>
            <Box mb={0} mr={0}
                 display="flex"
                 height="50%"
                 alignItems={'end'}
                 justifyContent={'center'}
                 sx={{'& img' : {marginBottom : '-25px'}}}
            >
                <img src={bottomNotch} alt="notch"/>
            </Box>
        </Grid>
    );
}

function DrawOrderTicket(props: { thisOrder: IOrderVM, onShowReceiptClicked?: Function, onOrderStatusClicked?: Function }) {
    const {thisOrder, onShowReceiptClicked, onOrderStatusClicked} = props;

    function showReceipt(receiptId: string): void {
        onShowReceiptClicked?.call(this, receiptId);
    }

    function showOrderStatus(orderId: string): void {
        onOrderStatusClicked?.call(this, orderId);
    }

    return (
        <Paper sx={{padding : '12px', width : '100%', borderRadius : settings.borderRadius}}>
            <Grid container width={'100%'} display="flex">
                <Grid xs={12} sm={7} sx={localStyles.orderTicket}>
                    <Grid container width={'100%'}>
                        <Grid xs={3}>
                            <Box>Order</Box>
                            <Box className="header">{`#${thisOrder.orderId}`}</Box>
                        </Grid>
                        <Grid xs={5}>
                            <Box>Date</Box>
                            <Box className="header">{thisOrder.basket?.placementDateTime || getFormattedDate(new Date())}</Box>
                        </Grid>
                        <Grid xs={4}>
                            <Box>Status</Box>
                            <Box className="header" color={paletteColors.red}>{thisOrder.status}</Box>
                        </Grid>
                        <Grid xs={12}>
                            <hr/>
                        </Grid>
                        <Grid xs={12}>
                            <Grid
                                xs={12}
                                sx={{textAlign : 'center'}}
                                padding={'0 !important'}
                            >
                                <DrawBasketForLoyaltyScreen bagItems={thisOrder.basket?.items || debugItems}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid xs={1} sx={{marginBottom : 0, paddingRight : 0}} className="noOffset">
                        <DrawVerticalNotchedLine/>
                    </Grid>
                </Hidden>
                <Grid xs={12} sm={4} display="flex" justifyContent={'center'} alignItems={'center'} className="noOffset"
                      flexDirection={{xs : 'row', sm : 'column'}}>
                    <Box p={'8px'}>
                        <Button className="smallButton" variant="outlined"
                                sx={[localStyles.button, {backgroundColor : paletteColors.oportoOrange, color : paletteColors.white}]}
                                onClick={() => showReceipt(thisOrder.receiptId)}>Receipt</Button>
                    </Box>
                    <Box p={'8px'}>
                        <Button className="smallButton" variant="outlined"
                                sx={[localStyles.button, {backgroundColor : paletteColors.red, color : paletteColors.white}]}
                                onClick={() => showOrderStatus(thisOrder.orderId)}>Order Status</Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export function DrawOrders(props: { orders: IOrderVM[], onShowReceiptClicked?: Function, onOrderStatusClicked?: Function }) {
    const {orders, onShowReceiptClicked, onOrderStatusClicked} = props;
    const [viewType, setViewType]                              = useState('ACTIVE');
    const [filteredOrders, setFilteredOrders]                  = useState<IOrderVM[]>(orders);

    function changeViewType(evt: any): void {
        setViewType(evt === 'open' ? 'ACTIVE' : 'HISTORY');
    }

    function showReceipt(receiptId: string): void {
        onShowReceiptClicked?.call(this, receiptId);
    }

    function showOrderStatus(orderId: string): void {
        onOrderStatusClicked?.call(this, orderId);
    }

    useEffect(() => {
        setFilteredOrders((orders || []).filter((ord: IOrderVM) => (viewType === 'ACTIVE' ? ord.status === 'open' : ord.status !== 'open')));
    }, []);

    return (
        <Grid container width={'100%'} className="theme" mt={2} sx={localStyles.local}>
            <Grid xs={12} width={'100%'}>
                <ButtonGroup
                    defaultSelectedId={'open'}
                    sx={styles.buttonGroup}
                    onSelected={changeViewType}
                    options={[
                        {title : 'Active Orders', id : 'open'},
                        {title : 'Recent Orders', id : 'other'}
                    ]}
                />
            </Grid>
            {(filteredOrders || []).map((thisOrder: IOrderVM) => {
                return (
                    <Grid container width={'100%'} my={'12px'}>
                        <DrawOrderTicket thisOrder={thisOrder} onShowReceiptClicked={showReceipt} onOrderStatusClicked={showOrderStatus}/>
                    </Grid>
                );
            })}
        </Grid>
    );
}
