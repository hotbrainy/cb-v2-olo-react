import React         from 'react';
import Grid          from '@mui/material/Unstable_Grid2';
import paletteColors from '../../../../theme/paletteColors';

interface IComponentProps
{
    marginTop: string;
    marginBottom: string;
}

export default function PaymentDivider(props: IComponentProps): React.ReactElement {
    const {marginTop, marginBottom} = props;

    return (
        <Grid
            xs={12}
            sx={{
                textAlign    : 'center',
                borderBottom : `2px solid ${paletteColors.black}50`,
                height       : marginTop,
                marginBottom : marginBottom
            }}
            className="heading"
        />
    );
}
