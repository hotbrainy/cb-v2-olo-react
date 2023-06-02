import _ from 'lodash';

import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// MUI Components
import {SxProps} from '@mui/material';
import {Box}     from '@mui/material';
import Grid      from '@mui/material/Unstable_Grid2';

import {settings}             from 'src/shared/config-settings';
import {DrawStore}            from './store-detail';
import {IPoint}               from '..';
import {guid}                 from 'src/utils/utils';
import {addFavouriteStore}    from 'src/store/stores';
import {IStoresState}         from 'src/store/stores';
import {removeFavouriteStore} from 'src/store/stores';
import {useAppDispatch}       from 'src/store';
import {locationsStyles}      from '../styles';

export interface IComponentProps
{
    storesState: IStoresState;
    stores?: IExtendedStore[] | null;
    locations: IPoint[];
    onSelect?: (store: IExtendedStore) => void | null;
    sx?: SxProps;
}

export function DrawStoreList(props: IComponentProps): React.ReactElement {
    const {storesState, stores, locations, onSelect, sx} = props;

    const dispatch = useAppDispatch();

    const {favouriteStores} = storesState;

    const [sortedStores, setSortedStores] = useState<IExtendedStore[]>([]);

    /*** Add/Removes a storeId from the favourites */
    function toggleFavourite(storeId: string) {
        if (_.isEmpty(storeId)) {
            return;
        }
        dispatch(favouriteStores?.includes(storeId)
            ? removeFavouriteStore(storeId)
            : addFavouriteStore(storeId)
        );
    }

    const [maxStoreMultiplier, setMaxStoreMultiplier] = useState(1);
    const [hasMoreStores, setHasMoreStores]           = useState(false);

    useEffect(() => {
        const maxToShow = maxStoreMultiplier * settings.DEFAULT_NUMBER_OF_STORES;
        setSortedStores((stores || [])
            .sort((a, b) => (a.distance || 0) - (b.distance || 0))
            .slice(0, maxToShow)
        );
        setHasMoreStores(maxToShow < (stores || []).length);
    }, [maxStoreMultiplier, stores]);

    return (
        <Grid container width={'100%'} sx={{...locationsStyles.storeList}}>
            {
                _.isEmpty(sortedStores) ? (
                    <Grid xs={12} sx={locationsStyles.storeSelector} className="scrollbarThin">
                        <Box className="storeName" textAlign={'center'}>
                            {
                                ((stores === null) || (storesState.loading))
                                    ? 'Loading restaurants'
                                    : 'No restaurants found'
                            }
                        </Box>
                    </Grid>
                ) : (
                    <Grid xs={12} sx={locationsStyles.storeSelector} className="scrollbarThin">
                        {(sortedStores || []).map((store: IExtendedStore) => (
                            <DrawStore
                                key={guid()}
                                store={store}
                                locations={locations}
                                favouriteStores={favouriteStores}
                                toggleFavourite={toggleFavourite}
                                onSelect={onSelect}
                            />
                        ))}

                        {hasMoreStores && (
                            <Grid xs={12}>
                                <Box
                                    onClick={() => setMaxStoreMultiplier(maxStoreMultiplier + 1)}
                                    sx={{cursor : 'pointer'}}
                                >
                                    ...show more
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )
            }
        </Grid>
    );
}