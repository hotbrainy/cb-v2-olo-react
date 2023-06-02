import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Paper}                     from '@mui/material';
import Grid                        from '@mui/system/Unstable_Grid';
import React                       from 'react';
import { settings } from 'src/shared/config-settings';
import {rootStyles}                from 'src/shared/styles';
import paletteColors               from 'src/theme/paletteColors';
import {guid}                      from 'src/utils/utils';

export interface IContentfulRoleGroup
{
    name: string;
    roleTiles: IContentfulRoleTile[];
}

export interface IContentfulRoleTile
{
    backgroundColor: string;
    textColor: string;
    displayContent: boolean;
    displayTitle: boolean;
    linkUrl: string;
    title: string;
    content: any;
    fontFamily: string;
}

export const extractRoleGroupFromContentful = (fields: any): IContentfulRoleGroup => {
    const retVal = {
        name      : fields.identifier,
        roleTiles : fields.roleBlocks.map((rt: any) => extractRoleTileFromContentful(rt.fields))
    };
    return retVal;
};

export const extractRoleTileFromContentful = (fields: any): IContentfulRoleTile => {
    const retVal = {
        content         : fields.content,
        backgroundColor : fields.backgroundColor,
        textColor       : fields.textColor,
        displayContent  : fields.displayContent,
        displayTitle    : fields.displayTitle,
        linkUrl         : fields.linkUrl,
        title           : fields.title,
        fontFamily      : fields.fontFamily
    };
    return retVal;
};

export const DrawRoleGroup = (props: { roleGroup: IContentfulRoleGroup }) => {
    const {roleGroup} = props;
    const thisItem        = roleGroup;
    const numberOfTiles   = thisItem.roleTiles.length;
    const gridWidth       = Math.round(12 / numberOfTiles);
    const maxGridWidth    = 4; // 3 tiles wide
    console.log("ltg: ", roleGroup);
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
            {thisItem.roleTiles.map((thisTile: any, iidx: number) => {
                return (
                    <Grid xs={12} sm={gridWidth > maxGridWidth ? gridWidth : maxGridWidth} key={`tile-${iidx}`}>
                        <DrawRoleTile roleTile={thisTile}/>
                    </Grid>
                );
            })}
        </Grid>
    );
};

const jumpTo = (url: string) => {
    window.location.href = url;
};

export const DrawRoleTile = (props: { roleTile: IContentfulRoleTile }) => {
    const thisItem        = props.roleTile;
    const title           = thisItem.title;
    const displayContent  = thisItem.displayContent;
    const displayTitle    = thisItem.displayTitle;
    const linkUrl         = thisItem.linkUrl;
    const textColor       = thisItem.textColor;
    const backgroundColor = thisItem.backgroundColor;
    const content         = documentToReactComponents(thisItem.content);
    const fontFamily      = thisItem.fontFamily;
    return (
        <Paper
            key={guid()}
            sx={{
                minHeight       : {sm : '336px', xs : '200px'},
                backgroundColor : backgroundColor || paletteColors.white,
                color           : textColor || paletteColors.black,
                borderRadius    : '12px',
                margin          : '8px',
                fontSize        : {xs : '34px', sm : '48px'},
                lineHeight      : "normal",
                padding         : 0,
                display         : 'flex',
                alignItems      : 'center',
                justifyContent  : 'flex-end',
                fontFamily      : fontFamily,
                flexDirection   : "column",
            }}
            onClick={() => jumpTo(linkUrl)}
        ><Grid container width="100%" sx={{backgroundColor:"white", paddingLeft:"15px", paddingBottom:"5px", borderBottomLeftRadius: settings.borderRadius, borderBottomRightRadius: settings.borderRadius}}>
            {displayTitle && (<Grid xs={12} width={"100%"}>
                {title}
            </Grid>)}
            {displayContent && (<Grid xs={12} className="scrollbarThin" sx={{height:"150px", overflowY:"scroll",backgroundColor:"white",fontFamily:"Matter", fontSize:"20px", justifyContent:"center", fontWeight:"400"}} width={"100%"}>
                {content}
            </Grid>)}
        </Grid>
        </Paper>
    );
};
