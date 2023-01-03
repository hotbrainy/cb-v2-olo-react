import React        from 'react';
import {Box}        from '@mui/material';
import {CardMedia}  from '@mui/material';
import {Typography} from '@mui/material';
import {Theme}      from '@mui/material/styles';
import {useTheme}   from '@mui/material/styles';
import {SxProps}    from '@mui/system';

interface IHeroBannerProps
{
    title?: string;
    imageUrl?: string;
    extraContent?: JSX.Element,
    sx?: SxProps<Theme>;
}

export default function HeroBanner(props: IHeroBannerProps): JSX.Element {
    const {title, imageUrl, extraContent, sx} = props;

    const hasTitle        = !!title;
    const hasImage        = !!imageUrl;
    const hasExtraContent = !!extraContent;

    const theme = useTheme();

    return (
        <>
            <Box sx={{position : 'relative', ...sx}}>
                {hasImage && (
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="promo-img"
                        sx={{
                            objectFit       : 'contain',
                            backgroundColor : sx?.backgroundColor || theme.palette.common.black,
                            height          : {sx : '231px', md : '100%'}
                        }}
                    />
                )}

                <Box
                    justifyContent={'center'}
                    sx={{
                        // Center x/y
                        position  : 'absolute',
                        top       : '50%',
                        left      : '50%',
                        transform : 'translate(-50%, -50%)',
                        // --
                        textAlign : 'center'
                    }}
                >
                    {hasTitle && (
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{
                                width : {xs : '100%', lg : 'auto'},

                                // Prevent highlighting of the text
                                userSelect : 'none'
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    {hasExtraContent && extraContent}
                </Box>
            </Box>
        </>
    );
}
