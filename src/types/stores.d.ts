interface IPickupTypes
{
    instore: boolean;
    kerbside: boolean;
    driveThru: boolean;
}

interface IStore
{
    id: string;
    isEnabled: boolean;
    isCateringEnabled: boolean;
    isCollectionEnabled: boolean;
    isDeliveryEnabled: boolean;
    storeEmail: string;
    storeName: string;
    abn?: string | null;
    acn?: string | null;
    storeAddress?: {
        address?: string;
        addressComponents?: {
            country?        : { value?: string, longValue: string};
            floor?          : { value?:string };
            latitude?       : { value?:number };
            longitude?      : { value?:number };
            postcode?       : { value?:string };
            state?          : { value?:string };
            streetName?     : { value?:string };
            streetNumber?   : { value?:string };
            suburb?         : { value?:string };
            unit?           : { value?:string };
        };
    };
    storePhone: string;
    timezoneName: string;
    tradingHours: ITradingHours[];
    parkingBays: [];
    pickupTypes: IPickupTypes;
    deliverectId: string; // deprecated
    storeNumber: string;
    locationId: string;
    gsi1pk: string;
    gsi1sk: string;
    lat: number;
    lng: number;
}


interface IAmenity
{
    name: string;
    available: boolean;
}

type PickupTypes = Record<string, boolean>;
type Amenities = Record<string, boolean>;

interface IExtendedStore extends IStore
{
    amenities: Amenities;
    storeAddress: any;      // TODO: review this... re-declares the IStore property
    distance?: number;
}


interface ITradingHours
{
    dayOfWeek: string;

    // TODO: review this... trading hours structure is inconsistent
    // -- structure #1
    openTime?: string;
    closeTime?: string;

    // -- OR structure #2
    hours?: {
        openTime?: string;
        closeTime?: string;
    };

    // -- OR structure #3
    collectionTimePeriods?: {
        openTime?: string;
        closeTime?: string;
    };
}
