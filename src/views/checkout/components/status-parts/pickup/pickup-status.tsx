import React           from 'react';
import Grid            from '@mui/material/Unstable_Grid2';
import {fonts}         from '../../../../../shared/styles';
import BlackRoundedBox from '../black-rounded-box';
import HeartRow        from '../heart-row';


export interface IComponentProps
{
    orderNumber: string;
    orderDate: string;
    pickupTime?: string;
    status: string;
    statusMessage: string;
}


export default function PickupStatus(props: IComponentProps): React.ReactElement {
    const {orderNumber, orderDate, pickupTime, status, statusMessage} = props;

    const localStyles = {
        title : {
            ...fonts.portuguesa,
            fontSize : '20px'
        },

        orderNo : {
            ...fonts.matter,
            fontSize   : '48px',
            fontWeight : '700'
        },

        message : {
            ...fonts.matter,
            fontSize   : '14px',
            lineHeight : '16px'
        }
    };


    return (
        <Grid container>
            <Grid xs={12} sx={{...localStyles.title}}>
                {`Thank your for your Order`}
            </Grid>

            <Grid xs={12} sx={{...localStyles.orderNo}}>
                #{orderNumber}
            </Grid>

            <HeartRow height="15px"/>

            <Grid xs={12} sx={{...localStyles.message}} className={'justifyGridCenter'}>
                {statusMessage}
            </Grid>

            <Grid xs={12}>
                <BlackRoundedBox
                    title={status}
                    detail={pickupTime || ''}
                    sxProps={{width : '80%'}}
                />
            </Grid>
        </Grid>
    );
}
