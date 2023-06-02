import _                                from 'lodash';
import React                            from 'react';
import {useRef}                         from 'react';
import {useState}                       from 'react';
import {Box}                            from '@mui/material';
import {Card}                           from '@mui/material';
import {CardActionArea}                 from '@mui/material';
import {CardActions}                    from '@mui/material';
import {CardMedia}                      from '@mui/material';
// import {IconButton}                from '@mui/material';
import {Paper}                          from '@mui/material';
import {Skeleton}                       from '@mui/material';
// import {Stack}                     from '@mui/material';
import {Typography}                     from '@mui/material';
// import {useMediaQuery}                  from '@mui/material';
import Grid                             from '@mui/material/Unstable_Grid2';
import {Theme}                          from '@mui/material/styles';
import {useTheme}                       from '@mui/material/styles';
import {SxProps}                        from '@mui/system';
import paletteColors                    from 'src/theme/paletteColors';
import PlayArrowIcon                    from '@mui/icons-material/PlayArrow';
import PauseIcon                        from '@mui/icons-material/Pause';
import {Swiper}                         from 'swiper/react';
import {SwiperSlide}                    from 'swiper/react';
import {Navigation}                     from 'swiper';
import {documentToReactComponents}      from '@contentful/rich-text-react-renderer';
import {guid}                           from 'src/utils/utils';
import {extractVideoCardFromContentful} from 'src/components/display/video-card/video-card';
import {IVideoCard}                     from 'src/components/display/video-card/video-card';

export interface IVideoGroup
{
    identifier: string;
    defaultItem: number;
    title: string;
    videos: IVideoCard[];
}

interface IVideoGroupProps
{
    selectedItem?: number;
    onSelectItem?: any;
    videoGroup: IVideoGroup;
    sx?: SxProps<Theme>;
}

interface IVideoSectionProps
{
    thisVideo: any;
}

