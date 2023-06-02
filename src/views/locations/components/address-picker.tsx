import _           from 'lodash';
import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// MUI Components
import Grid          from '@mui/material/Unstable_Grid2';
import SearchIcon    from '@mui/icons-material/Search';
import {Box}         from '@mui/material';
import {FormControl} from '@mui/material';
import {Theme}       from '@mui/material';

import {apiFetchGeocodedAddress}  from 'src/store/customer';
import {apiSearchCustomerAddress} from 'src/store/customer';
import {clearCustomerAddress}     from 'src/store/customer';
import {clearSearchResults}       from 'src/store/customer';
import {ICustomerState}           from 'src/store/customer';
import {ISearchAddress}           from 'src/store/customer';
import useConfig                  from 'src/components/useConfig';
import {useAppDispatch}           from 'src/store';
import SearchInput
                                  from 'src/components/inputs/search-input';
import {IPoint}                   from '..';
import {fonts}                    from 'src/shared/styles';
import paletteColors              from 'src/theme/paletteColors';
import {checkoutStyles}           from 'src/views/checkout/localStyles';

export interface IComponentProps
{
    orderType: OrderType,
    customerState: ICustomerState,
    suburbOnly?: boolean
}

export function DrawAddressPicker(props: IComponentProps): React.ReactElement {
    const {orderType, customerState, suburbOnly} = props;

    const config   = useConfig();
    const dispatch = useAppDispatch();

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

    const shouldShowCustomerAddress             = /^delivery$/i.test(orderType || '');
    const [searchMode, setSearchMode]           = useState('search');
    const resetSearch                           = () => {
        setAddressCandidates([]);
        setSearchMode('search');
    };
    const [selectedAddress, setSelectedAddress] = useState<ISearchAddress | null>(null);
    const [deliverLocation, setDeliverLocation] = useState<IPoint | null>(null);

    /*** region: Customer Address Search */
    const [addressCandidates, setAddressCandidates] = useState<ReadonlyArray<any>>([]);

    function searchDeliveryAddress(query: string): void {
        // Enforce minimum query string length
        if ((query || '').length >= 3) {
            dispatch(apiSearchCustomerAddress({config, query}));
        }
        else {
            dispatch(clearCustomerAddress(null));
        }
    }

    function selectDeliveryAddress(value: any): void {
        const referenceId: string = _.get(value, 'attributes.referenceId', null);
        setSearchMode('view');
        dispatch(apiFetchGeocodedAddress({config, referenceId}));
        dispatch(clearSearchResults(null));
        setAddressCandidates([]);
    }

    useEffect(() => {
        const customerAddress = _.get(customerState, 'currentAddress.attributes', null);
        const lat             = _.get(customerAddress, 'addressComponents.latitude.value', null);
        const lng             = _.get(customerAddress, 'addressComponents.longitude.value', null);

        setDeliverLocation((lat && lng) ? {lat, lng} : null);
        setSelectedAddress(customerAddress);
        setAddressCandidates(customerState.addressSearchResults || []);
    }, [customerState]);

    useEffect(() => {
        if (!_.isEmpty(deliverLocation)) {
        }
    }, [deliverLocation]);
    /*** endregion: Customer Address Search */

    return (
        <Grid container sx={styles.storeLookup}>
            <Grid xs={12}>
                <FormControl
                    variant={'standard'}
                    onSubmit={(event) => event.preventDefault()}
                    sx={{width : '100%'}}
                >
                    <SearchInput
                        items={addressCandidates}
                        filter={searchDeliveryAddress}
                        onSelect={selectDeliveryAddress}
                        displayPath={'attributes.address'}
                        inputProps={{
                            sx          : {fontWeight : 400},
                            autoFocus   : true,
                            placeholder : suburbOnly ? 'Enter Address' : 'Enter Your Address'
                        }}
                        startIcon={<SearchIcon sx={{ml : '10px'}}/>}
                        sx={{
                            color           : (theme: Theme) => theme.palette.common.coolGrey,
                            backgroundColor : (theme: Theme) => theme.palette.common.lightGrey,
                            borderRadius    : '10px',
                            width           : '100%'
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}
