import React        from 'react';
import Grid         from '@mui/material/Unstable_Grid2';
import DropDownMenu from '../../../../menus/dropdown-menu';

interface IComponentProps
{
    items: ReadonlyArray<INavigationItem>;
}

export default function Menu(props: IComponentProps): JSX.Element {
    const {items} = props;

    return (
        <Grid
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            xs={6}
            sx={{display : 'flex'}}
        >
            <DropDownMenu items={items}/>
        </Grid>
    );
}
