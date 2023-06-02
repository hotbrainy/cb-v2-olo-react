# Checkout Flow
in the /src/views/checkout folder

  /checkout - index.tsx - View Bag
    Checkout Button goes to /dispatch

  /dispatch - dispatch.tsx - Gets contact information and pickup time returns a "pickup" object onChange
    pickup {
      additionalInformation: string
      collectTime: "SCHEDULE" | "ASAP"
      dropType: "LEAVE" | "MEET" | "OUTSIDE"
      pickupTime: Date
    }

  /payment - payment.tsx - Gets the payment method
    //TODO construct EDIT,DELETE,DEFAULT for Card Stack
    //TODO add all the Loyalty Bit, apply voucher, use credit etc
    //TODO list the order elements
    // if set to delivery goes to delivery.tsx
    // if set to pickup goes to pickup.tsx
    lists a members cardStack
    fires:
      applePay: boolean
      googlePay: boolean
      selectedCard: {
        cardHolderName: string
        cardNumber: string
        cardExpiry: string
        cvv: string
      }

  /delivery - delivery.tsx
    Says Order on it's way
    Has a timer doing some UI updates for effect...throw that shit away.
    currentStage is the Text that displays under the progress bar
    percentComplete is the amount of Orange on the Progress bar
    <DrawStage currentStage={activeStage} percentComplete={activeCompletion} />

  /pickup - pickup.tsx
    //TODO make is a slide button, currently just a Click
    //TODO remove the auto jump to /status
    shows the fancy car graphic
    onClick fires the startCooking function

  /status - status.tsx
    has pickup | delivery versions within the page
    if stage has time and !done then has Orange dot
    if stage has time and done then Orange dot with circle
    if !time then Grey circle

    interface IDeliveryStageData {
      stage: string;
      status: string;
      time?: string;
      done?: boolean;
    }

    stages: IDeliveryStages = {
      [0]: { time: undefined, stage: "Order Received",        status: "Preparing Your Order" },
      [1]: { time: undefined, stage: "Bagging Up",            status: "Waiting For Driver" },
      [2]: { time: undefined, stage: "Your Driver is Enroute",status: "Out For Delivery"},
      [3]: { time: undefined, stage: "Order Complete",        status: "Delivered" },
    }
    Not telling you how to suck eggs, but if you want to highlight "Waiting for Driver" as current stage stages[1].time = "9:05 PM"
    
    orderNumber: string;  - used on "DELIVERY" version of header
    orderDate: string;
    status: string;       - used on "DELIVERY version of header
    deliveryType?: string; - "DELIVERY" | "COLLECTION"
    stages?: IDeliveryStage;
    driver?: string;      - displayed on the "DELIVERY" version
