import React                   from 'react';
import {useEffect}             from 'react';
import {useState}              from 'react';
import {TextField}             from '@mui/material';
import Grid                    from '@mui/material/Unstable_Grid2';
import {ICardDetail}           from '../utils/checkout-utils';
import {cardExpiryFormat}      from '../utils/checkout-utils';
import {cardHasExpired}        from '../utils/checkout-utils';
import {isValidCardNo}         from '../utils/checkout-utils';
import {isValidCardHolderName} from '../utils/checkout-utils';
import {isValidCvv}            from '../utils/checkout-utils';


type PlaceholderDictionary = {[key: string]: string};

interface IComponentProps
{
    cardDetail?: ICardDetail;
    placeholders?: PlaceholderDictionary;
    onSuccess: (model: ICardDetail) => void;
}


function getPlaceholderValue(key: string, placeholders?: PlaceholderDictionary | null): string {
    const defaultPlaceholders: PlaceholderDictionary = {
        cardNumber     : 'Card Number',
        cardHolderName : 'Card Holder Name',
        cardExpiry     : `Expiry Date (${cardExpiryFormat})`,
        cardCvv        : 'CVV'
    };

    return placeholders?.[key] || defaultPlaceholders[key] || '';
}


export default function CardDetailCollector(props: IComponentProps): React.ReactElement {
    const {cardDetail, placeholders, onSuccess} = props;

    const [cardNumber, setCardNumber]           = useState<string | null>(cardDetail?.cardNumber || '');
    const [cardNumberError, setCardNumberError] = useState<string | null>('');

    const [cardHolderName, setCardHolderName]           = useState<string | null>(cardDetail?.cardHolderName || '');
    const [cardHolderNameError, setCardHolderNameError] = useState<string | null>('');

    const [cardExpiry, setCardExpiry]           = useState<string | null>(cardDetail?.cardExpiry || '');
    const [cardExpiryError, setCardExpiryError] = useState<string | null>('');

    const [cvv, setCvv]           = useState<string | null>(cardDetail?.cvv || '');
    const [cvvError, setCvvError] = useState<string | null>('');


    useEffect(() => {
        const hasValidCardNo     = isValidCardNo(cardNumber);
        const hasValidCardHolder = isValidCardHolderName(cardHolderName);
        const hasValidExpiry     = !cardHasExpired(cardExpiry);
        const hasValidCvv        = isValidCvv(cvv);

        // Display any error messages
        setCardNumberError(hasValidCardNo ? '' : 'Card Number Not Valid');
        setCardHolderNameError(hasValidCardHolder ? '' : `Card Holder Name Not Valid`);
        setCardExpiryError(hasValidExpiry ? '' : 'Expiry Date Not Valid');
        setCvvError(hasValidCvv ? '' : 'CVV Not Valid');

        // TODO: only trigger this on valid card detail
        // const allValid = hasValidCardNo && hasValidCardHolder && hasValidExpiry && hasValidCvv;
        // if (allValid) {
        onSuccess?.call(this, {cardNumber, cardHolderName, cardExpiry, cvv});
        // }
    }, [cardNumber, cardHolderName, cardExpiry, cvv]);


    const styles = {
        container : {
            '& .MuiGrid2-root' : {
                padding      : '8px',
                paddingLeft  : '0 !important',
                paddingRight : '0 !important'
            }
        }
    };


    return (
        <Grid container width="100%" sx={{...styles.container}}>
            <Grid xs={12}>
                <TextField
                    type="text"
                    placeholder={getPlaceholderValue('cardNumber', placeholders)}
                    label={getPlaceholderValue('cardNumber', placeholders)}
                    value={cardNumber}
                    helperText={cardNumberError || ' '}
                    inputProps={{maxLength : 50}}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
            </Grid>

            <Grid xs={12}>
                <TextField
                    type="text"
                    placeholder={getPlaceholderValue('cardHolderName', placeholders)}
                    label={getPlaceholderValue('cardHolderName', placeholders)}
                    value={cardHolderName}
                    helperText={cardHolderNameError || ' '}
                    inputProps={{maxLength : 255}}
                    onChange={(event) => setCardHolderName(event.target.value)}
                />
            </Grid>

            <Grid xs={6} className="padRight">
                <TextField
                    type="text"
                    placeholder={getPlaceholderValue('cardExpiry', placeholders)}
                    label={getPlaceholderValue('cardExpiry', placeholders)}
                    helperText={cardExpiryError || ' '}
                    value={cardExpiry}
                    inputProps={{maxLength : cardExpiryFormat.length}}
                    onChange={(event) => setCardExpiry(event.target.value)}
                />
            </Grid>

            <Grid xs={6} className="padLeft">
                <TextField
                    type="text"
                    placeholder={getPlaceholderValue('cardCvv', placeholders)}
                    label={getPlaceholderValue('cardCvv', placeholders)}
                    value={cvv}
                    helperText={cvvError || ' '}
                    inputProps={{maxLength : 3}}
                    onChange={(event) => setCvv(event.target.value)}
                />
            </Grid>
        </Grid>
    );
}
