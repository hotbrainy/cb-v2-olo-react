import React         from 'react';
import Grid          from '@mui/material/Unstable_Grid2';
import {fonts}       from '../../../../../shared/styles';
import moment        from 'moment';
import {Box}         from '@mui/material';
import paletteColors from 'src/theme/paletteColors';


export interface IComponentProps
{
    orderDate: string;
    status?: string;
    orderNumber?: string;
}

const localStyles = {
    rootContainer : {
        ...fonts.matter,
        width      : '100%',
        fontWeight : '700',
        fontSize   : {xs : '15px', sm : '20px'},
        lineHeight : {xs : '17px', sm : '22px'},
        '& .title' : {
            fontSize   : {xs : '10px', sm : '12px'},
            lineHeight : {xs : '12px', sm : '14px'}
        },

        '& .MuiGrid2-root' : {
            height : 'fit-content'
        }
    }
};


export default function DrawStatusHeader(props: IComponentProps): React.ReactElement {
    const {orderDate, status, orderNumber} = props;

    return (
        <Grid
            container
            width={'100%'}
            paddingBottom={'10px'}
            sx={{...localStyles.rootContainer}}
        >
            <Grid xs={12} width="100%" sx={{...fonts.ceraBlack, alignItems : 'start'}}>
                {orderNumber && <Grid
                    flex={1}
                    width="100%"
                    height="22px !important"
                    className="justifyGridLeft"
                    flexDirection={'column'}
                    alignItems={'start'}
                >
                    <Box className="title">Order</Box>
                    <Box>{orderNumber || '######'}</Box>
                </Grid>}
                <Grid
                    flex={1}
                    width="100%"
                    height="22px !important"
                    className="justifyGridLeft"
                    flexDirection={'column'}
                    alignItems={'start'}
                >
                    <Box className="title">Date</Box>
                    <Box>{orderDate || moment().format('DD MMM yyyy')}</Box>
                </Grid>

                <Grid
                    flex={1}
                    width="100%"
                    className="justifyGridRight"
                    alignItems={'start'}
                >
                    <Grid textAlign="left" flexDirection={'column'}>
                        <Box width="100%" className="title">Status</Box>
                        <Box width="100%" sx={{color : paletteColors.oportoOrange}}>
                            {status || 'Status Unknown'}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
