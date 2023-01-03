import * as React      from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme           from '../src/theme';

// Ensure storybook has access to the custom styles/fonts/etc...
import '../src/app.css';

const ThemeDecorator = (storyFn) => (
    <ThemeProvider theme={theme}>
        {storyFn()}
    </ThemeProvider>
);

export default ThemeDecorator;
