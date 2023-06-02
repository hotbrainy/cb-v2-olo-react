import _                       from 'lodash';
import {Box}                   from '@mui/material';
import {SxProps}               from '@mui/material';
import Grid                    from '@mui/material/Unstable_Grid2/Grid2';
import React                   from 'react';
import {fonts}                 from 'src/shared/styles';
import {getTotalPriceOfItem}   from 'src/store/basket';
import {IBagItem}              from 'src/store/basket';
import paletteColors           from 'src/theme/paletteColors';
import {getSubTotalAsCurrency} from 'src/views/menu/components/utils';
import {guid}                  from 'src/utils/utils';
import transparentBlock        from 'src/assets/images/Background Images/transPatch.png';

const styles = {
    bagLine : {

        fontSize   : '20px',
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
            fontSize : 'small'
        },
        '& .qtyBox'        : {
            width           : '48px',
            height          : '48px',
            color           : paletteColors.white,
            backgroundColor : paletteColors.oportoOrange,
            borderRadius    : '5px',
            display         : 'flex',
            alignItems      : 'center',
            justifyContent  : 'center',
            paddingTop      : '5px'
        }
    }
};

interface IBasketForPaymentScreenComponentProps
{
    bagItems: IBagItem[];
    hidePrices?: boolean;
    sxProps?: SxProps;
}

interface IBasketForReceiptScreenComponentProps
{
    orderItems: IOrderBasketItem[];
    hidePrices?: boolean;
    sxProps?: SxProps;
}

interface IBasketItemProps
{
    name: string,
    listOfCustomisers: string[],
    quantity: number,
    totalPrice: number,
    hidePrices?: boolean,
    isReceipt?: boolean,
    imageUrl?: string
}

export function DrawBasketForPaymentScreen(props: IBasketForPaymentScreenComponentProps): React.ReactElement {
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
                (bagItems || []).map((bagItem: IBagItem, ii: number) => {
                    const listOfCustomisers: string[] = (bagItem.subItems || [])
                        .map((item) => item?.name || '')
                        .filter((name) => !_.isEmpty((name || '').trim()))
                    ;

                    return (
                        <DrawItem
                            key={guid()}
                            name={bagItem.name || ''}
                            listOfCustomisers={listOfCustomisers}
                            quantity={bagItem.quantity || 0}
                            totalPrice={getTotalPriceOfItem(bagItem)}
                            hidePrices={hidePrices}
                            isReceipt={false}
                            imageUrl={bagItem.imageUrl}
                        />
                    );
                })
            }
        </Grid>
    );
}

export function DrawBasketForReceiptScreen(props: IBasketForReceiptScreenComponentProps): React.ReactElement {
    const {orderItems, hidePrices, sxProps} = props;

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
                (orderItems || []).map((orderItem: IOrderBasketItem, ii: number) => {
                    const listOfCustomisers: string[] = (orderItem.subItems || [])
                        .map((item) => item?.name || '')
                        .filter((name) => !_.isEmpty((name || '').trim()))
                    ;

                    return (
                        <DrawItem
                            key={guid()}
                            name={orderItem.name || ''}
                            listOfCustomisers={listOfCustomisers}
                            quantity={orderItem.quantity || 0}
                            totalPrice={getTotalPriceOfItem(orderItem)}
                            hidePrices={hidePrices}
                            isReceipt={true}
                            imageUrl={orderItem.imageUri}
                        />
                    );
                })
            }
        </Grid>
    );
}

function DrawItem(props: IBasketItemProps) {
    return (
        <Grid container width="100%" sx={styles.bagLine} key={guid()}>
            <Grid xs={1} flex={props.isReceipt ? 2 : 1} width={'100%'} height={'100%'} alignItems="start">
                {props.isReceipt
                    ? (
                        <Box
                            className="productImage"
                            sx={{
                                backgroundImage : `url(${props.imageUrl || transparentBlock})`
                            }}
                        />
                    )
                    : (
                        <Box className="qtyBox">
                            {props.quantity}
                        </Box>
                    )
                }
            </Grid>

            <Grid
                xs={props.hidePrices ? 9 : 8}
                flex={7} width={'100%'}
                alignItems="start"
                flexDirection="column"
                className="productBox"
            >
                <Box textAlign={'left'}>
                    {props.name}
                </Box>

                <Box className="productExtras">
                    {props.listOfCustomisers.join(', ')}
                </Box>
            </Grid>

            {!props.hidePrices && (
                <Grid
                    xs={2}
                    flex={2}
                    width={'100%'}
                    alignItems="start"
                    justifyContent={'end'}
                    className="priceBox"
                    flexDirection="column"
                >
                    <Box>
                        {getSubTotalAsCurrency(props.totalPrice, 1)}
                    </Box>

                    {props.isReceipt && (
                        <Box className="productExtras">
                            {`Qty: ${props.quantity}`}
                        </Box>
                    )}
                </Grid>
            )}
        </Grid>
    );
}