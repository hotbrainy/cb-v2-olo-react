import React                     from 'react';
import {InputBaseComponentProps} from '@mui/material';
import {InputBase}               from '@mui/material';
import {Paper}                   from '@mui/material';
import {SxProps}                 from '@mui/system';

interface IComponentProps
{
    sx?: SxProps;
    inputProps?: InputBaseComponentProps;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export default function TextInput(props: IComponentProps): JSX.Element {
    const {inputProps} = props;

    return (
        <Paper
            elevation={0}
            component={'form'}
            sx={{
                // Defaults
                p          : '2px 4px',
                display    : 'flex',
                alignItems : 'center',
                width      : 400,
                // Overrides
                ...props.sx
            }}
        >
            {props.startIcon}

            <InputBase
                inputProps={inputProps}
                sx={{
                    fontFamily : 'Cera',
                    fontStyle  : 'normal',
                    fontWeight : 400,
                    fontSize   : {xs : '16px', lg : '20px'},
                    lineHeight : {sx : '20px', lg : '24px'},
                    // --
                    ml   : 1,
                    flex : 1
                    // ...inputProps?.sx
                }}
            />

            {props.endIcon}
        </Paper>
    );
}
