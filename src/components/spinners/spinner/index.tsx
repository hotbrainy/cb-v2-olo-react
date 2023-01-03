import React              from 'react';
import {CircularProgress} from '@mui/material';
import {Stack}            from '@mui/material';
import {Typography}       from '@mui/material';
import {useTheme}         from '@mui/material';
import {Theme}            from '@mui/material';
import {SxProps}          from '@mui/system';

interface IComponentProps
{
    title?: string;
    sx?: SxProps<Theme>;
}

export default function Spinner(props: IComponentProps): JSX.Element {
    const {title, sx} = props;
    const theme       = useTheme();

    return (
        <>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <CircularProgress
                    variant={'indeterminate'}
                    size={20}
                    sx={{
                        color : theme.palette.common.grey,
                        ...sx
                    }}
                />

                {title && (
                    <Typography
                        variant={'h4'}
                        sx={{
                            color      : theme.palette.common.black,
                            fontSize   : {lg : '16px'},
                            lineHeight : {lg : '19px'}
                        }}
                    >
                        {title}
                    </Typography>
                )}
            </Stack>
        </>
    );
}