export function extractVideoGroupFromContentful(fields: any): IVideoGroup | null {
    return _.isEmpty(fields) ? null : {
        identifier  : fields.identifier || '',
        title       : fields.title || '',
        defaultItem : fields.defaultItem || 0,
        videos      : (fields.videos || [])
            .map((vid: any) => extractVideoCardFromContentful(vid.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function VideoSection(props: IVideoSectionProps): React.ReactElement {
    const {thisVideo}               = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef                  = useRef(null);

    function playPause(shouldPlay: boolean): void {
        const theVideo = videoRef.current ? (videoRef.current as HTMLMediaElement) : null;
        if (theVideo) {
            shouldPlay ? theVideo.play() : theVideo.pause();
        }
    }

    return (
        <Card elevation={0} sx={{height : '100%', backgroundColor : 'transparent'}}>
            <CardMedia
                sx={{
                    borderRadius       : '12px',
                    backgroundImage    : `url(${thisVideo.image?.file?.url || ''})`,
                    backgroundSize     : 'cover',
                    backgroundPosition : 'top'
                }}
                component="video"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={() => playPause(!isPlaying)}
                ref={videoRef}
                src={thisVideo.video?.file?.url || ''}
            />
            <CardActionArea
                sx={{
                    position        : 'relative',
                    top             : {xs : '-138px', sm : '-220px'},
                    backgroundColor : isPlaying ? 'transparent' : paletteColors.lightGrey,
                    width           : 'auto',
                    borderRadius    : {xs : '30px', sm : '75px'},
                    left            : {xs : '155px', sm : '230px'}
                }}
            >
                <CardActions>
                    <Box
                        sx={{
                            display    : 'flex',
                            alignItems : 'center',
                            '& :hover' : {
                                color : isPlaying ? paletteColors.white : '',
                                fill  : isPlaying ? paletteColors.white : ''
                            }
                        }}
                    >
                        <Box
                            aria-label="pause"
                            sx={{display : isPlaying ? 'block' : 'none'}}
                            onClick={() => playPause(false)}
                        >
                            <PauseIcon
                                sx={{
                                    height     : {xs : 30, sm : 75},
                                    width      : {xs : 30, sm : 75},
                                    color      : 'transparent',
                                    fill       : 'transparent',
                                    '& :hover' : {
                                        color : 'currentColor',
                                        fill  : 'currentColor'
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            aria-label="pause"
                            onClick={() => playPause(true)}
                            sx={{display : isPlaying ? 'none' : 'block'}}
                        >
                            <PlayArrowIcon
                                sx={{
                                    height : {xs : 30, sm : 75},
                                    width  : {xs : 30, sm : 75},
                                    color  : !isPlaying ? paletteColors.white : 'transparent'
                                }}
                            />
                        </Box>
                    </Box>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default function VideoGroup(props: IVideoGroupProps): React.ReactElement {
    const {videoGroup, selectedItem, onSelectItem, sx} = props;

    const theme = useTheme();
    // const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

    const styles = {
        videoGroup : {
            display                        : 'flex',
            alignItems                     : 'center',
            '& .swiper'                    : {
                paddingTop : '10px',
                width      : '100%',
                display    : 'flex'
            },
            '& .swiper-wrapper'            : {
                display : 'flex'
            },
            '& .swiper-slide-active'       : {
                [theme.breakpoints.down('sm')] : {
                    display        : 'flex',
                    justifyContent : 'center'
                }
            },
            '& .swiper-button-next'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                fontWeight      : 700,
                height          : '48px',
                width           : '48px',
                borderRadius    : '50%'
            },
            '& .swiper-button-next::after' : {
                fontSize : '24px'
            },
            '& .swiper-button-prev'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                fontWeight      : 700,
                height          : '48px',
                width           : '48px',
                borderRadius    : '50%'
            },
            '& .swiper-button-prev::after' : {
                fontSize : '24px'
            }
        }
    };

    const thisVideo = videoGroup.videos[selectedItem || 0];

    return (
        <Paper elevation={0} key={guid(32)} sx={{backgroundColor : 'transparent', ...sx}}>
            <Grid container spacing={1}>
                <Grid
                    xs={12}
                    sm={6}
                    alignItems="center"
                    justifyContent={'center'}
                    height={{xs : '218px', sm : '332px'}}
                >
                    {thisVideo.video?.file
                        ? (<VideoSection thisVideo={thisVideo}/>)
                        : (<Skeleton variant="rounded" width={'100%'} height={'100%'}/>)
                    }
                </Grid>

                <Grid xs={12} sm={6} p={2} sx={{maxWidth : '97vw'}}>
                    {(videoGroup?.videos?.length > 1) && (
                        <Grid xs={12} sx={{...styles.videoGroup}}>
                            <Swiper
                                navigation={true}
                                pagination={false}
                                modules={[Navigation]}
                                slidesPerView={(videoGroup?.videos?.length > 2) ? 3 : 2}
                            >
                                {/* <Stack direction={"row"} spacing={2}> */}
                                {(videoGroup?.videos || []).map((vid, idx) => {
                                    return (
                                        <SwiperSlide key={`ss-${idx}`}>
                                            <Box
                                                key={`av-${idx}`}
                                                onClick={() => onSelectItem?.call(this, idx)}
                                                sx={{
                                                    '& img' : {
                                                        borderRadius : '35px',
                                                        borderWidth  : '5px',
                                                        borderStyle  : 'solid',
                                                        cursor       : 'pointer',
                                                        borderColor  : (selectedItem === idx)
                                                            ? paletteColors.lightGrey
                                                            : 'transparent'
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={vid.avatar?.file?.url || ''}
                                                    alt={vid.avatar?.title || ''}
                                                    height={60}
                                                    width={60}
                                                />
                                            </Box>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Grid>
                    )}

                    <Grid xs={12}>
                        {thisVideo.content.heading && <Typography variant="h4">{thisVideo.title}</Typography>}
                        {thisVideo.content.subheading && (
                            <Typography variant="h3">{thisVideo.content.subheading}</Typography>
                        )}
                        {thisVideo.content.content ? (
                            documentToReactComponents(thisVideo.content)
                        ) : (
                            <Grid container m={0} p={0} height={'100%'}>
                                <Grid xs={12} height={'25%'}>
                                    <Skeleton variant="rounded" width={'100%'} height={'100%'}/>
                                </Grid>
                                <Grid xs={12} height={'75%'}>
                                    <Skeleton variant="rounded" width={'100%'} height="100%"/>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
