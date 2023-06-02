import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import theme from 'src/theme';

// Global Components
import Page from '../../components/page';
import { useAppDispatch } from 'src/store';
import useConfig from 'src/components/useConfig';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Container, FormGroup, Paper, TextField } from '@mui/material';
import ButtonGroup from 'src/components/buttons/button-group';
import paletteColors from 'src/theme/paletteColors';
import { fonts, icons, images, rootStyles } from 'src/shared/styles';
import { checkoutStyles } from '../checkout/localStyles';
import { HeadingTitle } from '../menu/components/header';
import { DrawFlameRewards } from './components/flame-rewards';
import { DrawOrders, IOrderVM } from './components/orders';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawProfile } from './components/profile';
import { PaymentCollector } from '../checkout/components/payment-parts';
import { ICardData } from '../checkout/components/card-parts';
import { styles } from './styles';
import { ContentDialog } from 'src/components/display/modal-dialog/modal-dialog';
import { getSubTotalAsCurrency } from '../menu/components/utils';
import { IOrderHistory } from './components/flame-rewards/flame-history';


export const sampleCardStack: ICardData[] = [
    {
        cardNumber     : '1112',
        cardExpiry     : '04/2023',
        cardHolderName : 'Mr Pete Sherman',
        cardIcon       : images.masterCardIcon,
        cardType       : 'MasterCard',
        isDefault      : true
    },
    {
        cardNumber     : '6243',
        cardExpiry     : '04/2023',
        cardHolderName : 'Mr Pete Sherman',
        cardIcon       : images.visaCardIcon,
        cardType       : 'VISA',
        isDefault      : false
    }
];


// Setup the member details for the rewards panels
export interface IMemberDetails {
    rewardDollars               : number;
    cardStack                   : ICardData[];
    level                       : string;
    visits                      : number;
    nextLevel                   : string;
    visitsRequiredForNextLevel  : number;
    history?                    : IOrderHistory[];
    orders?                     : IOrderVM[];
}

export const memberDetails:IMemberDetails = {
	level                           : "PLATINUM",
    nextLevel                       : "GOLD",
    rewardDollars                   : 34.50,
    cardStack                       : sampleCardStack,
    visits                          : 7,
    visitsRequiredForNextLevel      : 15,
    history                         : [
        {
            date            : "12/05/2022",
            membership_level: "Orange",
            level_stage     : "6/10 Orders",
            order_type      : "collection",
            store_id        : "9f7b6e3a-0c57-4f05-8599-1fac480e4f16",
            store_name      : "Chermside",
            spent           : 3590,
            redeemed        : 500,
            reward          : 180,
            receiptId       : "123456789",
        },
        {
            date            : "12/05/2022",
            membership_level: "Gold",
            level_stage     : "7/10 Orders",
            order_type       : "collection",
            store_id        : "9f7b6e3a-0c57-4f05-8599-1fac480e4f16",
            store_name      : "Chermside",
            spent           : 3590,
            redeemed        : 500,
            reward          : 180,
            receiptId       : "123456789",
        },
        {
            date            : "12/05/2022",
            membership_level: "Silver",
            level_stage     : "8/10 Orders",
            order_type       : "collection",
            store_id        : "9f7b6e3a-0c57-4f05-8599-1fac480e4f16",
            store_name      : "Chermside",
            spent           : 3590,
            redeemed        : 500,
            reward          : 180,
            receiptId       : "123456789",
        },
        {
            date            : "12/05/2022",
            membership_level: "Platinum",
            level_stage     : "9/10 Orders",
            order_type      : "collection",
            store_id        : "9f7b6e3a-0c57-4f05-8599-1fac480e4f16",
            store_name      : "Chermside",
            spent           : 3590,
            redeemed        : 500,
            reward          : 180,
            receiptId       : "123456789",
        }
    ],
    orders                          : [
        {status:"open", receiptId:"123456", orderId:"654321"},
        {status:"closed", receiptId:"234561", orderId:"543216"},
        {status:"pending", receiptId:"345612", orderId:"432165"},
        {status:"closed", receiptId:"456123", orderId:"321654"},
    ]
}

