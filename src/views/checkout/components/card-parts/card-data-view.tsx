import React            from 'react';
import Grid             from '@mui/material/Unstable_Grid2';
import paletteColors    from 'src/theme/paletteColors';
import {checkoutStyles} from '../../localStyles';
import {Button}         from '@mui/material';
import {Paper}          from '@mui/material';

export interface ICardData
{
    cardNumber: string;
    cardExpiry: string;
    cardHolderName: string;
    cardIcon?: string;
    cardType?: string;
    isDefault?: boolean;
}

export interface IComponentProps
{
    cardData: ICardData;
    onDelete?: (model: ICardData) => void;
    onEdit?: (model: ICardData) => void;
    makeDefault?: (model: ICardData) => void;
}

const localStyles = {
    ...checkoutStyles,
    paper  : {
        padding                 : '18px',
        borderRadius            : '14px',
        '& .MuiButton-outlined' : {
            borderRadius : '8px',
            width        : '100%'
        }
    },
    button : {
        textTransform : 'capitalize',
        fontWeight    : '700',
        lineHeight    : '14px',
        color         : `${paletteColors.oportoBlack}70`,
        borderColor   : `${paletteColors.oportoBlack}70`,
        '&.selected'  : {
            borderColor : paletteColors.oportoOrange,
            color       : paletteColors.oportoOrange,
            '&:hover'   : {
                backgroundColor : `${paletteColors.oportoOrange}60`,
                borderColor     : paletteColors.oportoOrange
            }
        },
        '&:hover'     : {
            backgroundColor : `${paletteColors.oportoBlack}30`,
            borderColor     : `${paletteColors.oportoBlack}80`
        }
    }
};

export default function CardDataView(props: IComponentProps): React.ReactElement {
    const {cardData, onDelete, onEdit, makeDefault}                               = props;
    const {cardHolderName, cardNumber, cardExpiry, cardIcon, cardType, isDefault} = cardData;

    return (
        <Paper sx={localStyles.paper}>
            <Grid container width={'100%'}>
                {/* Row 1 */}
                <Grid xs={2}>{cardIcon && <img src={cardIcon} height={30} alt={''}/>}</Grid>
                <Grid xs={3} sx={{fontWeight : '700'}}>{cardType}</Grid>
                <Grid xs={3}>ending in {(cardNumber || '').substring((cardNumber || '').length - 4)}</Grid>
                <Grid xs={4}>expires {cardExpiry}</Grid>


                {/* Row 2 */}
                <Grid xs={2}></Grid>
                <Grid xs={10}>{cardHolderName}</Grid>


                {/* Row 3 */}
                <Grid xs={4} display="none !important">
                    <Button
                        sx={[localStyles.button, {display : 'none'}]}
                        variant="outlined"
                        onClick={() => onEdit?.call(this, cardData)}
                    >
                        {`edit`}
                    </Button>
                </Grid>

                <Grid xs={12} flex={1} justifyContent="center">
                    <Button
                        sx={{...localStyles.button, width : '100%'}}
                        variant="outlined"
                        onClick={() => onDelete?.call(this, cardData)}
                    >
                        {`delete`}
                    </Button>
                </Grid>

                <Grid xs={4} justifyContent="end" display="none !important">
                    <Button
                        sx={{...localStyles.button, display : 'none'}}
                        className={isDefault ? 'selected' : ''}
                        variant="outlined"
                        onClick={() => makeDefault?.call(this, cardData)}
                    >
                        {isDefault ? 'default' : 'set default'}
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
