import _                           from 'lodash';
import React                       from 'react';
import Grid                        from '@mui/system/Unstable_Grid';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Box}                       from '@mui/material';
import {Paper}                     from '@mui/material';
import {SxProps}                   from '@mui/material';
import {fonts, rootStyles}         from 'src/shared/styles';
// import paletteColors               from 'src/theme/paletteColors';
import {guid}                      from 'src/utils/utils';
import {Swiper}                    from 'swiper/react';
import {SwiperSlide}               from 'swiper/react';
import {Navigation}                from 'swiper';
import {Pagination}                from 'swiper';
import {getJustification}          from 'src/views/content/drawSection';
import {extractFileFromContentful} from 'src/store/pages/pages';
import {IMediaElement}             from 'src/store/pages/pages';
// import {FileDownloadSharp}         from '@mui/icons-material';
// import {months}                    from 'moment';

export interface IContentfulWhatsNewTileGroup
{
    name: string;
    justification: string;
    whatsNewTiles: IContentfulWhatsNewTile[];
}

export interface IContentfulWhatsNewTile
{
    name: string;
    linkUrl: string;
    image?: IMediaElement | null;
    content: any;
    dateToDisplay: string;
    startDate: Date;
    endDate: Date;
    showExpiresIn?: boolean;
}

function getMonthAsText(monthString: string): string {
    const monthId = parseInt(monthString, 10);
    const date    = new Date();
    date.setMonth(monthId - 1);

    return date.toLocaleString('en-AU', {month : 'short'});
}

function daysBetween(firstDate: Date, secondDate: Date): number {
    const oneDay   = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs(((+firstDate) - (+secondDate)) / oneDay));
    return diffDays;
}

/** expecting dte as YYYY-MM-DD */
function DisplayDate(props: { dte: string, sx?: SxProps, expiresIn?: boolean }): React.ReactElement {
    const {dte, expiresIn, sx} = props;

    if (!(dte || '').includes('-')) {
        return <></>;
    }

    let retVal;
    if (expiresIn) {
        // how many days till expiry
        const daysTill = daysBetween(new Date(), new Date(dte));
        retVal         = (daysTill > 0)
            ? `Expires in ${daysTill} days`
            : ((daysTill <= 0) ? 'Expired' : 'Expires Today')
        ;
    }
    else {
        const [year, monthString, dayString] = dte.split('-');
        retVal                               = `${dayString} ${getMonthAsText(monthString)} ${year}`;
    }

    return (
        <Box sx={{fontWeight : 700, ...sx}}>
            {retVal}
        </Box>
    );
}

export function extractWhatsNewTileGroupFromContentful(fields: any): IContentfulWhatsNewTileGroup | null {
    return _.isEmpty(fields) ? null : {
        name          : fields.name || '',
        justification : fields.justification || '',
        whatsNewTiles : (fields.whatsNewTiles || [])
            .map((rt: any) => extractWhatsNewTileFromContentful(rt?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractWhatsNewTileFromContentful(fields: any): IContentfulWhatsNewTile | null {
    return _.isEmpty(fields) ? null : {
        name          : fields.name || '',
        linkUrl       : fields.name || '',
        content       : fields.content,
        image         : extractFileFromContentful(fields.image?.fields?.file),
        dateToDisplay : fields.date || '',
        startDate     : fields.startDate,
        endDate       : fields.endDate,
        showExpiresIn : fields.showExpiresIn || false
    };
}

export function DrawWhatsNewTileGroup(props: { whatsNewTileGroup: IContentfulWhatsNewTileGroup; }): React.ReactElement {
    const thisItem = props.whatsNewTileGroup;

    return (
        <Grid
            key={guid()}
            container
            className="theme"
            width="100%"
            display="flex"
            justifyContent={getJustification(thisItem?.justification || '')}
            sx={{...rootStyles.swiper}}
        >
            <Swiper
                key={guid()}
                direction={'horizontal'}
                pagination={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                centerInsufficientSlides={true}
                breakpoints={{
                    600  : {slidesPerView : 2},
                    900  : {slidesPerView : 3},
                    1400 : {slidesPerView : 4}
                }}
            >
                {(thisItem?.whatsNewTiles || [])
                    .filter((thisTile: any) => {
                        if (_.isEmpty(thisTile)) {
                            return false;
                        }
                        const today     = new Date();
                        const startDate = new Date(thisTile.startDate);
                        const endDate   = new Date(thisTile.endDate);
                        const expired   = endDate.getTime() < today.getTime();
                        const future    = startDate.getTime() > today.getTime();
                        return (!expired && !future);
                    })
                    .map((thisTile: any, iidx: number) => (
                        <SwiperSlide key={`wn-tile-${iidx}`}>
                            <DrawWhatsNewTile whatsNewTile={thisTile}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Grid>
    );
}

export function DrawWhatsNewTile(props: { whatsNewTile: IContentfulWhatsNewTile }): React.ReactElement {
    const thisItem = props.whatsNewTile;

    return (
        <Paper
            key={guid()}
            sx={{
                width        : {xs : '330px'},
                minHeight    : {sm : '348px', xs : '300px'},
                margin       : '8px',
                borderRadius : '14px',
                ...fonts.matter,
                fontSize           : '12px',
                backgroundImage    : `url(${thisItem?.image?.url || ''})`,
                backgroundPosition : 'top',
                backgroundRepeat   : 'no-repeat',
                backgroundSize     : 'contain',
                display            : 'flex',
                alignItems         : 'end'
            }}
        >
            <Grid container width="100%" height="100%">
                <Grid
                    xs={12}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'end'}
                    sx={{...fonts.portuguesa}}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            width                   : '100%',
                            height                  : '50%',
                            fontFamily              : 'Matter',
                            fontStyle               : 'normal',
                            fontWeight              : '400',
                            fontSize                : '20px',
                            lineHeight              : '24px',
                            borderBottomLeftRadius  : '14px',
                            borderBottomRightRadius : '14px',
                            padding                 : '20px',
                            whiteSpace              : 'break-spaces',
                            '& p'                   : {
                                marginTop    : '8px',
                                marginBottom : '8px'
                            },
                            '& h6'                  : {
                                ...fonts.portuguesa,
                                fontSize     : '18px',
                                marginTop    : 0,
                                marginBottom : 0
                            }
                        }}
                    >
                        {documentToReactComponents(thisItem?.content)}
                    </Paper>

                    <Box
                        sx={{
                            ...fonts.matter,
                            position : 'absolute',
                            left     : '55px',
                            bottom   : '20px',
                            fontSize : '12px'
                        }}
                    >
                        <DisplayDate
                            dte={thisItem?.dateToDisplay}
                            expiresIn={thisItem?.showExpiresIn}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
