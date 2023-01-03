import * as React from 'react';

// MUI Components
import {Button}     from '@mui/material';
import {ButtonBase} from '@mui/material';
import Grid         from '@mui/material/Unstable_Grid2';
import {Stack}      from '@mui/material';
import {Typography} from '@mui/material';

import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material/styles';

import {SxProps} from '@mui/system';

import {Theme} from '@mui/material/styles';

import {effects} from '../../../shared/styles';
import {fonts}   from '../../../shared/styles';

// Desktop Icons
import bagEmptyIcon from '../../../assets/images/figma/icons/bag-empty.svg';
import cardViewIcon from '../../../assets/images/figma/icons/card-view.svg';
import listViewIcon from '../../../assets/images/figma/icons/list-view.svg';

// Mobile Icons
import bagEmptyFramedIcon from '../../../assets/images/figma/icons/bag-empty-white.svg';
import cardViewFramedIcon from '../../../assets/images/figma/icons/card-view-white.svg';
import listViewFramedIcon from '../../../assets/images/figma/icons/list-view-white.svg';

import doubleArrowDownIcon from '../../../assets/images/figma/icons/double-arrow-down.svg';

// Redux
import {useSelector}    from 'react-redux';
import {useAppDispatch} from '../../../store';

import {messageService}           from '../../../utils/message-service-bus';
import {setViewMode}              from '../../../store/products';
import {selectOrderingOptionById} from '../../../store/basket';
import {selectCategoryProducts}   from '../../../store/categories';

interface IHeaderProps
{
    sx?: SxProps<Theme>;
    title: string;
}


const styles = {
    actionButton : {
        '&:hover' : {
            ...effects.buttonShadow,
            backgroundColor : (theme: Theme) => theme.palette.common.white
        },
        ...effects.buttonShadow,
        ...fonts.ceraBlack,
        padding         : '10px 16px',
        fontSize        : '24px',
        lineHeight      : '22px',
        color           : (theme: Theme) => theme.palette.common.black,
        backgroundColor : (theme: Theme) => theme.palette.common.white
    },

    title : {
        ...effects.titleShadow,
        // ...fonts.comicBookBold,
        fontFamily : 'Comic Book',
        fontStyle  : 'normal',
        fontWeight : 400,
        fontSize   : '32px',
        lineHeight : '41px',
        color      : (theme: Theme) => theme.palette.common.yellow,
        marginTop  : {xs : 0, lg : '1em'},
        // Attempt to add font "border"
        WebkitTextStroke : (theme: Theme) => `1px  ${theme.palette.common.black}`
    }
};


export default function Header(props: IHeaderProps) {
    const {title} = props;

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const dispatch = useAppDispatch();

    // ViewMode State
    const {viewMode}  = useSelector((state: any) => state.products);
    const basketState = useSelector((state: any) => state.basket);

    // Current Store
    const {currentStore} = useSelector((state: any) => state.stores);

    function toggleViewMode() {
        const newViewMode = (viewMode === 'grid') ? 'list' : 'grid';

        // Update Redux
        dispatch(setViewMode(newViewMode));

        // Broadcast a message to any subscribers
        messageService.emit({
            subject : 'products/viewMode.updated',
            context : {viewMode}
        });
    }

    const menuKind = useSelector((state: any) => {
        return selectOrderingOptionById(state, basketState.orderKindId);
    });


    return (
        <>
            <Grid
                container
                maxWidth={'lg'}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    ...(props.sx || {}),
                    mx    : 'auto',
                    width : '100%'
                }}>

                <Grid xs={3}>
                    {isDesktop
                        ? (
                            <Button
                                variant={'text'}
                                sx={{...styles.actionButton}}
                                onClick={() => toggleViewMode()}
                                startIcon={(
                                    <img
                                        src={(viewMode === 'grid') ? listViewIcon : cardViewIcon}
                                        alt="view-mode-icon"
                                        style={{
                                            height : '24px',
                                            width  : '24px'
                                        }}
                                    />
                                )}>
                                {(viewMode === 'grid') ? 'List View' : 'Grid View'}
                            </Button>
                        )
                        : (
                            <ButtonBase onClick={() => toggleViewMode()}>
                                <img
                                    src={(viewMode === 'grid') ? listViewFramedIcon : cardViewFramedIcon}
                                    alt="view-mode-icon"
                                    style={{
                                        margin : '1em',
                                        height : '68px', // '48px',
                                        width  : '68px' // '48px'
                                    }}
                                />
                            </ButtonBase>
                        )
                    }
                </Grid>

                <Grid xs={6}>
                    <Stack alignItems={'center'} justifyContent={'center'} spacing={0}>
                        <Typography
                            component="span"
                            sx={{
                                ...fonts.ceraBlack,
                                fontSize   : '16px',
                                lineHeight : '19px',
                                color      : (theme: Theme) => theme.palette.common.black
                            }}>
                            {`${menuKind.title} from:`}
                        </Typography>

                        <Typography
                            component={'h2'}
                            sx={{
                                ...fonts.ceraBlack,
                                fontSize   : '24px',
                                lineHeight : '24px',
                                textAlign  : 'center',
                                alignItems : 'center',
                                color      : (theme: Theme) => theme.palette.common.red
                            }}>
                            {
                                currentStore
                                    ? currentStore.attributes.storeName
                                    : '<Please Select>'
                            }
                            <img
                                src={doubleArrowDownIcon}
                                alt="select-store-icon"
                                style={{marginLeft : '0.15em'}}
                            />
                        </Typography>
                    </Stack>
                </Grid>

                <Grid container justifyContent={'flex-end'} xs={3}>
                    {isDesktop
                        ? (
                            <Button
                                variant={'text'}
                                sx={{...styles.actionButton}}
                                href={'/checkout'}
                                startIcon={(
                                    <img
                                        src={bagEmptyIcon}
                                        alt="empty-bag-icon"
                                        style={{
                                            height : '24px',
                                            width  : '24px'
                                        }}
                                    />
                                )}>
                                {'View Bag $0.00'}
                            </Button>
                        )
                        : (
                            <ButtonBase href={'/checkout'}>
                                <img
                                    src={bagEmptyFramedIcon}
                                    alt="empty-bag-icon"
                                    style={{
                                        margin : '1em',
                                        height : '68px', // '48px',
                                        width  : '68px' // '48px'
                                    }}
                                />
                            </ButtonBase>
                        )
                    }
                </Grid>

                <Grid xs={12}>
                    <Typography
                        gutterBottom
                        variant={'h4'}
                        align="center"
                        sx={{...styles.title}}>
                        {title}
                    </Typography>
                </Grid>
            </Grid>

            <hr/>
        </>
    );
}
