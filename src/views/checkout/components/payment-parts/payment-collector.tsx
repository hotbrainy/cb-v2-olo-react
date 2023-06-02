import _             from 'lodash';
import React         from 'react';
import {useEffect}   from 'react';
import {useState}    from 'react';
import {useSelector} from 'react-redux';
import {Button}      from '@mui/material';
import {Paper}       from '@mui/material';
import {FormGroup}   from '@mui/material';
import {SxProps}     from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import paletteColors from 'src/theme/paletteColors';

import {checkoutStyles}    from '../../localStyles';
import {ICardDetail}       from '../utils/checkout-utils';
import {isValidCardDetail} from '../utils/checkout-utils';
import {CardDataView}      from '../card-parts';
import {ICardData}         from '../card-parts';
import {images}            from 'src/shared/styles';
import {settings}          from '../../../../shared/config-settings';
import masterCardIcon      from '../../../../assets/images/Icons/masterCardIcon.png';
import LoadingSpinner      from 'src/components/spinners/loading/loading';
import {Property}          from 'csstype';


interface IPaymentCollectorProps
{
    memberType?: string;
    cardStack?: ICardData[];
    paymentData?: ICardData[];
    onChange?: any;
    fireApplePay?: any;
    fireGooglePay?: any;
    sxProps?: SxProps;
    placeholders?: Readonly<Record<string, string>>;
    hideThirdPartyPayments?: boolean;
    hideHeading?: boolean;
}


/**
 * Renders a payment collector component
 * @param {IPaymentCollectorProps} props
 * @returns {React.ReactElement}
 * @constructor
 */
