import _                         from 'lodash';
import React                     from 'react';
import {Box}                     from '@mui/material';
import {Button}                  from '@mui/material';
import {Divider}                 from '@mui/material';
import {ListItem}                from '@mui/material';
import {ListItemText}            from '@mui/material';
import {useTheme}                from '@mui/material/styles';
import {FixedSizeList}           from 'react-window';
import {ListChildComponentProps} from 'react-window';

import {useNavigate} from 'react-router-dom';

import {clearCategories}    from '../../../../../store/categories';
import {setCurrentStore}    from '../../../../../store/stores';
// import {messageService}  from '../../../../../utils/message-service-bus';
import {useAppDispatch}     from '../../../../../store';
import {setStorePickerOpen} from '../../../../../store/app';
import {useSelector}        from 'react-redux';

interface IComponentProps
{
    stores: ReadonlyArray<any>;
}

export default function StoreList(props: IComponentProps): JSX.Element {
    const {stores}       = props;
    const theme          = useTheme();
    const dispatch       = useAppDispatch();
    const navigate       = useNavigate();
    const {currentStore} = useSelector((state: any) => state.stores);

    function selectStore(store: /*IStore*/any | null): void {
        const shouldUpdate = _.isEmpty(currentStore)
            || _.isEmpty(store)
            || (store.id !== currentStore.id)
        ;

        if (shouldUpdate) {
            // // Broadcast a message to any subscribers
            // messageService.emit({
            //     subject : 'stores/currentStore.updated',
            //     context : {store}
            // });

            // Cleanup categories from previously selected store
            dispatch(clearCategories(null));
            dispatch(setCurrentStore(store));
            dispatch(setStorePickerOpen(false));
        }

        navigate('/menu');
    }

    function renderRow(props: ListChildComponentProps): JSX.Element {
        const {index, style} = props;

        return (
            <Box>
                <ListItem
                    style={style}
                    key={index}
                    component={'div'}
                    disablePadding
                >
                    <ListItemText primary={stores[index].attributes.storeName}/>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => selectStore(stores[index])}
                        sx={{p : 2}}
                    >
                        {'Select'}
                    </Button>
                </ListItem>

                {(index < (stores.length - 1)) && <Divider/>}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width           : '100%',
                backgroundColor : 'transparent'
            }}
        >
            <FixedSizeList
                height={300}
                width={'100%'}
                itemSize={140}
                itemCount={stores.length}
                overscanCount={2}
                style={{
                    marginTop       : '2em',
                    padding         : '1em',
                    backgroundColor : theme.palette.common.white
                }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
