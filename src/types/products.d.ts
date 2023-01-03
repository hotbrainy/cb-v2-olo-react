// TODO: move this to a UI module ???
interface ISelectable
{
    onSelected?: (ctx?: any) => void;
}


interface IProductModifier
{
    name: string;
    description: string;
    max: number;
    min: number;
    multiply: number;
    snoozed: boolean;
    plu: string;
}

interface IProductModifierGroup
{
    id: string;
    name: string;
    description: string;
    modifiers: ReadonlyArray<IProductModifier>;
}

interface IProductBundle
{
    id: string;
    name: string;
    description: string;
    plu: string;
    max: number;
    min: number;
    snoozed: boolean;
    visible: boolean;
    products: ReadonlyArray<IProduct>;
}

interface IProduct
{
    id: string;
    name: string;
    description: string;
    price: number;
    plu: string;
    imageUrl: string;
    isCombo: boolean;
    snoozed: boolean;
    visible: boolean;
    sortOrder: number;
    modifierGroups: ReadonlyArray<IProductModifierGroup>;
    bundles: ReadonlyArray<IProductBundle>;
}

interface IProductCategory
{
    id: string;
    name: string;
    description: string;
    level: number;
    imageUrl: string;
    sortOrder: number;
    products: ReadonlyArray<IProduct>;
}
