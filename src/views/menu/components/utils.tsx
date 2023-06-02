import _               from 'lodash';
import React           from 'react';
import {useState}      from 'react';
import {IBagItem}      from 'src/store/basket';
import {asCurrency}    from 'src/utils/filters';
import ChevronDownIcon from '@mui/icons-material/ChevronRight';
import {Box}           from '@mui/material';
import Grid            from '@mui/system/Unstable_Grid';
import paletteColors   from 'src/theme/paletteColors';
import {settings}      from 'src/shared/config-settings';
import { ConstructionOutlined } from '@mui/icons-material';

export function removeOrderItem(parentId: string, prod: IProduct, orderItem: IBagItem): IBagItem {
    const {subItems}  = orderItem;
    const newSubItems = (subItems || []).filter((item) => item && (item.uniqueId !== prod.uniqueId));
    return {...orderItem, subItems : newSubItems};
}

export function removeOrderKey(key: string, orderItem: IBagItem): IBagItem {
    const {subItems}  = orderItem;
    const newSubItems = (subItems || []).filter((item) => item && (item.key !== key));
    return {...orderItem, subItems : newSubItems};
}

export function getSelectedItems(bagItem?: IBagItem | null): string[] {
    return (bagItem?.subItems || [])
        .map((id) => id.name || '')
        .filter((name) => !_.isEmpty((name || '').trim()))
        ;
}

export function getCoreItem(item: IProduct): IProduct | IBagItem {
    if (_.isEmpty(item?.subItems)) {
        return item;
    }

    const {subItems, ...coreItem} = item;
    return coreItem;
}

export function isValidBranch(order: IBagItem, parent?: IProduct): boolean {
    if (_.isEmpty(parent)) {
        return true;
    }

    const {uniqueId, min, max} = parent;

    const numberInOrder = (order?.subItems || [])
        .filter((item: IBagItem) => item.key === uniqueId)
        .reduce((qty, bagItem: IBagItem) => qty + (bagItem.quantity || 0), 0)
    ;
    const result = ((numberInOrder >= min) && (numberInOrder <= max))
    console.log("test: ",parent,result);
    return result;
}

export function addToOrderItem(parentId: string, prod: IProduct, quantity: number, orderItem: IBagItem, parent?: IProduct): IBagItem {
    if (_.isEmpty(prod)) {
        return orderItem;
    }

    // *** region: REMOVED: unused
    // let newOrderItem = {...orderItem}
    // const rest   = getCoreItem(prod);
    // *** endregion: REMOVED: unused

    //TODO: find the last parent and add this coreItem to it's subItems ???
    return {
        ...orderItem,
        parent,
        subItems : [
            ...upsertItemIntoSubItems(parentId, prod, quantity, orderItem.subItems)
        ]
    };
}

/**
 * if subItems already contains key = parentId && uniqueId = item.uniqueId then replace, otherwise insert
 * @param parentId - parentProduct
 * @param prod - the item to insert
 * @param quantity - the qty
 * @param givenSubItems - current subItems
 * @returns a new subItems[] with the update/insert done
 */
export function upsertItemIntoSubItems(parentId: string, prod: IProduct, quantity: number, givenSubItems?: IBagItem[]): IBagItem[] {
    const thisItem     = getCoreItem(prod);
    const newSubItems  = (givenSubItems || []).slice();
    const currentEntry = newSubItems.find((item) => {
        return item && (item.key === parentId) && (item.uniqueId === thisItem.uniqueId);
    });

    if (_.isEmpty(newSubItems) || _.isEmpty(currentEntry)) {
        return newSubItems.concat([{...thisItem, key : parentId, quantity}]);
    }

    return newSubItems
        .filter((item) => item && (item.key !== parentId) && (item.uniqueId !== thisItem.uniqueId))
        .concat([{...thisItem, key : parentId, quantity}])
        ;
}

export function findSubItem(bagItem: IBagItem, itemId: string): IBagItem | null {
    for (const item of (bagItem?.subItems || [])) {
        if (item && (item.uniqueId === itemId)) {
            return item;
        }

        const subItem = findSubItem(item, itemId);
        if (subItem !== null) {
            return subItem;
        }
    }

    return null;
}

export const getSubTotalAsCurrency = (price?: number | null, quantity?: number | null): string => {
    return asCurrency(((price || 0) / 100) * (quantity || 1));
};

export function isInOrder(bagItem: IBagItem, id: string): boolean {
    return !_.isEmpty(findSubItem(bagItem, id));
}

export function getItemFromOrder(bagItem: IBagItem, id: string): IBagItem | null {
    return findSubItem(bagItem, id);
}

