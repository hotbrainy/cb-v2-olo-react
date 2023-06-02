import _           from 'lodash';
import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// Global Components
import Grid                    from '@mui/material/Unstable_Grid2';
import {Box}                   from '@mui/material';
import {Button}                from '@mui/material';
import {Hidden}                from '@mui/material';
import {Paper}                 from '@mui/material';
import {guid}                  from 'src/utils/utils';
import {effects}               from 'src/shared/styles';
import {fonts}                 from 'src/shared/styles';
import {settings}              from 'src/shared/config-settings';
import {checkoutStyles}        from 'src/views/checkout/localStyles';
import paletteColors           from 'src/theme/paletteColors';
import {getSubTotalAsCurrency} from 'src/views/menu/components/utils';
import {getRewardBadge}        from '../flame-rewards';
import {getOrderingOptionById} from '../../../../store/basket';
import {IOrderingOption}       from '../../../../store/basket';

export interface IOrderHistory
{
    date: string;
    membership_level: string;   // Gold
    level_stage: string;   // 7/10 Orders
    order_type: OrderType;// collection
    store_id: string;
    store_name: string;
    spent: number;   //3590
    redeemed: number;   //500
    reward: number;   //180
    receiptId: string;
}

function DrawSale(props: { sale: IOrderHistory, onClick?: Function }): React.ReactElement {
    const {sale, onClick} = props;

    const showReceipt = (receiptId: string) => onClick?.call(this, receiptId);

    const [orderingOption, setOrderingOption] = useState<IOrderingOption | null>(null);
    useEffect(() => {
        setOrderingOption(getOrderingOptionById(sale.order_type) || null);
    }, []);

    const localStyles = {
        root   : {
            '& .badge'       : {
                marginLeft : '-10px'
            },
            '& .smallButton' : {
                height       : '30px',
                borderRadius : '4px'
            }
        },
        button : {
            ...checkoutStyles.button,
            ...fonts.portuguesa,
            fontSize      : '20px',
            textTransform : 'unset',
            fontWeight    : '400',
            letterSpacing : '-0.05em',
            '&.addCard'   : {
                fontSize        : '20px',
                lineHeight      : '20px',
                fontWeight      : '400',
                color           : paletteColors.deepPink,
                border          : `1px solid ${paletteColors.deepPink}`,
                backgroundColor : paletteColors.grey10
            },
            '&.apple'     : {
                '&.selected' : {
                    border          : `3px solid ${paletteColors.oportoOrange}`,
                    backgroundColor : paletteColors.oportoBlack
                }
            },
            '&.google'    : {
                '&.selected' : {
                    border          : `3px solid ${paletteColors.oportoOrange}`,
                    color           : `${paletteColors.black}70`,
                    backgroundColor : paletteColors.white
                }
            }
        }
    };

    return (
        <Grid container width={'100%'} className="theme" mt={2} key={guid()} sx={{...fonts.matter, ...localStyles.root}}>
            <Paper
                elevation={1}
                sx={{
                    ...effects.buttonShadow,
                    width        : '100%',
                    padding      : '12px',
                    borderRadius : settings.borderRadius
                }}
            >
                <Hidden smDown>
                    <Grid container width={'100%'} fontSize={'14px'}>
                        <Grid xs={12} width={'100%'} className="justifyGridLeft">
                            {sale.date}
                        </Grid>
                        <Grid xs={4} flexDirection="column">
                            <Box sx={{fontWeight : 700}} fontSize={'22px'}>{`${orderingOption?.title || ''}, ${sale.store_name}`}</Box>
                            <Box display={'flex'} flexDirection={'row'} fontWeight={700} height={'40px'} alignItems={'center'}>
                                <Grid xs={3}><img src={getRewardBadge(sale.membership_level)} height={'40px'}/></Grid>
                                <Grid xs={4}>{sale.membership_level}</Grid>
                                <Grid xs={5}>{sale.level_stage}</Grid>
                            </Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}}>Spent</Box>
                            <Box fontSize={'22px'}>{getSubTotalAsCurrency(sale.spent)}</Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}}>Redeemed</Box>
                            <Box fontSize={'22px'}>{getSubTotalAsCurrency(sale.redeemed)}</Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}}>Reward</Box>
                            <Box fontSize={'22px'}>{getSubTotalAsCurrency(sale.reward)}</Box>
                        </Grid>
                        <Grid xs={2}>
                            <Button
                                variant="outlined"
                                sx={localStyles.button}
                                onClick={() => showReceipt(sale.receiptId)}
                            >
                                Receipt
                            </Button>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid xs={12} flexDirection="row" fontSize={'12px'}>
                        <Grid xs={6} flexDirection="column" className="justifyGridLeft">
                            <Box sx={{fontWeight : 700}}>{sale.date}</Box>
                            <Box fontSize={'12px'}>{`${orderingOption?.title || ''}, ${sale.store_name}`}</Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}} textAlign={'end'}>Spent</Box>
                            <Box fontSize={'12px'} textAlign={'end'}>{getSubTotalAsCurrency(sale.spent)}</Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}} textAlign={'end'}>Redeem</Box>
                            <Box fontSize={'12px'} textAlign={'end'}>{getSubTotalAsCurrency(sale.redeemed)}</Box>
                        </Grid>
                        <Grid xs={2} flexDirection="column">
                            <Box sx={{fontWeight : 700}} textAlign={'end'}>Reward</Box>
                            <Box fontSize={'12px'} textAlign={'end'}>{getSubTotalAsCurrency(sale.reward)}</Box>
                        </Grid>
                    </Grid>
                    <Grid container flexDirection="row" fontSize={'14px'} fontWeight={700} alignItems={'center'}>
                        <Grid xs={2} textAlign={'start'}><img src={getRewardBadge(sale.membership_level)} height={'40px'} className={'badge'}/></Grid>
                        <Grid xs={3}>{sale.membership_level}</Grid>
                        <Grid xs={4}>{sale.level_stage}</Grid>
                        <Grid xs={3} textAlign={'end'}><Button className="smallButton" variant="outlined" sx={localStyles.button}
                                                               onClick={() => showReceipt(sale.receiptId)}>Receipt</Button></Grid>
                    </Grid>
                </Hidden>
            </Paper>
        </Grid>
    );
}

export function DrawFlameHistory(props: { history: IOrderHistory[], onClickReceipt?: Function }): React.ReactElement {
    const {history, onClickReceipt} = props;

    const showReceipt = (receiptId: string) => onClickReceipt?.call(this, receiptId);

    return (
        <Grid container width={'100%'} key={guid()}>
            {(history || []).map((sale: IOrderHistory) => {
                return <DrawSale key={guid()} sale={sale} onClick={showReceipt}/>;
            })}
        </Grid>
    );
}
