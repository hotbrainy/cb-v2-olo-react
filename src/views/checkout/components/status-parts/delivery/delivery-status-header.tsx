import React         from 'react';
import Grid          from '@mui/material/Unstable_Grid2';
import paletteColors from '../../../../../theme/paletteColors';


export interface IComponentProps
{
    orderNumber: string;
    orderDate: string;
    status: string;
}


export default function DeliveryStatusHeader(props: IComponentProps): React.ReactElement {
    const {orderNumber, orderDate, status} = props;

    return (
        <Grid xs={12}>
            {/* DELIVERY ORDER NO */}
            <Grid xs={3} sm={4} className="justifyGridLeft" display="flex">
                <Grid container className="justifyGridLeft" display="flex">
                    <Grid xs={12} className="justifyGridLeft" sx={{fontSize : {xs : '12px', sm : '16px'}}}>
                        {`Order`}
                    </Grid>

                    <Grid xs={12} className="justifyGridLeft">
                        #{orderNumber}
                    </Grid>
                </Grid>
            </Grid>

            {/* DELIVERY ORDER DATE */}
            <Grid xs={4} className="justifyGridCenter" display="flex">
                <Grid container className="justifyGridCenter">
                    <Grid xs={12} className="justifyGridLeft" sx={{fontSize : {xs : '12px', sm : '16px'}}}>
                        {`Date`}
                    </Grid>
                    <Grid xs={12} className="justifyGridLeft">
                        {orderDate}
                    </Grid>
                </Grid>
            </Grid>

            {/* DELIVERY STATUS */}
            <Grid xs={5} sm={4} className="justifyGridRight" display="flex">
                <Grid container className="justifyGridRight" display="flex">
                    <Grid xs={12} className="justifyGridLeft" sx={{fontSize : {xs : '12px', sm : '16px'}}}>
                        {`Status`}
                    </Grid>

                    <Grid xs={12} className="justifyGridLeft" sx={{color : paletteColors.oportoOrange}}>
                        {status}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
