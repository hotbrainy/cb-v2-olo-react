import _         from 'lodash';
import React     from 'react';
import Grid      from '@mui/material/Unstable_Grid2';
import {Box}     from '@mui/material';
import {SxProps} from '@mui/material';


export interface IComponentProps
{
    currentStore: IOrderStore;
    sxProps?: SxProps;
}


export default function StoreLocationTag(props: IComponentProps): React.ReactElement {
    const {currentStore, sxProps} = props;
    
    const storeName = _.get(currentStore, 'storeName', 'ERROR_MISSING_STORE');
    const streetName = _.get(currentStore, 'storeAddress.addressComponents.streetName.value', '').trim();
    const locality = [
        _.get(currentStore, 'storeAddress.addressComponents.suburb.value', '').trim(),
        _.get(currentStore, 'storeAddress.addressComponents.state.value', '').trim(),
        _.get(currentStore, 'storeAddress.addressComponents.postcode.value', '').trim()
    ].join(' ').trim();

    return (
        <Grid container width="100%" flexDirection={'column'} sx={sxProps}>
            <Box className="heading">{storeName}</Box>
            <Box fontWeight="400">{streetName}</Box>
            <Box fontWeight="400">{locality}</Box>
        </Grid>
    );
}
