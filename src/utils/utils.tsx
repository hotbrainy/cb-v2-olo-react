import _          from 'lodash';
import food0      from '../assets/images/Food/twoPiece.png';
import food1      from '../assets/images/Food/item1.png';
import food2      from '../assets/images/Food/item2.png';
import food3      from '../assets/images/Food/item3.png';
import {settings} from 'src/shared/config-settings';

export interface IShowcaseItem
{
    id: number;
    title: string;
    image: string;
    blurb: string;
}

export function cleanString(txt: string) {
    return encodeURI(txt.replaceAll("-","o").replaceAll("#","o"));
}

export function obvuscate(txt: string) {
    return Array(txt.length).fill('*');
}

export function getKJFromCalories(calories: string | number) {
    return _.isNumber(calories) && calories!==0
        ? `${Math.round(Number(calories) * settings.caloriesPerKj)}kJ`
        : ''
    ;
}

export function guid(len?: number) {
    var buf     = [],
        chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        length  = len || 32;
    for (var i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
    }
    const ms = `${(new Date()).getTime()}`.substring(6);
    return `${ms}-${buf.join('')}`;
}

type ButVariants = 'text' | 'contained' | 'outlined' | 'mediumContained' | undefined;

export function getButtonVariant(vType: string): ButVariants {
    switch (vType) {
        case 'text':
            return 'text';
        case 'contained':
            return 'contained';
        case 'outlined':
            return 'outlined';
        case 'mediumContained':
            return 'mediumContained';
        default:
            return undefined;
    }
}

type TypoVariants =
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | undefined;

export function getTypographyVariant(vType: string): TypoVariants {
    const variants: string[] = [
        'button',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'inherit',
        'overline',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2'
    ];

    return (variants.indexOf(vType) >= 0)
        ? (vType as TypoVariants)
        : undefined
        ;
}

export function getShowCaseItems(): IShowcaseItem[] {
    return [
        {
            id    : 0,
            title : '2 Piece & Chips',
            image : food0,
            blurb : '2 pieces of Crunchified Chicken hand-breaded in our signature style southern coating and fried to golden perfection with a serve of WA\'s favourite Chips.<br/><span class="caption">*Not available at Airport locations.</span>'
        },
        {
            id    : 1,
            title : 'Variety Feast',
            image : food1,
            blurb : 'Get an abundance of variety with 6 pieces of fresh and succulent Crunchified Chicken, 5 Chicken Nuggets, 6 Chicken Twists, 2 large serves of WA\'s favourite Chips and your choice of 2 dipping sauces. *Not available at Airport locations.'
        },
        {
            id    : 2,
            title : 'Parmi Burger',
            image : food2,
            blurb : 'The Parmi Burger features a Tempta breast fillet, cheesy Mac & Cheese Balls, crispy streaky bacon, cheese, mayo and topped with our rich, flavoursome Napoletana sauce.'
        },
        {
            id    : 3,
            title : 'Gravy Chips',
            image : food3,
            blurb : 'Traditional doesn\'t have to be boring with a serve of crunchy potato Chips topped with our famous Roitsserie Chicken and generous amounts of heart-warming Gravy.'
        }
    ];
}

/** Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
export function dateAdd(date: Date, interval: string, units: number): Date {
    const ret = new Date(date); //don't change original date

    const checkRollover = () => {
        if (ret.getDate() !== date.getDate()) {
            ret.setDate(0);
        }
    };

    switch (interval.toLowerCase()) {
        case 'year':
            ret.setFullYear(ret.getFullYear() + units);
            checkRollover();
            break;
        case 'quarter':
            ret.setMonth(ret.getMonth() + 3 * units);
            checkRollover();
            break;
        case 'month':
            ret.setMonth(ret.getMonth() + units);
            checkRollover();
            break;
        case 'week':
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case 'day':
            ret.setDate(ret.getDate() + units);
            break;
        case 'hour':
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case 'minute':
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case 'second':
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default:
            break;
    }

    return ret;
}

export function getOperatingTime(store: IStore, date: Date, isClosing: boolean = false): Date | null {
    const day        = date.getDay();
    const timeString = isClosing
        ? _.get(store, `tradingHours[${day}].closeTime`, '')
        : _.get(store, `tradingHours[${day}].openTime`, '');
    if (_.isEmpty(timeString)) {
        return null;
    }

    const timeHour      = timeString.indexOf('PM')
        ? Number(timeString.split(':')[0]) + 12
        : Number(timeString.split(':')[0]);
    const timeMinute    = Number(timeString.split(':')[1]);
    const operatingTime = new Date();
    operatingTime.setHours(timeHour);
    operatingTime.setMinutes(timeMinute, 0, 0);

    return operatingTime;
}

export function getMonthName(mnth:number, abbreviated?:boolean) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return abbreviated ? months[mnth-1].substring(0,3) : months[mnth-1];
}



export function getFormattedDate(dte:Date) {
    return `${getMonthName(dte.getMonth()+1,true)} ${dte.getDate().toString().padStart(2,'0')}, ${dte.getFullYear()}`;
}