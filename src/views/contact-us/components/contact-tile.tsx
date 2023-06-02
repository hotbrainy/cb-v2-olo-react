import _                                   from 'lodash';
import React                               from 'react';
import {Theme}                             from '@emotion/react';
import {Box}                               from '@mui/material';
import {Paper}                             from '@mui/material';
import {Stack}                             from '@mui/material';
import {SxProps}                           from '@mui/material';
import {Typography}                        from '@mui/material';
import {useMediaQuery}                     from '@mui/material';
import Grid                                from '@mui/system/Unstable_Grid';
import {DrawCallToAction}                  from 'src/components/display/call-to-action/call-to-action';
import {extractCallToActionFromContentful} from 'src/components/display/call-to-action/call-to-action';
import {ICallToAction}                     from 'src/components/display/call-to-action/call-to-action';
import {rootStyles}                        from 'src/shared/styles';
import {extractMediaFromContentfulMedia}   from 'src/store/pages/pages';
import {IContentfulMedia}                  from 'src/store/pages/pages';
import theme                               from 'src/theme';
import paletteColors                       from 'src/theme/paletteColors';
import {guid}                              from 'src/utils/utils';

export interface IContentfulContactTileGroup
{
    name: string;
    contactTiles: IContentfulContactTile[];
}

interface IContentfulContactTile
{
    topImage?: IContentfulMedia | null;
    heading?: string;
    content?: string;
    callToAction?: ICallToAction[];
}

interface IContactTileProps
{
    contactTile: IContentfulContactTile;
    sx?: SxProps<Theme>;
}

export function extractContactTileGroupFromContentful(fields: any): IContentfulContactTileGroup | null {
    return _.isEmpty(fields) ? null : {
        name         : fields.name || '',
        contactTiles : (fields.contactTiles || [])
            .map((p: any) => extractContactTileFromContentful(p?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractContactTileFromContentful(fields: any): IContentfulContactTile | null {
    return _.isEmpty(fields) ? null : {
        topImage     : extractMediaFromContentfulMedia(fields.topImage),
        heading      : fields.heading,
        content      : fields.content,
        callToAction : (fields.callToAction?.fields?.buttons
                ? (fields.callToAction.fields.buttons || []).map((p: any) => extractCallToActionFromContentful(p?.fields))
                : [extractCallToActionFromContentful(fields.callToAction?.fields)]
        ).filter((p: any) => !_.isEmpty(p))
    };
}

export function DrawContactTileGroup(props: { contactTileGroup: IContentfulContactTileGroup }): React.ReactElement {
    const {contactTileGroup} = props;

    const thisItem      = contactTileGroup;
    const numberOfTiles = thisItem?.contactTiles.length;
    const gridWidth     = numberOfTiles ? Math.round(12 / numberOfTiles) : 12;
    const maxGridWidth  = 4; // 3 tiles wide

    return (
        <Grid
            key={guid()}
            container
            className="theme"
            width="100%"
            justifyContent={'center'}
            sx={{...rootStyles.swiper, cursor : 'pointer'}}
            spacing={2}
        >
            {(thisItem?.contactTiles || []).map((thisTile: any, iidx: number) => {
                return (
                    <Grid xs={12} py={{xs : '18px', sm : 0}} sm={Math.min(gridWidth, maxGridWidth)} key={guid()}>
                        <DrawContactTile contactTile={thisTile}/>
                    </Grid>
                );
            })}
        </Grid>
    );
}


function DrawContactTile(props: IContactTileProps): React.ReactElement {
    const {sx, contactTile} = props;

    const {heading, content, topImage, callToAction} = contactTile;

    const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Paper sx={sx}>
            <Grid container height="100%">
                <Grid xs={12} height="40%">
                    <Box
                        sx={{
                            backgroundColor    : paletteColors.lightGrey,
                            width              : '100%',
                            height             : '100%',
                            backgroundImage    : `url(${topImage?.file?.url || ''})`,
                            backgroundSize     : 'cover',
                            backgroundPosition : 'top'
                        }}
                    />
                </Grid>

                <Grid xs={12} p={2}>
                    <Typography textAlign={'center'} variant={smAndUp ? 'h4' : 'h3'}>
                        {heading}
                    </Typography>
                </Grid>

                <Grid xs={12} textAlign="center" p={2}>
                    <Box dangerouslySetInnerHTML={{__html : content || ''}}/>
                </Grid>

                <Grid xs={12} textAlign="center" p={2}>
                    <Stack justifyContent={'center'} direction={'row'} spacing={1}>
                        {callToAction?.map((cta, ii) => (
                            <DrawCallToAction
                                key={`cta-${ii}`}
                                callToAction={cta}
                                sx={{
                                    '& .MuiButtonBase-root' : {
                                        fontSize   : '16px',
                                        lineHeight : 'normal',
                                        width      : '165px !important',
                                        height     : '45px !important'
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default DrawContactTile;
