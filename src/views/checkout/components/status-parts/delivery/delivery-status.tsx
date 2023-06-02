import React              from 'react';
import Grid               from '@mui/material/Unstable_Grid2';
import {Box}              from '@mui/material';
import {fonts}            from '../../../../../shared/styles';
import DeliveryStatusLine from './delivery-status-line';
import {IDeliveryStage}   from './delivery-status-line';
import BlackRoundedBox    from '../black-rounded-box';
import HeartRow           from '../heart-row';
import {jumpTo}           from 'src/views/content/drawSection';

export interface IComponentProps
{
    orderNumber: string;
    orderDate: string;
    status: string;
    deliveryType?: string;
    stages?: IDeliveryStage[];
    driver?: string;
}


export default function DeliveryStatus(props: IComponentProps): React.ReactElement {
    const {orderNumber, orderDate, status, stages, driver} = props;

    return (
        <Grid container>
            <Grid xs={12}>
                {`Thanks for your order`}
            </Grid>

            <HeartRow height="15px"/>

            {/* DELIVERY STATUS DESCRIPTION */}
            <Grid
                xs={12}
                sx={{...fonts.matter, fontSize : '14px', lineHeight : '16px'}}
                className={'justifyGridCenter'}
                padding={2}
            >
                {`High five! We’ve received your order and it will be delivered to you soon.`}
            </Grid>

            {/* DELIVERY ETA */}
            <Grid xs={12} padding={2}>
                <BlackRoundedBox
                    title={'Delivery ETA'}
                    detail={'Today, 10:10 PM'}
                    sxProps={{width : {xs : '80%', sm : '50%'}}}
                />
            </Grid>

            {/* DELIVERY STAGES */}
            <Grid xs={12} padding={2}>
                <Grid container width={{xs : '100%', sm : '50%'}} alignItems="center">
                    {
                        (stages || []).map((stage, index) => {
                            return (<DeliveryStatusLine key={`dsl-${index}`} stage={stage}/>);
                        })
                    }
                </Grid>
            </Grid>

            {/* DELIVERY DRIVER */}
            <Grid xs={12} padding={2}>
                <Grid container width="100%" sx={{...fonts.matter, fontSize : '12px', lineHeight : '14px'}}>
                    <Grid xs={12} className="justifyGridCenter" sx={{fontWeight : '700'}} paddingBottom={'8px'}>
                        {`Your Driver`}
                    </Grid>

                    <Grid xs={12} className="justifyGridCenter">
                        {driver || '...looking...'}
                    </Grid>
                </Grid>
            </Grid>

            {/* VIEW FAQs */}
            <Grid xs={12} padding={2} className="justifyGridCenter">
                <Box
                    onClick={() => jumpTo('/faq')}
                    sx={{
                        ...fonts.matter,
                        fontSize       : '14px',
                        lineHeight     : '16px',
                        fontWeight     : '700',
                        cursor         : 'pointer',
                        textDecoration : 'underline'
                    }}
                >
                    {`View Order FAQs`}
                </Box>
            </Grid>
        </Grid>
    );
}
