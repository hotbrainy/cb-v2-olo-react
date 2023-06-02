import _           from 'lodash';
import * as React  from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid       from '@mui/material/Unstable_Grid2';
import {Skeleton} from '@mui/material';
import {useTheme} from '@mui/material/styles';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';
import AllFaqs    from '../../components/faqs';

import {useSelector}           from 'react-redux';
import {useAppDispatch}        from '../../store';
import {apiGetFaqsPageContent} from '../../store/faqs';
import useConfig               from '../../components/useConfig';


export default function FaqsPage(): JSX.Element {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    // Redux states
    const {contentful} = useSelector((state: any) => state.faqs);

    useEffect(() => {
        if (_.isEmpty(contentful)) {
            dispatch(apiGetFaqsPageContent({config}));
        }
    }, [dispatch, contentful]);

    return (
        <Page>
            <Grid container spacing={5} sx={{m : 0}} justifyContent="center">
                <Grid xs={12} sx={{p : 0}}>
                    <HeroBanner
                        title={contentful.title}
                        imageUrl={contentful.bannerImageUrl}
                        sx={{backgroundColor : contentful.bannerBackgroundColor}}
                    />
                </Grid>

                <Grid maxWidth="lg" xs={12} sx={{px : 0, pt : 0, pb : 10}}>
                    {
                        _.isEmpty(contentful.faqs)
                            // Loading Skeleton
                            ? (<Skeleton variant={'rectangular'} width={'100%'} height={300}/>)
                            : (<AllFaqs items={contentful.faqs} sx={{width : '100%'}}/>)
                    }
                </Grid>
            </Grid>
        </Page>
    );
}