export default function PaymentCollector(props: IPaymentCollectorProps): React.ReactElement {
    const {
              paymentData,
              onChange,
              sxProps,
              fireApplePay,
              fireGooglePay,
              placeholders,
              memberType,
              cardStack,
              hideThirdPartyPayments,
              hideHeading
          } = props;

    const paymentGateway = useSelector((state: any) => state.paymentGateway);

    //*** region: Setup local states
    const isGuest = (memberType === 'GUEST');

    const [availableCards, setAvailableCards]       = useState<ICardData[]>(isGuest ? [] : (cardStack || []));
    const [showNewCardDetail, setShowNewCardDetail] = useState<boolean>(_.isEmpty(cardStack));

    const [applePay, setApplePay]   = useState<boolean>(false);
    const [googlePay, setGooglePay] = useState<boolean>(false);

    const [selectedCard, setSelectedCard] = useState<ICardDetail | null>(null);

    const [hostedPaymentPageUrl, setHostedPaymentPageUrl] = useState<string | null>(null);
    // const {currentStore}                                  = useSelector((state: any) => state.stores);

    /*** endregion: Setup local states */


    function useApplePay() {
        setGooglePay(false);
        setApplePay(true);
        fireApplePay?.call(this);
    }

    function useGooglePay() {
        setApplePay(false);
        setGooglePay(true);
        fireGooglePay?.call(this);
    }

    function removeAvailableCard(model: ICardData): void {
        // TODO: remove from fatzebra and/or craveable brands server ???

        // TODO: add an id to the card and use id for comparison
        setAvailableCards(availableCards.filter((p) => p !== model));
    }

    function updateAvailableCard(model: ICardData): void {
        console.log('TODO: update existing card');
    }

    function assignDefaultAvailableCard(model: ICardData): void {
        for (const cardData of availableCards) {
            // TODO: add an id to the card and use id for comparison
            cardData.isDefault = (cardData === model);
        }

        // Force refresh
        setAvailableCards([...availableCards]);
    }

    function cancelCard() {
        setShowNewCardDetail(false);
    }


    //#region React to local state change and return values
    useEffect(() => {
        if ((hostedPaymentPageUrl === null) && paymentGateway.tokenizeCardUrl) {
            setHostedPaymentPageUrl(paymentGateway.tokenizeCardUrl);
        }

        if (_.isEmpty(availableCards)) {
            // Always show the card detail entry fields when there's no available cards
            setShowNewCardDetail(true);
            setHostedPaymentPageUrl(paymentGateway.tokenizeCardUrl || null);
        }
        else {
            // When there's no default card assigned, set the first card as the default
            const defaultCard = availableCards.find((p) => p.isDefault);
            if (_.isEmpty(defaultCard)) {
                availableCards[0].isDefault = true;

                // Force refresh
                setAvailableCards([...availableCards]);
            }
        }

        if (applePay || googlePay || isValidCardDetail(selectedCard)) {
            onChange?.call(this, {applePay, googlePay, selectedCard});
        }
    }, [paymentGateway, applePay, googlePay, selectedCard, availableCards]);
    //#endregion


    // TODO: move this to it's own module
    // ####################################
    // region: BROWSER POST MESSAGE HANDLER
    // ####################################
    useEffect(() => {
        // Ensure this code block is executing in browser (not server-side)
        if ((typeof (window) !== 'undefined') && !(window as any).paymentHost) {
            // TODO: fetch this from the server
            (window as any).paymentHost = paymentGateway.paymentGatewayHost;

            function messageListener(event: MessageEvent<any>): void {
                if (event.origin !== (window as any).paymentHost) {
                    return;
                }

                if (event.type !== 'message') {
                    return;
                }

                const msg = event.data;

                // Older browsers will have a query-string style data payload, whereas newer browsers will have an object
                let payload = msg;
                if (typeof (payload) === 'string') {
                    if (/\[object/i.test(payload || '')) {
                        // Raised if the serialization failed
                        alert('Sorry, it looks like there has been a problem communicating with your browser...');
                        return;
                    }

                    // Deserialize into an object
                    payload     = {};
                    const pairs = payload.split('&');
                    for (const element of pairs) {
                        const [key, value = ''] = element.split('=');
                        payload[key]      = value;
                    }
                }

                if ('data' in payload) {
                    payload = payload.data;
                }

                console.log(`HOSTED PAYMENT: ${msg.message} - ${JSON.stringify({msg})}`);
                switch (msg.message) {
                    case 'form.invalid':
                        // TODO: Handle invalid form message
                        break;

                    case 'form.valid':
                        // TODO: Handle invalid form message
                        break;

                    case 'transaction.complete':
                        // TODO: Handle the transaction complete message.
                        // Payload will be in e.data.data (eg. payload.data.r === 1)
                        if (payload.tokenize_only === 'true') {
                            // TODO: handle tokenize success
                            const tokenizedCard = {
                                cardNumber     : payload.card_number,
                                cardExpiry     : payload.card_expiry,
                                cardHolderName : payload.card_holder,
                                cardIcon       : masterCardIcon, // TODO: populate this
                                cardType       : payload.card_type,
                                isDefault      : true
                            };
                            console.log(JSON.stringify({tokenizedCard}));
                            // TODO: upsert into available cards list
                            // Force refresh
                            setAvailableCards([...availableCards, tokenizedCard]);
                            setHostedPaymentPageUrl(''); // set to an empty string (NULL has a different behaviou)
                            // onChange?.call(this, {applePay, googlePay, selectedCard});
                            onChange?.call(this, {tokenizedCard : payload}); // TODO: review this... pass entire payload
                        }
                        else {
                            // TODO: handle the notification
                        }
                        break;

                    case 'transaction.processing':
                        // TODO: Handle the processing of the transaction - implementation optional.
                        break;

                    case 'transaction.cancelled':
                        // TODO: Handle the transaction being cancelled (i.e. show message, re-display the window etc).
                        break;

                    default:
                        break;
                }
            }

            if ('addEventListener' in window) {
                window.addEventListener('message', messageListener);
            }
            else if ('attachEvent' in window) {
                (window as any).attachEvent('onmessage', messageListener);
            }


            // Remove events on view dismount
            return (() => {
                if ('addEventListener' in window) {
                    window.removeEventListener('message', messageListener);
                }
                else if ('attachEvent' in window) {
                    (window as any).detachEvent('onmessage', messageListener);
                }
            });
        }
    }, [paymentGateway]);
    // #######################################
    // endregion: BROWSER POST MESSAGE HANDLER
    // #######################################


    const localStyles = {
        ...checkoutStyles,
        form                : {
            ...sxProps,
            ...checkoutStyles.form,
            borderRadius    : settings.borderRadius,
            backgroundColor : 'transparent'
        },
        button              : {
            ...checkoutStyles.button,
            fontSize      : '15px',
            textTransform : 'unset',
            fontWeight    : '700',
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
        },
        cardDetailContainer : {
            '& .MuiGrid2-container' : {
                padding       : '0 !important',
                '& .padLeft'  : {paddingLeft : '4px !important'},
                '& .padRight' : {paddingRight : '4px !important'}
            }
        },
        hostedPaymentFrame  : {
            border       : 0,
            objectFit    : ('contain' as Property.ObjectFit),
            height       : 600,
            width        : '100%',
            overflow     : 'none',
            color        : 'red',
            '& .payment' : {
                backgroundColor : 'transparent'
            }
        }
    };


    return (
        <FormGroup>
            <Grid container width="100%" sx={{...localStyles.form, padding : '0 !important'}}>
                {
                    !hideHeading && (
                        <Grid
                            xs={12}
                            className="heading"
                            sx={{marginBottom : '24px', '& img' : {marginLeft : '25px'}}}
                        >
                            Payment <img src={images.cardsIcons} alt={'Card icons'} height={'35px'}/>
                        </Grid>
                    )
                }

                {/* Render list of existing tokenized cards */}
                {/*!isGuest &&*/ availableCards.map((cardData, ii) => {
                    return (
                        <Grid key={`payment-method-${ii}`} xs={12} p={0} sx={{...localStyles.cardDetailContainer}}>
                            <CardDataView
                                cardData={cardData}
                                onDelete={removeAvailableCard}
                                // onEdit={updateAvailableCard}
                                // makeDefault={assignDefaultAvailableCard}
                            />
                        </Grid>
                    );
                })}

                {/* Render add card button */}
                {!isGuest && !showNewCardDetail && (
                    <Grid xs={12} p={0} sx={{...localStyles.cardDetailContainer}}>
                        <Button
                            variant="outlined"
                            sx={localStyles.button}
                            className="addCard"
                            onClick={() => setShowNewCardDetail(true)}
                        >
                            {`Add a New Card`}
                        </Button>
                    </Grid>
                )}

                {/* Render Hosted Payment Page */}
                <Grid xs={12} spacing={8} direction="column" component="form">
                    <Paper elevation={0} sx={{padding : '8px', width : '100%', backgroundColor : 'transparent'}}>
                        {
                            hostedPaymentPageUrl
                                ? (
                                    <iframe
                                        id="hostedPaymentFrame"
                                        title="Hosted Payment Frame"
                                        loading="lazy"
                                        width={'100%'}
                                        height={600}
                                        className="hostedPaymentFrame"
                                        style={{...localStyles.hostedPaymentFrame}}
                                        // scrolling="no"
                                        src={hostedPaymentPageUrl}
                                    />
                                )
                                // TODO: loading skeleton
                                : ((hostedPaymentPageUrl === null) && (<><LoadingSpinner text={`Initializing Payment Gateway ...`}/></>))
                        }
                    </Paper>
                </Grid>
            </Grid>
        </FormGroup>
    );
}
