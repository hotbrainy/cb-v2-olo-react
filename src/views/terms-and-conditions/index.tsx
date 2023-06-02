import _           from 'lodash';
import * as React  from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid         from '@mui/material/Unstable_Grid2';
import {Box}        from '@mui/material';
import {Skeleton}   from '@mui/material';
import {Typography} from '@mui/material';

import {useTheme} from '@mui/material/styles';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

import {useSelector}                      from 'react-redux';
import {useAppDispatch}                   from '../../store';
import {apiGetTermsConditionsPageContent} from '../../store/terms-and-conditions';
import useConfig                          from '../../components/useConfig';
import {documentToReactComponents}        from '@contentful/rich-text-react-renderer';

export default function TermsAndConditionsPage(): JSX.Element {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    // Redux states
    const {contentful} = useSelector((state: any) => state.termsConditions);

    useEffect(() => {
        if (_.isEmpty(contentful)) {
            dispatch(apiGetTermsConditionsPageContent({config}));
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

                <Grid maxWidth="lg" xs={12} sx={{mx : 'auto', mb : 10}}>
                    {
                        _.isEmpty(contentful.body)
                            // Loading Skeleton
                            ? (
                                <Box
                                    sx={{
                                        maxWidth : 'lg',
                                        mx       : 'auto',
                                        pt       : {xs : 1, lg : 3},
                                        pb       : 5
                                    }}
                                >
                                    {_.times(5, (ii: number) => (
                                        <Box key={`skeleton-${ii}`}>
                                            <Skeleton variant={'text'}/>
                                            <Skeleton variant={'text'} sx={{mb : 1}}/>
                                        </Box>
                                    ))}
                                </Box>
                            )
                            : (
                                <Typography
                                    variant={'subtitle1'}
                                    gutterBottom
                                    sx={{
                                        fontSize   : '14px',
                                        lineHeight : '20px',
                                        mb         : 2
                                    }}
                                >
                                    {documentToReactComponents(contentful.body)}
                                </Typography>
                            )
                    }
                </Grid>
            </Grid>
        </Page>
    );
}
