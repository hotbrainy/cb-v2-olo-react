// Load polyfills (once, on the top of our web app)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './index.css';

/**
 * Frontend code running in browser
 */
import * as React      from 'react';
import {createRoot}    from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import ConfigContext from '../components/ConfigContext';
import {Config}      from '../server/config';
import App           from '../app';

import {store}    from '../store';
import {Provider} from 'react-redux';

const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

/** Components added here will _only_ be loaded in the web browser, never for server-side rendering */
const render = () => {
    const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

    const rootElement = document.getElementById('root')!;
    const root        = createRoot(rootElement);

    root.render(
        <>
            {/* The configuration is the out-most component. This allows us to read the configuration even in the theme */}
            <ConfigContext.Provider value={config}>
                <BrowserRouter basename={basename}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </ConfigContext.Provider>
        </>
    );
};

render();
