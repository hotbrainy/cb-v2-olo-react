import * as React from 'react';
import Grid       from '@mui/material/Unstable_Grid2';

import MenuCategoryButton from '../../../components/buttons/menu-category-button';

export interface IGridViewProps
{
    categories: ReadonlyArray<any>;
}

export default function GridView(props: IGridViewProps) {
    const {categories} = props;

    return (
        <>
            <Grid container maxWidth="lg" sx={{mx : 'auto'}}>
                <Grid xs={12} sx={{mt : 5, display : {xs : 'none', md : 'flex'}, mpb : 0}}>
                    Categories
                </Grid>

                <Grid container spacing={4} sx={{mt : 1}}>
                    {categories.map((category) => (
                        <Grid display="flex" key={category.id} xs={6} md={4} lg={3}>
                            <MenuCategoryButton
                                title={category.name}
                                imageUrl={category.imageUrl}
                                onClick={category.onSelected}
                                sx={{
                                    width : '100%'
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}
