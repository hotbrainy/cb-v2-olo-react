import _                                   from 'lodash';
import React                               from 'react';
import {Theme}                             from '@emotion/react';
import Grid                                from '@mui/material/Unstable_Grid2';
import {Box}                               from '@mui/material';
import {Paper}                             from '@mui/material';
import {Stack}                             from '@mui/material';
import {SxProps}                           from '@mui/material';
import {Typography}                        from '@mui/material';
import {useMediaQuery}                     from '@mui/material';
import StandaloneButton                    from 'src/components/buttons/standalone-button';
import {extractMediaFromContentfulMedia}   from 'src/store/pages/pages';
import {IContentfulMedia}                  from 'src/store/pages/pages';
import theme                               from 'src/theme';
// import {DrawCallToAction}                  from '../call-to-action/call-to-action';
import {extractCallToActionFromContentful} from '../call-to-action/call-to-action';
import {ICallToAction}                     from '../call-to-action/call-to-action';
import greyPatch                           from 'src/assets/images/Background Images/greyPatch.png';
import {documentToReactComponents}         from '@contentful/rich-text-react-renderer';
import paletteColors                       from 'src/theme/paletteColors';

import {jumpTo} from 'src/views/content/drawSection';

export interface IJobTile
{
    name: string;
    image?: IContentfulMedia | null;
    role?: string;
    description?: any;
    url?: string;
    callToAction?: ICallToAction[];
}

export interface IJobTileGroup
{
    name?: string;
    jobTiles: IJobTile[];
    headingColour?: string;
}

export function extractJobTileGroupFromContentful(fields: any): IJobTileGroup | null {
    return _.isEmpty(fields) ? null : {
        name          : fields.title,
        headingColour : fields.headingColour,
        jobTiles      : (fields.jobTiles || [])
            .map((p: any) => extractJobTileFromContentful(p?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractJobTileFromContentful(fields: any): IJobTile | null {
    return _.isEmpty(fields) ? null : {
        name         : fields.title || '',
        image        : extractMediaFromContentfulMedia(fields.image),
        role         : fields.role,
        description  : fields.description,
        url          : fields.role,
        callToAction : (fields.callToAction || [])
            .map((p: any) => extractCallToActionFromContentful(p?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

interface JobTileProps
{
    job: IJobTile;
    sx?: SxProps<Theme>;
}

function DrawJobTile(props: JobTileProps): React.ReactElement {
    const {sx, job}                                     = props;
    const {role, description, image, callToAction, url} = job;
    const smAndUp                                       = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box onClick={() => jumpTo(url, true)}>
            <Paper sx={{height : '400px', width : '97%', cursor : 'pointer', ...sx}}>
                <Grid container height="100%">
                    <Grid xs={12} flexGrow={0}>
                        <Box
                            sx={{
                                backgroundColor    : paletteColors.lightGrey,
                                width              : '100%',
                                height             : '150px',
                                backgroundImage    : `url(${image?.file?.url || greyPatch})`,
                                backgroundSize     : 'cover',
                                backgroundPosition : 'top'
                            }}
                        />
                    </Grid>

                    <Grid
                        xs={12}
                        p={0}
                        maxHeight="48px"
                        minHeight="60px"
                        display="flex"
                        justifyContent="center"
                    >
                        <Typography textAlign={'center'} variant={smAndUp ? 'h4' : 'h3'}>
                            {role}
                        </Typography>
                    </Grid>

                    <Grid xs={12} textAlign="center" px={2} height="187px" overflow="hidden" flexGrow={1}>
                        {description && documentToReactComponents(description)}
                    </Grid>

                    {callToAction && (
                        <Grid xs={12} textAlign="center" p={2}>
                            <Stack justifyContent={'center'} direction={'row'} spacing={1}>
                                {callToAction?.map((cta, ii) => {
                                    const buttonJump = () => cta?.linkUrl && (window.location.href = cta.linkUrl);
                                    return (
                                        <StandaloneButton
                                            key={`btn-${ii}`}
                                            variant="mediumContained"
                                            buttonText={cta.buttonText || ''}
                                            buttonColor={cta.buttonColor || undefined}
                                            buttonTextColor={cta.buttonTextColor || undefined}
                                            buttonClick={buttonJump}
                                            sx={{fontSize : '17px !important', ...cta.sx}}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Box>
    );
};

export default DrawJobTile;
