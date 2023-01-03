import React                from 'react';
import Grid                 from '@mui/material/Unstable_Grid2';
import {Button}             from '@mui/material';
import {IconButton}         from '@mui/material';
import {Link}               from '@mui/material';
import {useAppDispatch}     from '../../../../../store';
import {setStorePickerOpen} from '../../../../../store/app';
import searchIcon           from '../../../../../assets/images/figma/icons/search.svg';

interface IComponentProps
{
}

export default function Action(props: IComponentProps): JSX.Element {
    const dispatch = useAppDispatch();

    const style = {
        p          : 1.5,
        fontSize   : {lg : '16px'},
        lineHeight : {lg : '19px'},
        textAlign  : 'center'
    };

    return (
        <Grid display="flex" alignItems="center" justifyContent="flex-end" xs>
            <IconButton component={Link} sx={{mr : 1, display : 'flex'}}>
                <img src={searchIcon} style={{height : '16px'}} alt="search-icon"/>
            </IconButton>

            <Button
                variant="contained"
                color="primary" sx={{...style}}
                onClick={() => dispatch(setStorePickerOpen(true))}
            >
                Order Now
            </Button>
        </Grid>
    );
}
