import * as React    from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';

jest.mock('./components/ConfigContext');

it('renders without crashing', () => {
    const div  = document.createElement('div');
    const root = ReactDOM.createRoot(div as HTMLElement);
    root.render(<App/>);
    root.unmount();
});
