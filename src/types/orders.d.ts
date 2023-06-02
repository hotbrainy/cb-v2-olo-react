type OrderType = 'catering' | 'collection' | 'delivery';

// 0: catering, 1: delivery, 2: collection
type MenuType = 0 | 1 | 2;

interface IOrder
{
    // TODO: ##################
    // TODO: implement this ???
    // TODO: ##################
    clientType: string; // ANDROID, IOS, WEB
    clientVersion: string; // example: 'V.1.0.0.5073'
    // TODO: ##################

    basket: IOrderBasket;
    store: IOrderStore; // TODO: review this... why not simply pass the store id ???
    payment: IOrderPayment;
    customer: IOrderCustomer;
    delivery?: IOrderDelivery | null;
    channelLinkId: string | null;

    // NOTE: these exist on submitted orders (fetched by id)
    id?: string | null;
    version?: string | null;
    clientIp?: string | null;
    status?: string | null;
    createdDateTime?: string | null;
    deliverectId?: string | null;
    prepTimeMinutes?: number | null;
}


interface ISubmittedOrder
{
    type: string;
    id: string;
    delivery: string;
    pos: string;
    prepTimeMinutes: number | null;
}


interface IOrderBasket
{
    type: string; //'DELIVERY' | 'COLLECTION' | 'CATERING';
    discount: number;
    tax: number;
    total: number;
    asap: boolean;
    notes: string;
    items: IOrderBasketItem[];
    placementDateTime: string;
    // --
    dropOffDateTime?: string | null;
    dropOffDateTimeOffset?: string | null;
    // --
    pickupDateTime?: string | null;
    pickupDateTimeOffset?: string | null;
}


interface IOrderBasketItem
{
    id: string;
    referenceId: string;
    name: string;
    imageUri?: string;
    price: number;
    total: number;
    quantity: number;
    tax: number;
    subItems?: IOrderBasketItem[];
}


interface IOrderStore
{
    id: string;
    abn: string;
    address: IOrderAddress;
}


interface IOrderAddress
{
    address: string;
    addressComponents: IOrderAddressComponents;
}


interface IOrderAddressComponents
{
    country: {
        value: string;
        longValue: string;
    };
    streetName: { value: string; };
    unit?: { value: string; };
    streetNumber?: { value: string; };
    latitude: { value: number | string; };
    postcode: { value: string; };
    suburb: { value: string; };
    state: { value: string; };
    floor?: { value: string; };
    longitude: { value: number | string; };
}


interface IOrderPayment
{
    total       : number;
    dateTime    : string; // TODO: review this... DateTime ???
    cardNumber? : string; // TODO: review this
    cardType?   : string; // TODO: review this
    payments    : IOrderPaymentItem[];
}


interface IOrderPaymentItem
{
    type: string;
    amount: number;
    capture: boolean;
    paymentDetails: IOrderPaymentItemDetail;
}


interface IOrderPaymentItemDetail
{
    cardTokenId: string;
    cardToken: string;
}


interface IOrderCustomer
{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: IOrderAddress | null;
    loyalty?: IOrderCustomerLoyalty | null;
}

interface IOrderCustomerLoyalty
{
    userId: string;
    token: string;
    card: string;
}


interface IOrderDelivery
{
    vendor: string; // 'DOORDASH'
}