export function getNumberInOrder(id: string, bagItem: IBagItem): number {
    return (bagItem?.subItems || [])
        .filter((item) => item && (item.key === id))
        .reduce((subtotal, item) => subtotal + (item?.quantity || 0), 0)
        ;
}

export function getQuantityOfSubItems(total: number, subItem?: IBagItem): number {
    return (subItem?.subItems || []).reduce((subtotal, item) => {
        return getQuantityOfSubItems(subtotal + (item?.quantity || 0), item);
    }, total);
}

export function checkIfValidNumberOfSubItems(theOrder: IBagItem, subItem?: IBagItem): boolean {
    // *** region: REMOVED: unused
    // const numberInOrder = getQuantityFromParentInOrder(subItem.uniqueId||"",theOrder);
    // *** endregion: REMOVED: unused

    for (const thisItem of (subItem?.subItems || [])) {
        if (!_.isEmpty(thisItem?.subItems)) {
            const hasValidSubItemCount = checkIfValidNumberOfSubItems(theOrder, thisItem);

            if (!hasValidSubItemCount) {
                return false;
            }
        }
    }

    return true;
}

export function getQuantityFromParentInOrder(parentId: string, order: IBagItem): number {
    return (order?.subItems || [])
        .filter((item) => item && (item.key === parentId))
        .reduce((subtotal, item) => subtotal + (item?.quantity || 0), 0)
        ;
}

// TODO: move this component to its own module (doesn't belong in a utils module)
export function DrawQuantitySelector(props: {
    selected: boolean,
    prod: IProduct,
    optionImageHeight: string,
    maxAllowedForThisItem: number,
    numberSelected: number,
    parents: IProduct[],
    addRemove: Function,
    vertical?: boolean,
    rounded?: boolean
}): React.ReactElement {
    const {maxAllowedForThisItem, numberSelected, addRemove, vertical, rounded} = props;

    const [currentNumber, setCurrentNumber] = useState(numberSelected);
    const incrementNumber                   = (amt: number) => {
        const newNumber = currentNumber + amt;
        setCurrentNumber(newNumber);
        addRemove(newNumber);
    };

    const radiusOverride = '15px';
    return <Grid
        container
        className="quantityPicker"
        width="100%"
        sx={{
            borderRadius    : rounded ? radiusOverride : settings.borderRadius,
            backgroundColor : paletteColors.yellow,
            padding         : '2px',
            flexDirection   : vertical ? 'column-reverse' : 'row'
        }}
    >
        <Grid xs={4} display="flex" alignItems={'center'} justifyContent="start" width={'100%'}>
            <Box
                width="100%"
                height="100%"
                sx={{
                    cursor          : numberSelected > 0 ? 'pointer' : '',
                    backgroundColor : paletteColors.white,
                    borderRadius    : rounded ? radiusOverride : settings.borderRadius,
                    width           : '25px',
                    fontWeight      : '700',
                    justifyContent  : 'center',
                    display         : 'flex',
                    alignItems      : 'center'
                }}
                onClick={
                    currentNumber - 1 >= 0
                        ? () => incrementNumber(-1)
                        : undefined
                }
            >
                -
            </Box>
        </Grid>
        <Grid xs={4} display="flex" alignItems={'center'} justifyContent="center" width={'100%'}>
            {currentNumber}
        </Grid>
        <Grid xs={4} display="flex" alignItems={'center'} justifyContent="end" width={'100%'}>
            <Box
                width="100%"
                height="100%"
                sx={{
                    cursor          : maxAllowedForThisItem > 0 ? 'pointer' : '',
                    backgroundColor : paletteColors.white,
                    borderRadius    : rounded ? radiusOverride : settings.borderRadius,
                    width           : '25px',
                    fontWeight      : '700',
                    justifyContent  : 'center',
                    display         : 'flex',
                    alignItems      : 'center',
                    color           :
                        ((maxAllowedForThisItem > 0) && (currentNumber < maxAllowedForThisItem))
                            ? paletteColors.black
                            : `${paletteColors.black}50`
                }}
                onClick={
                    ((maxAllowedForThisItem > 0) && (currentNumber < maxAllowedForThisItem))
                        ? () => incrementNumber(1)
                        : () => {}
                }
            >
                +
            </Box>
        </Grid>
    </Grid>;
}

// TODO: move this component to its own module (doesn't belong in a utils module)
export function DrawExpanda(props: { identifier?: string, isClosed: boolean, onSelect?: Function }): React.ReactElement {
    const {identifier, isClosed, onSelect} = props;
    return (
        <Box onClick={onSelect && identifier ? () => onSelect(identifier) : undefined}>
            <ChevronDownIcon
                sx={{
                    transform : isClosed
                        ? 'rotate(-90deg)'
                        : 'rotate(90deg)'
                }}
            />
        </Box>
    );
}
