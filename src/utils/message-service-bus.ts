// ref: https://blog.bitsrc.io/sharing-data-between-react-components-using-rxjs-922a46c13dbf

import {Subject} from 'rxjs';

export interface IAppMessage
{
    subject: string;
    context?: any;
}

const subscriber = new Subject<IAppMessage>();

const messageService = {
    emit : (msg: IAppMessage): void => subscriber.next(msg)
};

export {messageService, subscriber};
