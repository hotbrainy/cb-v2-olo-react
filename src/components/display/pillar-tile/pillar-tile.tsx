import _ 									from "lodash";
import React 								from "react";

import { documentToReactComponents } 		from "@contentful/rich-text-react-renderer";

import Grid									from '@mui/material/Unstable_Grid2';
import { Box, Paper, useMediaQuery } 		from "@mui/material";

import {Swiper, SwiperSlide}				from 'swiper/react';
import {Navigation, Pagination}				from 'swiper';

import greyPatch							from "src/assets/images/Background Images/greyPatch.png";
import { fonts } 							from "src/shared/styles";
import paletteColors 						from "src/theme/paletteColors";
import { guid } 							from "src/utils/utils";

import { extractMediaFromContentfulMedia } 	from "src/store/pages/pages";
import { IContentfulMedia } 				from "src/store/pages/pages";
// import DrawSection							from "src/views/content/drawSection";
import { getJustification } 				from "src/views/content/drawSection";
import theme from "src/theme";
import { settings } from "src/shared/config-settings";

export interface IPillarTileGroup
{
    name						: string;
    justification				: string;
    displayBorders				: boolean;
    pillarTiles					: IPillarTile[];
}

export interface IPillarTile
{
    heading						: string;
    content						: any;
    badge?						: IContentfulMedia | null;
    contentJustification		: string;
    headingJustification		: string;
    includeGreyCircleBackground	: boolean;
    widthOverride				: string;
}

export function extractPillarTileGroupFromContentful(fields: any): IPillarTileGroup | null {
    return _.isEmpty(fields) ? null : {
        name           : fields.name || '',
        justification  : fields.justification || '',
        displayBorders : fields.displayBorders || false,
        pillarTiles    : (fields.pillarTiles || [])
            .map((rt: any) => extractPillarTileFromContentful(rt?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractPillarTileFromContentful(fields: any): IPillarTile | null {
    return _.isEmpty(fields) ? null : {
        heading                     : fields.heading || '',
        content                     : fields.content,
        badge                       : extractMediaFromContentfulMedia(fields.badge),
        includeGreyCircleBackground : fields.includeGreyCircleBackground || false,
        contentJustification        : fields.contentJustification || '',
        headingJustification        : fields.headingJustification || '',
        widthOverride               : fields.widthOverride || ''
    };
}

export function DrawPillarTileGroup(props:{pillarTileGroup:IPillarTileGroup}) {
	const {pillarTileGroup} = props;
	const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	
	const styles          = {
        swiper              : {
            display                        : 'flex',
            width                          : '100%',
            '& .swiper-wrapper'            : {
                width : {sm : '100vw'}
            },
            '& .swiper-slide'              : {
                display        : 'flex',
                justifyContent : 'center'
            },
            '& .swiper-button-next'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                height          : '40px',
                width           : '40px',
                borderRadius    : '50%'
            },
            '& .swiper-button-next::after' : {
                fontSize : '20px'
            },
            '& .swiper-button-prev'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                height          : '40px',
                width           : '40px',
                borderRadius    : '50%'
            },
            '& .swiper-button-prev::after' : {
                fontSize : '20px'
            }
        }
    };

	return (
		<Grid
			key={guid()}
			container
			width="100%"
			className="theme"
			justifyContent={'center'}
			sx={{...styles.swiper}}
		>
			<Swiper
				key={guid()}
				direction={'horizontal'}
				centerInsufficientSlides={true}
				pagination={true}
				navigation={true}
				modules={[Pagination, Navigation]}
				slidesPerView={1}
				breakpoints={{
					600  : {
						slidesPerView : 2
					},
					900  : {
						slidesPerView : 3
					},
					1400 : {
						slidesPerView : 4
					}
				}}
			>
				{pillarTileGroup.pillarTiles.map((thisTile: any, iidx: number) => {
					return (
						<SwiperSlide style={{width : `${thisTile.widthOverride} !important`}} key={`ss-${iidx}`}>
							<DrawPillarTile pillarTile={thisTile} displayBorders={pillarTileGroup.displayBorders} />
							{/* <DrawSection
								section={{
									contentTypeId : 'ctPillarTile',
									pillarTile    : {...thisTile, displayBorders : pillarTileGroup.displayBorders}
								}}
							/> */}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Grid>
	);
}

export function DrawPillarTile(props:{pillarTile:IPillarTile, displayBorders?:boolean}) {
	const{pillarTile,displayBorders} 	= props
	const title      					= pillarTile.heading;
	return ( <Paper
		key={guid()}
		elevation={displayBorders ? 1 : 0}
		sx={{
			backgroundColor : displayBorders ? paletteColors.white : 'transparent',
			width           : {xs : pillarTile.widthOverride || '272px'},
			minHeight       : {sm : '348px', xs : '300px'},
			margin          : '8px',
			borderRadius    : settings.borderRadius,
			fontSize        : '12px'
		}}
	>
		<Grid container width="100%" height="100%">
			<Grid
				xs={12}
				display={'flex'}
				alignItems="center"
				justifyContent={'center'}
				sx={{padding : '12px', height : '168px', flexGrow : 1}}
			>
				<Box
					sx={{
						backgroundColor    : pillarTile.includeGreyCircleBackground
							? paletteColors.lightGrey
							: 'transparent',
						backgroundImage    : `url("${pillarTile.badge?.file?.url || greyPatch}")`,
						backgroundSize     : 'contain',
						backgroundRepeat   : 'no-repeat',
						backgroundPosition : 'center',
						height             : '144px',
						width              : '144px',
						borderRadius       : pillarTile.includeGreyCircleBackground ? '50%' : '',
						boxShadow          : pillarTile.includeGreyCircleBackground
							? `0 4px 8px 2px rgba(0, 0, 0, 0.4)`
							: ''
					}}
				></Box>
			</Grid>
			<Grid
				xs={12}
				display="flex"
				justifyContent={'center'}
				alignItems={'start'}
				sx={{
					...fonts.ceraBlack,
					fontSize    : {xs : '24px', sm : '32px'},
					lineHeight  : {xs : '26px', sm : '34px'},
					minHeight   : '40px',
					paddingLeft : '8px',
					textAlign   : getJustification(pillarTile.headingJustification)
				}}
			>
				{title}
			</Grid>
			<Grid
				xs={12}
				display="flex"
				justifyContent={'start'}
				alignItems={'start'}
				flexDirection={'column'}
				px={'12px'}
				sx={{
					height : '100%',
					...fonts.ceraPro,
					fontSize   : '16px',
					lineHeight : '18px',
					textAlign  : getJustification(pillarTile.contentJustification || 'left'),
					whiteSpace : 'break-spaces',
					'& p'      : {
						marginBlockStart : '8px',
						marginBlockEnd   : '8px'
					},
					'& ul'     : {
						marginBlockStart : 0,
						marginBlockEnd   : 0,
						'& li'           : {
							marginBlockStart : 0,
							marginBlockEnd   : 0
						}
					}
				}}
			>
				{documentToReactComponents(pillarTile.content)}
			</Grid>
		</Grid>
	</Paper>
		);
}