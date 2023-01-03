import moment       from 'moment-timezone';
import * as React   from 'react';
import Grid         from '@mui/material/Unstable_Grid2';
import {Typography} from '@mui/material';
import {useTheme}   from '@mui/material/styles';

export interface IComponentProps
{
}

export default function Copyright(props: IComponentProps): JSX.Element {
    const theme = useTheme();

    const copy        = '©'; //'&copy';
    const reg         = '®'; //'&reg';
    const companyName = `Chicken Treat${reg}`;
    const currentYear = moment().format('YYYY');
    const copyRight   = `${copy} ${currentYear} ${companyName} All rights reserved`;

    const style = {
        mt         : 2,
        mb         : 5,
        fontSize   : {lg : '12px'},
        lineHeight : {lg : '16px'},
        color      : theme.palette.common.white
    };

    return (
        <>
            <Grid
                maxWidth="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                xs={12}
            >
                <Typography variant="subtitle1" sx={{...style}}>
                    {copyRight}
                </Typography>
            </Grid>
        </>
    );
}
