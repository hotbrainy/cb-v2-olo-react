import React                   from 'react';
import Grid                    from '@mui/material/Unstable_Grid2';
import {useSelector}           from 'react-redux';
import {getSubTotalAsCurrency} from 'src/views/menu/components/utils';
import useConfig               from '../../../../components/useConfig';

interface IComponentProps
{
    subtotal: number;
    discount?: number | null;
    pickup: number;
}

export default function TotalBlock(props: IComponentProps): React.ReactElement {
    const {subtotal, discount, pickup} = props;

    const total = subtotal || pickup || 0;

    const config = useConfig();

    // Redux states
    const basketState = useSelector((state: any) => state.basket);

    const deliveryFee = /^delivery$/i.test(basketState.orderType || '') ? Number(config.api.GLOBAL_STORE_DELIVERY_FEE) : 0.00;

    return (
        <Grid container width="100%" sx={{'& .MuiGrid2-root' : {paddingTop : '8px', paddingBottom : '8px'}}}>
            <Grid xs={7}>Subtotal</Grid>
            <Grid xs={5} className="justifyGridRight" textAlign={'end'} justifyContent="end">
                {getSubTotalAsCurrency(subtotal, 1)}
            </Grid>


            {!!discount && (<Grid xs={7}>Discount</Grid>)}
            {!!discount && (
                <Grid xs={5} className="justifyGridRight" textAlign={'end'} justifyContent="end">
                    {getSubTotalAsCurrency(discount, 1)}
                </Grid>
            )}

            <Grid xs={7}>
                {/^delivery$/i.test(basketState.orderType || '') ? 'Delivery' : 'Pickup'}
            </Grid>
            <Grid xs={5} className="justifyGridRight" textAlign={'end'} justifyContent="end">
                {
                    /^delivery$/i.test(basketState.orderType || '')
                        ? getSubTotalAsCurrency(deliveryFee)
                        : ((pickup === 0) ? 'FREE' : `${pickup.toFixed(2)}`)
                }
            </Grid>

            <Grid xs={7} sx={{fontSize : {xs : '44px', sm : '64px'}, marginTop : '20px'}}>Total</Grid>
            <Grid xs={5} sx={{fontSize : {xs : '44px', sm : '64px'}, marginTop : '20px'}} className="justifyGridRight">
                {getSubTotalAsCurrency(total + deliveryFee - (discount || 0), 1)}
            </Grid>
        </Grid>
    );
}
