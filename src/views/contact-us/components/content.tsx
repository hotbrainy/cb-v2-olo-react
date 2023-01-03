import React from 'react';

// MUI Components
import {Box}              from '@mui/material';
import {Button}           from '@mui/material';
import {Checkbox}         from '@mui/material';
import {FormControlLabel} from '@mui/material';
import Grid               from '@mui/material/Unstable_Grid2';
import {TextField}        from '@mui/material';
import {Typography}       from '@mui/material';

import {Theme}    from '@mui/material/styles';
import {useTheme} from '@mui/material/styles';

import {SxProps} from '@mui/system';

interface IComponentProps
{
    sx?: SxProps<Theme>;
}


export default function Content(props: IComponentProps): JSX.Element {
    const {sx} = props;

    return (
        <>



        </>
    );
}
