import _                                 from 'lodash';
import React                             from 'react';
import Grid                              from '@mui/system/Unstable_Grid';
import {guid}                            from 'src/utils/utils';
import {extractMediaFromContentfulMedia} from 'src/store/pages/pages';
import {IContentfulMedia}                from 'src/store/pages/pages';
import {jumpTo}                          from 'src/views/content/drawSection';
import {Paper}                           from '@mui/material';
import {SxProps}                         from '@mui/material';
import {Theme}                           from '@mui/material';
import {useMediaQuery}                   from '@mui/material';
import theme                             from 'src/theme';
import StandaloneButton                  from 'src/components/buttons/standalone-button';
import {Swiper}                          from 'swiper/react';
import {SwiperSlide}                     from 'swiper/react';
import {Navigation}                      from 'swiper';
import paletteColors                     from 'src/theme/paletteColors';

export interface ICallToActionGroup
{
    title: string;
    buttons: ICallToAction[];
    horizontalAlignment?: string;
    verticalOffset?: number;
    width?: string;
    justification?: string;
}

export interface ICallToAction
{
    buttonText?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    buttonWidth?: string;
    buttonHeight?: string;
    linkUrl?: string;
    buttonImage?: IContentfulMedia | null;
    verticalOffset?: number;
    sx?: SxProps;
}

export function extractCallToActionGroupFromContentful(fields: any): ICallToActionGroup | null {
    return _.isEmpty(fields) ? null : {
        title               : fields.title || '',
        horizontalAlignment : fields.horizontalAlignment,
        verticalOffset      : fields.verticalOffset,
        width               : fields.width,
        justification       : fields.justification,
        buttons             : (fields.buttons || [])
            .map((p: any) => extractCallToActionFromContentful(p?.fields))
            .filter((p: any) => !_.isEmpty(p))

    };
}

export function extractCallToActionFromContentful(fields: any): ICallToAction | null {
    return _.isEmpty(fields) ? null : {
        buttonText      : fields.buttonText,
        buttonColor     : fields.buttonColor,
        buttonTextColor : fields.buttonTextColor,
        buttonWidth     : fields.buttonWidth,
        buttonHeight    : fields.buttonHeight,
        linkUrl         : fields.linkUrl,
        verticalOffset  : fields.verticalOffset,
        buttonImage     : extractMediaFromContentfulMedia(fields.buttonImage)
    };
}

interface ICallToActionProps
{
    callToAction: ICallToAction;
    href?: string;
    onclick?: any;
    sx?: any; //SxProps<Theme>;
    maxButtonWidth?: number;
}

interface ICallToActionGroupProps
{
    callToActionGroup: ICallToActionGroup;
    sx?: SxProps;
}

export function DrawCallToActionGroup(props: ICallToActionGroupProps): React.ReactElement {
    const {callToActionGroup/*, sx*/} = props;

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const styles = {
        ctaGroup : {
            display                        : 'flex',
            alignItems                     : 'center',
            padding                        : 0,
            '& .swiper'                    : {
                width   : '100%',
                display : 'flex'
            },
            '& .swiper-wrapper'            : {
                display        : 'flex',
                justifyContent : callToActionGroup?.horizontalAlignment || 'center'
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
        },
        wrapper  : {
            position        : 'absolute',
            marginTop       : callToActionGroup.verticalOffset ? `${callToActionGroup.verticalOffset}px` : 0,
            padding         : 0,
            width           : '100%',
            backgroundColor : 'transparent'
        }
    };

    return <Paper elevation={0} key={guid(32)} className="WTF" sx={{...styles.wrapper}}>
        <Grid container spacing={1} width="100%">
            <Grid xs={12} p={0}>
                {((callToActionGroup.buttons || []).length > 0) && (
                    <Grid xs={12} width="100%" sx={{...styles.ctaGroup}}>
                        <Swiper
                            navigation={true}
                            pagination={false}
                            modules={[Navigation]}
                            slidesPerView={isDesktop ? 4 : 2}
                        >
                            {/* <Stack direction={"row"} spacing={2}> */}
                            {(callToActionGroup?.buttons || []).map((cta: ICallToAction, idx: number) => (
                                <SwiperSlide key={`ss-${idx}`}>
                                    <DrawCallToAction callToAction={cta}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Grid>
                )}
            </Grid>
        </Grid>
    </Paper>;
}

export function DrawCallToAction(props: ICallToActionProps): React.ReactElement {
    const thisItem = props.callToAction;

    const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

    const offsetY = thisItem?.verticalOffset
        ? (
            smAndUp
                ? `${thisItem.verticalOffset}px`
                : `${thisItem.verticalOffset + 5}px`
        )
        : '0px'
    ;

    return (
        <Grid
            key={guid()}
            container width={'100%'}
            onClick={() => jumpTo(thisItem?.linkUrl)}
            sx={{
                zIndex         : 10,
                justifyContent : 'center',
                cursor         : 'pointer',
                marginTop      : offsetY,
                ...thisItem?.sx,
                ...props.sx
        }}
        >
            <StandaloneButton
                buttonText={thisItem?.buttonText || ''}
                buttonTextColor={thisItem?.buttonTextColor}
                buttonColor={thisItem?.buttonColor}
                backgroundImage={thisItem?.buttonImage?.file?.url}
                buttonClick={() => jumpTo(thisItem?.linkUrl)}
                maxButtonWidth={props.maxButtonWidth}
            />
        </Grid>
    );
}
