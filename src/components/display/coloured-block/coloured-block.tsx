import _                           from 'lodash';
import React                       from 'react';
import Grid                        from '@mui/system/Unstable_Grid';
import {SxProps}                   from '@mui/material';
import {fonts}                     from 'src/shared/styles';
import {guid}                      from 'src/utils/utils';
import DrawSection                 from 'src/views/content/drawSection';
import {interSectionGap}           from 'src/views/content/drawSection';
import {extractFileFromContentful} from 'src/store/pages/pages';
import {getSection}                from 'src/store/pages/pages';
import {IMediaElement}             from 'src/store/pages/pages';

export interface IContentfulColouredBlock
{
    title: string;
    textColour?: string;
    includeMargins: boolean;
    backgroundImage?: IMediaElement | null;
    content: any[];
}

export function extractColouredBlockFromContentful(fields: any): IContentfulColouredBlock | null {
    return _.isEmpty(fields) ? null : {
        title           : fields.title || '',
        backgroundImage : extractFileFromContentful(fields.backgroundImage?.fields?.file),
        textColour      : fields.textColour,
        includeMargins  : fields.includeMargins || false,
        content         : (fields.content || [])
            .map((p: any) => getSection(p?.sys?.contentType?.sys?.id, p))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function DrawColouredBlock(props: { colouredBlock: IContentfulColouredBlock; sxProps?: SxProps }): React.ReactElement {
    const thisItem = props.colouredBlock;

    return (
        <Grid
            key={guid()}
            container
            width={'100vw'}
            sx={{
                cursor          : 'pointer',
                backgroundImage : `url(${thisItem?.backgroundImage?.url})`,
                minHeight       : thisItem?.backgroundImage?.details?.image?.height,
                color           : thisItem?.textColour ? `${thisItem.textColour} !important` : 'inherit'
            }}
            my={thisItem?.includeMargins ? 2 : 0}
            justifyContent={'center'}
        >
            {(thisItem?.content || []).map((con: any, ii: number) => (
                <Grid className="theme" xs={12} mt={interSectionGap} key={`section-${ii}`} sx={{...fonts.matter}}>
                    <DrawSection
                        section={con}
                        sx={{color : thisItem?.textColour || undefined}}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
