import _           from 'lodash';
import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// MUI Components
import Grid  from '@mui/material/Unstable_Grid2';
import {Box} from '@mui/material';

import {fonts, icons}   from 'src/shared/styles';
import paletteColors    from 'src/theme/paletteColors';
import {checkoutStyles} from 'src/views/checkout/localStyles';
import {ISearchAddress} from 'src/store/customer';

export function DrawDeliveryAddress(props: { customerState: any, changeAddress?: Function }): React.ReactElement {
    const {customerState, changeAddress} = props;

    const styles = {
        storeLookup : {
            width            : '100%',
            '& .changeText'  : {
                color  : paletteColors.red,
                cursor : 'pointer'
            },
            '& .searchBox'   : {
                ...fonts.portuguesa
            },
            '& .addressText' : {
                flexDirection : 'column'
            },
            ...checkoutStyles.form,
            height                  : 'fit-content',
            zIndex                  : {xs : 'unset', sm : 1},
            padding                 : '12px',
            '& .MuiInputBase-input' : {
                padding : '4px'
            }
        }
    };

    const [selectedAddress, setSelectedAddress] = useState<ISearchAddress | null>(null);
    const [addressLine1, setAddressLine1]       = useState<string | null>(null);
    const [addressLine2, setAddressLine2]       = useState<string | null>(null);


    useEffect(() => {
        const customerAddress = _.get(customerState, 'currentAddress.attributes', null);
        setSelectedAddress(customerAddress);
    }, [customerState]);

    useEffect(() => {
        const streetAddress = (_.get(selectedAddress, 'addressComponents.streetAddress.value', null) || '').trim();
        setAddressLine1(streetAddress || null);

        const suburb   = (_.get(selectedAddress, 'addressComponents.suburb.value', null) || '').trim();
        const state    = (_.get(selectedAddress, 'addressComponents.state.value', null) || '').trim();
        const postcode = (_.get(selectedAddress, 'addressComponents.postcode.value', null) || '').trim();
        setAddressLine2((suburb && state && postcode) ? [suburb, state, postcode].join(', ') : null);
    }, [selectedAddress]);

    return (
        <Grid container sx={styles.storeLookup}>
            {!_.isEmpty(selectedAddress) && <Grid xs={12}>
                <Grid xs={1}>
                    <img src={icons.homeIcon} height={'30px'} width={'30px'} alt={''}/>
                </Grid>

                <Grid xs={9} className="addressText">
                    <Box fontWeight={700}>Your Address</Box>
                    <Box>{addressLine1 || 'Not provided'}</Box>
                    <Box>{addressLine2 || 'Not provided'}</Box>
                </Grid>

                <Grid xs={2} alignItems={'start'} className="changeText">
                    <Box onClick={() => changeAddress?.call(this)}>Change</Box>
                </Grid>
            </Grid>}
        </Grid>
    );
}