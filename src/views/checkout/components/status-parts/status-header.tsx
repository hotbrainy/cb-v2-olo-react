import React                from 'react';
import Grid                 from '@mui/material/Unstable_Grid2';
import {fonts}              from '../../../../shared/styles';
import paletteColors        from '../../../../theme/paletteColors';
import DeliveryStatusHeader from './delivery/delivery-status-header';
import PickupStatusHeader   from './pickup/pickup-status-header';
import DrawStatusHeader from './pickup/pickup-status-header';


export interface IComponentProps
{
    orderType: OrderType | null;
    orderNumber: string;
    orderDate: string;
    status: string;
}


export default function StatusHeader(props: IComponentProps): React.ReactElement {
    const {orderNumber, orderDate, status, orderType} = props;

    return (
        <Grid
            container
            width={'100%'}
            sx={{
                ...fonts.matter,
                fontWeight         : '700',
                fontSize           : {xs : '14px', sm : '24px'},
                lineHeight         : {xs : '16px', sm : '26px'},
                borderBottom       : `2px solid ${paletteColors.lightGrey}`,
                '& .MuiGrid2-root' : {
                    height : 'fit-content'
                }
            }}
        >
            {/*/^catering$/i.test(orderType || '') && (*/}
            {/*    <CateringStatusHeader orderNumber={orderNumber} orderDate={orderDate} status={status}/>*/}
            {/*)}*/}

            {/^delivery$/i.test(orderType || '') && (
                <DrawStatusHeader orderNumber={orderNumber} orderDate={orderDate} status={status}/>
            )}

            {/^collection$/i.test(orderType || '') && (
                <DrawStatusHeader orderDate={orderDate} status={status}/>
            )}
        </Grid>
    );
}