export default function AccountPage(): React.ReactElement {
    const dispatch                                          = useAppDispatch();
    const config                                            = useConfig();

    const [userCardStack,setUserCardStack]                  = useState(memberDetails.cardStack);
    const [focussedSection, setFocussedSection]             = useState("orders");
    function changeSection(section: string) { setFocussedSection(section) }

    const [receiptWindowOpen, setReceiptWindowOpen] = useState(false);
    const [receiptId, setReceiptId] = useState("");
    function openReceipt(receiptId:string) {
        setReceiptWindowOpen(true);
        setReceiptId(receiptId);
    }

    const [orderWindowOpen, setOrderWindowOpen] = useState(false);
    const [orderId, setOrderId] = useState("");
    function openOrder(orderId:string) {
        setOrderWindowOpen(true);
        setOrderId(orderId);
    }

    function DrawReceipt(props:{receiptId:string}):React.ReactElement {
        const {receiptId} = props;
        // TODO find out what this looks like
        // TODO load the receipt from somewhere
        const date = "12/03/2023";
        const amount= 3595;

        return (
            <Box>
                <Box sx={{fontSize:"24px",fontWeight:700}}>Order Receipt: {receiptId}</Box>
                <Box>{date}</Box>
                <Box>{getSubTotalAsCurrency(amount)}</Box>
            </Box>
        )
    }

    function DrawOrder(props:{orderId:string}):React.ReactElement {
        const {orderId} = props;
        // TODO find out what this looks like
        // TODO load the order from somewhere
        const date = "12/03/2023";
        const amount= 3595;

        return (
            <Box>
                <Box sx={{fontSize:"24px",fontWeight:700}}>Order Number: {orderId}</Box>
                <Box>{date}</Box>
                <Box>{getSubTotalAsCurrency(amount)}</Box>
            </Box>
        )
    }

    const goBack = () => {
        //TODO change focussed section
        changeSection("")
    }

    return (
        <Page>
            <Container>
                <FormGroup>
                    <Grid container width={'100%'} className="theme" mt={2} sx={styles.gridContainer}>
                        <Grid container width={"100%"}>
                            <Grid xs={2} display={{xs:"flex", sm:"none"}}>
                                <Button
                                    variant={'text'}
                                    sx={{...rootStyles.actionButton, height:"40px", width:"40px", minWidth:"40px", borderRadius : '4px'}}
                                    onClick={() => goBack()}
                                >
                                    <img src={images.chevronLeft} height={"20px"}/>
                                </Button>
                            </Grid>
                            <Grid xs={10} sm={12} className="justifyGridCenter">
                                <HeadingTitle title="Account" isBold={true} isBasic={true} containerSx={{paddingTop:0,"& h2":{lineHeight:"normal"},"& img":{width:"45px"}}} />
                            </Grid>
                        </Grid>
                        <Grid container width={'100%'} sx={styles.gridContainer}>
                            <Grid xs={12} sm={4} pr={'12px'}>
                                <Grid container width="100%">
                                    <Grid xs={12}>
                                        <Paper sx={{ padding: '12px', width: '100%', borderRadius: '14px' }}>
                                            <Grid xs={12} className="justifyGridLeft smallHeading">
                                                Pete Sherman
                                            </Grid>
                                            <Grid xs={12} className="justifyGridLeft tagLine">
                                                Member since 1 March 2022
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid xs={12} paddingRight={1} display={{xs:focussedSection==="" ? "flex" : "none",sm:"flex"}}>
                                        <Paper sx={styles.menu}>
                                            <Grid xs={12} className={`justifyGridLeft menuline ${focussedSection=="profile" ? "selected" : ""}`}>
                                                <Box onClick={()=>changeSection('profile')}>Profile
                                                <ChevronRightIcon sx={{ float: 'right', marginTop: '5px' }} /></Box>
                                            </Grid>
                                            <Grid xs={12} className={`justifyGridLeft menuline ${focussedSection=="payment" ? "selected" : ""}`}>
                                                <Box onClick={()=>changeSection('payment')}>Payment
                                                <ChevronRightIcon sx={{ float: 'right', marginTop: '5px' }} /></Box>
                                            </Grid>
                                            <Grid xs={12} className={`justifyGridLeft menuline ${focussedSection=="orders" ? "selected" : ""}`}>
                                                <Box onClick={()=>changeSection('orders')}>Orders
                                                <ChevronRightIcon sx={{ float: 'right', marginTop: '5px' }} /></Box>
                                            </Grid>
                                            <Grid xs={12} className={`justifyGridLeft menuline ${focussedSection=="rewards" ? "selected" : ""}`}>
                                                <Box onClick={()=>changeSection('rewards')}>Flame Rewards
                                                <ChevronRightIcon sx={{ float: 'right', marginTop: '5px' }} /></Box>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={12} sm={8}>
                                <Grid container width={'100%'}>
                                    {focussedSection=="profile" && <Grid container width={"100%"}>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft heading">
                                            Profile
                                        </Grid>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft">
                                            <DrawProfile />
                                        </Grid>
                                    </Grid>}
                                    {focussedSection=="payment" && <Grid container width={"100%"}>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft heading">
                                            Payment
                                        </Grid>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft">
                                            {focussedSection=="payment" && <PaymentCollector
                                                memberType='member'
                                                hideThirdPartyPayments={true}
                                                hideHeading={true}
                                                cardStack = {userCardStack}
                                                />}
                                        </Grid>
                                    </Grid>}
                                    {focussedSection=="orders" &&  <Grid container width={"100%"}>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft heading">
                                            Orders
                                        </Grid>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft">
                                            {focussedSection=="orders" && <DrawOrders onOrderStatusClicked={openOrder} onShowReceiptClicked={openReceipt} orders={memberDetails.orders || []}/>}
                                        </Grid>
                                    </Grid>}
                                    {focussedSection=="rewards" &&  <Grid container width={"100%"}>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft heading">
                                            Flame Rewards
                                        </Grid>
                                        <Grid xs={12} width={'100%'} className="justifyGridLeft">
                                            {focussedSection=="rewards" && <DrawFlameRewards memberDetails={memberDetails} onReceiptClick={openReceipt}/>}
                                        </Grid>
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <ContentDialog
                        isOpen={receiptWindowOpen}
                        onClose={()=>setReceiptWindowOpen(false)}
                        buttonOneClick={()=>setReceiptWindowOpen(false)}
                        buttonOneText={"OK"}
                    >
                        <DrawReceipt receiptId={receiptId} />
                    </ContentDialog>
                    <ContentDialog
                        isOpen={orderWindowOpen}
                        onClose={()=>setOrderWindowOpen(false)}
                        buttonOneClick={()=>setOrderWindowOpen(false)}
                        buttonOneText={"OK"}
                    >
                        <DrawOrder orderId={orderId} />
                    </ContentDialog>
                </FormGroup>
            </Container>
        </Page>
    );
}
