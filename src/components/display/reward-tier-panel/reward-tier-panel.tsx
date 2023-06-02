import _                                 from 'lodash';
import React                             from 'react';
// import {useEffect}                       from 'react';
// import {useRef}                          from 'react';
// import {useState}                        from 'react';
import Grid                              from '@mui/material/Unstable_Grid2';
import {Swiper}                          from 'swiper/react';
import {SwiperSlide}                     from 'swiper/react';
import {Navigation}                      from 'swiper';
import {Pagination}                      from 'swiper';
import {Box}                             from '@mui/material';
import {Hidden}                          from '@mui/material';
import {Paper}                           from '@mui/material';
import {extractMediaFromContentfulMedia} from 'src/store/pages/pages';
import {IContentfulMedia}                from 'src/store/pages/pages';
import {guid}                            from 'src/utils/utils';
import {getJustification}                from 'src/views/content/drawSection';
import {fonts, rootStyles}               from 'src/shared/styles';
import paletteColors                     from 'src/theme/paletteColors';
import {documentToReactComponents}       from '@contentful/rich-text-react-renderer';

export interface IContentfulTierPanel
{
    title: string;
    justification: string;
    rewardTiles: IContentfulTierTile[];
}

export interface IContentfulTierTile
{
    title: string;
    description: any;
    headerIcon?: IContentfulMedia | null;
    benefit1?: IContentfulTierBenefit | null;
    benefit2?: IContentfulTierBenefit | null;
    benefit3?: IContentfulTierBenefit | null;
}

export interface IContentfulTierBenefit
{
    title: string;
    description: string;
    badge?: IContentfulMedia | null;
}

export function extractTierPanelFromContentful(fields: any): IContentfulTierPanel | null {
    return _.isEmpty(fields) ? null : {
        title         : fields.title || '',
        justification : fields.justification || '',
        rewardTiles   : (fields.rewardTiles || [])
            .map((rt: any) => extractTierTileFromContentful(rt?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractTierBenefitFromContentful(model: any): IContentfulTierBenefit | null {
    return _.isEmpty(model?.fields) ? null : {
        title       : model.fields.title || '',
        description : model.fields.description || '',
        badge       : extractMediaFromContentfulMedia(model.fields.badge)
    };
}

export function extractTierTileFromContentful(fields: any): IContentfulTierTile | null {
    return _.isEmpty(fields) ? null : {
        title       : fields.title || '',
        description : fields.description || '',
        headerIcon  : extractMediaFromContentfulMedia(fields.headerIcon),
        benefit1    : extractTierBenefitFromContentful(fields.benefit1),
        benefit2    : extractTierBenefitFromContentful(fields.benefit2),
        benefit3    : extractTierBenefitFromContentful(fields.benefit3)
    };
}

export default function DrawRewardTierPanel(props: { rewardTierPanel: IContentfulTierPanel }): React.ReactElement {
    const thisItem = props.rewardTierPanel;
    //console.log('rtp: ', thisItem);

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
            <Hidden smUp>
                <Swiper
                    key={guid()}
                    autoHeight={true}
                    direction={'horizontal'}
                    pagination={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {(thisItem?.rewardTiles || []).map((thisTile: any, iidx: number) => (
                        <SwiperSlide key={`ss-tile-${iidx}`}>
                            <DrawRewardTierTile rewardTierTile={thisTile}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Hidden>

            <Hidden smDown>
                {(thisItem?.rewardTiles || []).map((thisTile: any, iidx: number) => (
                    <DrawRewardTierTile key={`tile-${iidx}`} rewardTierTile={thisTile}/>
                ))}
            </Hidden>
        </Grid>
    );
}

export function getLinearStyle(id?: string | null): string {
    const defaultValue = 'rewardTileHeaderOrange';

    const values: Record<string, string> = {
        'ORANGE'   : 'rewardTileHeaderOrange',
        'GOLD'     : 'rewardTileHeaderYellow',
        'PLATINUM' : 'rewardTileHeaderBlack',
        'SILVER'   : 'rewardTileHeaderGrey'
    };

    return values[(id || '').toUpperCase()] || defaultValue;
}

export function DrawBenefitRow(props: { badgeUrl?: string; description: string; bottomBorder?: boolean; }): React.ReactElement {
    const {bottomBorder = true} = props;

    return (
        <Grid
            container
            width="100%"
            py={'8px'}
            sx={{borderBottom : bottomBorder ? `1px solid ${paletteColors.grey}` : ''}}
        >
            {' '}
            <Grid xs={2}>
                {props.badgeUrl && <img src={props.badgeUrl} alt="benefit 1 badge" height="40px"/>}
            </Grid>

            <Grid xs={10} pl={'4px'}>
                {props.description}
            </Grid>
        </Grid>
    );
}

export function DrawRewardTierTile(props: { rewardTierTile: IContentfulTierTile }): React.ReactElement {
    const thisItem = props.rewardTierTile;

    return (
        <Paper
            key={guid()}
            sx={{
                width        : {sm : '272px', xs : '240px'},
                minHeight    : {sm : '335px', xs : '100%'},
                margin       : '8px',
                marginTop    : '40px',
                padding      : '20px',
                paddingRight : '20px',
                paddingLeft  : '20px',
                borderRadius : '14px',
                ...fonts.matter,
                fontSize   : '12px',
                whiteSpace : 'break-spaces'
            }}
        >
            <Grid container width="100%" height="100%">
                {thisItem?.headerIcon && (
                    <Grid xs={12} sx={{justifyContent : 'center', display : 'flex', marginTop : '-50px'}}>
                        <img src={thisItem?.headerIcon?.file?.url} alt="tier 1 header badge" height="60px"/>
                    </Grid>
                )}

                <Grid
                    xs={12}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'start'}
                    sx={{fontWeight : '700', fontSize : '16px'}}
                >
                    Reward Tier
                </Grid>

                <Grid
                    xs={12}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'start'}
                    sx={{
                        ...fonts.portuguesa,
                        fontSize      : '40px',
                        fontWeight    : '700',
                        lineHeight    : 'normal',
                        textTransform : 'uppercase'
                    }}
                    className={getLinearStyle(thisItem?.title)}
                >
                    {thisItem?.title}
                </Grid>

                <Grid
                    xs={12}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'start'}
                    sx={{...fonts.matter, fontSize : '12px', whiteSpace : 'break-spaces'}}
                >
                    {documentToReactComponents(thisItem?.description)}
                </Grid>

                <Grid
                    xs={12}
                    pb={'8px'}
                    pt={0}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{borderBottom : `1px solid ${paletteColors.grey}`}}
                >
                    <Box
                        sx={{
                            ...fonts.portuguesaScript,
                            color      : paletteColors.red,
                            fontWeight : '400',
                            fontSize   : {xs : '30px'},
                            transform  : 'rotate(-10deg)'
                        }}
                    >
                        Benefits
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection="column"
                >
                    <DrawBenefitRow
                        badgeUrl={thisItem?.benefit1?.badge?.file?.url}
                        description={thisItem?.benefit1?.description || ''}
                    />

                    {thisItem?.benefit2 && (
                        <DrawBenefitRow
                            badgeUrl={thisItem?.benefit2?.badge?.file?.url}
                            description={thisItem?.benefit2?.description || ''}
                        />
                    )}

                    {thisItem?.benefit3 && (
                        <DrawBenefitRow
                            badgeUrl={thisItem?.benefit3?.badge?.file?.url}
                            description={thisItem?.benefit3?.description || ''}
                            bottomBorder={false}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}
