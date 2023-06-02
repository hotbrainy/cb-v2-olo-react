import moment from 'moment';

export const cardExpiryFormat = 'MM/YY';

export interface ICardDetail
{
    cardNumber?: string;
    cardHolderName?: string;
    cardExpiry?: string;
    cvv?: string;
}

// NOTE: should really only check if a value "resembles" a credit card number then let the payment gateway validate it
// ref: https://gist.github.com/michaelkeevildown/9096cd3aac9029c4e6e05588448a8841
export const cardTests: Readonly<Record<string, RegExp>> = {
    'Amex Card'          : /^3[47][0-9]{13}$/,
    'BCGlobal'           : /^(6541|6556)[0-9]{12}$/,
    'Carte Blanche Card' : /^389[0-9]{11}$/,
    'Diners Club Card'   : /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    'Discover Card'      : /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    'Insta Payment Card' : /^63[7-9][0-9]{13}$/,
    'JCB Card'           : /^(?:2131|1800|35\d{3})\d{11}$/,
    'KoreanLocalCard'    : /^9[0-9]{15}$/,
    'Laser Card'         : /^(6304|6706|6709|6771)[0-9]{12,15}$/,
    'Maestro Card'       : /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$/,
    'Mastercard'         : /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    'Solo Card'          : /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
    'Switch Card'        : /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
    'Union Pay Card'     : /^(62[0-9]{14,17})$/,
    'Visa Card'          : /^4[0-9]{12}(?:[0-9]{3})?$/,
    'Visa Master Card'   : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/
};

/**
 * Check validity of cardholder name
 * @param {string | null} value
 * @returns {boolean}
 */
export function isValidCardHolderName(value?: string | null): boolean {
    // TODO: determine if there are more appropriate rules
    return (value || '').trim().length > 0;
}

/**
 * Test if card number is reasonable, ie. correct number/type of digits
 * @param {string | null} value
 * @returns {boolean}
 */
export function isValidCardNo(value?: string | null): boolean {
    // Extract only digits from the value
    const sanitizedCardNo = (value || '').replace(/[^0-9]/g, '');

    if (sanitizedCardNo) {
        for (const key in cardTests) {
            if (cardTests[key].test(sanitizedCardNo)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Determine card type based on the card number
 * @param {string | Number | null} cardNo
 * @returns {string}
 */
export function getCardType(cardNo?: string | Number | null): string | null {
    // Extract only digits from the value
    const sanitizedCardNo = (`${cardNo}` || '').replace(/[^0-9]/g, '');

    if (sanitizedCardNo) {
        for (const key in cardTests) {
            if (cardTests[key].test(sanitizedCardNo)) {
                return key;
            }
        }
    }

    return null;
}

/**
 * Check validity of card CVV number
 * @param {string | Number | null} value
 * @returns {boolean}
 */
export function isValidCvv(value?: string | Number | null): boolean {
    return /^\d{3}$/.test(`${value}` || '');
}

/**
 * Test validity of card expiry date
 * @param {string | null} value
 * @returns {boolean}
 */
export function isValidCardExpiry(value?: string | null): boolean {
    return /^(?:0[1-9]|1[0-2])\/[0-9]{2}$/.test(value || '');
}

/**
 * Check validity of a card expiry date
 * @param {string | null} cardExpiry date in format MM/YY
 * @returns {boolean}
 */
// export function cardHasExpired(cardExpiry?: string | null): boolean {
//     if (!isValidCardExpiry(cardExpiry)) {
//         return true;
//     }
//
//     // Capture the expected expiry segments using a regex pattern with named groups
//     const match = (cardExpiry || '').match(/^(?<mm>0[1-9]|1[0-2])[\/\\](?<yy>[0-9]{2})$/);
//
//     const today          = new Date();
//     const startOfCentury = Math.floor(today.getFullYear() / 100) * 100;
//     const expiryMonth    = parseInt(match?.groups?.mm || '', 10) - 1; // zero-based
//     const expiryYear     = startOfCentury + parseInt(match?.groups?.yy || '', 10);
//
//     // NOTE: this assumes a card expires at the start of the month (may need to change to EOM)
//     const expiryDate = new Date(expiryYear, expiryMonth, 1);
//
//     return (expiryDate <= today);
// }
export function cardHasExpired(cardExpiry?: string | null): boolean {
    if (!isValidCardExpiry(cardExpiry)) {
        return true;
    }

    // TODO: determine whether to use start or end of expiry month
    // const expiry = moment.utc('01/' + cardExpiry, 'DD/MM/YY').startOf('month');
    const expiry = moment.utc('01/' + cardExpiry, 'DD/MM/YY').endOf('month');
    const today  = moment.utc().startOf('day');

    return expiry.isBefore(today);
}

export function isValidCardDetail(model?: ICardDetail | null): boolean {
    return ((model || null) !== null)
        && isValidCardNo(model?.cardNumber)
        && isValidCardHolderName(model?.cardHolderName)
        && !cardHasExpired(model?.cardExpiry)
        && isValidCvv(model?.cvv)
        ;
}
