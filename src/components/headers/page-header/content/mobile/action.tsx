import React    from 'react';
import Grid     from '@mui/material/Unstable_Grid2';
import {Button} from '@mui/material';

interface IComponentProps
{
}

export default function Action(props: IComponentProps): JSX.Element {
    const style = {
        mr       : 2,
        maxWidth : '84px',
        textAlign : 'center'
    };

    return (
        <>
            <Grid display="flex" alignItems="center" justifyContent="flex-end" xs>
                <Button
                    variant="contained"
                    color="primary"
                    href={'/locations'}
                    sx={{...style}}
                >
                    Order Now
                </Button>
            </Grid>
        </>
    );
}
