import _           from 'lodash';
import * as React  from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid       from '@mui/material/Unstable_Grid2';
import {Box}      from '@mui/material';
import {Button}   from '@mui/material';
import {Skeleton} from '@mui/material';
import {useTheme} from '@mui/material/styles';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

// Local Components
import Content from './components/content';

import {useSelector}                        from 'react-redux';
import {useAppDispatch}                     from '../../store';
import {apiGetNutritionAllergenPageContent} from '../../store/nutrition-and-allergen';
import useConfig                            from '../../components/useConfig';

export default function NutritionAndAllergenPage(): JSX.Element {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    // Redux states
    const {contentful} = useSelector((state: any) => state.nutritionAllergen);

    useEffect(() => {
        if (_.isEmpty(contentful)) {
            dispatch(apiGetNutritionAllergenPageContent({config}));
        }
    }, [dispatch, contentful]);

    return (
        <Page>
            <Grid container spacing={5} sx={{m : 0}}>
                <Grid xs={12} sx={{p : 0}}>
                    <HeroBanner
                        title={contentful.title}
                        imageUrl={contentful.bannerImageUrl}
                        sx={{backgroundColor : contentful.bannerBackgroundColor}}
                    />
                </Grid>

                <Grid xs={12}>
                    {
                        _.isEmpty(contentful.disclaimer)
                            // Loading Skeleton
                            ? (
                                <Box
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    sx={{
                                        maxWidth : 'lg',
                                        mx       : 'auto',
                                        pt       : {xs : 1, lg : 3},
                                        pb       : 5
                                    }}
                                >
                                    <Skeleton variant={'text'} sx={{mb : 2, mx : 'auto', width : '40%'}}/>
                                    {_.times(5, (ii: number) => (
                                        <Box key={`skeleton-${ii}`}>
                                            <Skeleton variant={'text'}/>
                                            <Skeleton variant={'text'} sx={{mb : 1}}/>
                                        </Box>
                                    ))}
                                </Box>
                            )
                            : (
                                <Content
                                    title={contentful.disclaimer.title}
                                    body={contentful.disclaimer.body}
                                    downloadUrl={contentful.allergenGuideUrl}
                                    sx={{
                                        maxWidth : 'lg',
                                        width    : '100%',
                                        mx       : 'auto',
                                        pt       : {xs : 1, lg : 3},
                                        pb       : 5
                                    }}
                                />
                            )
                    }
                </Grid>
            </Grid>
        </Page>
    );
}
