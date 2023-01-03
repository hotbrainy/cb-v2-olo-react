import React                       from 'react';
import {CardMedia}                 from '@mui/material';
import {Stack}                     from '@mui/material';
import {Typography}                from '@mui/material';
import {Theme}                     from '@mui/material/styles';
import {SxProps}                   from '@mui/system';
import useConfig                   from '../../../components/useConfig';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

interface ICateringOrderInfoItemProps
{
    title: string;
    body: any;
    imageUrl: string;
    sx?: SxProps<Theme>;
}

export default function CateringOrderInfoItem(props: ICateringOrderInfoItemProps): JSX.Element {
    const {imageUrl, sx} = props;
    const config         = useConfig();

    const isWebUrl = (imageUrl || '').startsWith('http') || (imageUrl || '').startsWith('//');
    const image    = (isWebUrl)
        ? imageUrl
        : `${config.app.PUBLIC_URL}/assets/images/figma/icons/${imageUrl}`
    ;

    return (
        <>
            <Stack
                direction="column"
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{...sx}}
            >

                <CardMedia
                    component="img"
                    image={image}
                    alt={`order-info-image`}
                    sx={{
                        objectFit : 'contain',
                        maxHeight : '120px',
                        height    : '120px',
                        mb        : 3
                    }}
                />

                <Typography
                    variant={'h4'}
                    gutterBottom
                    align="center"
                    sx={{
                        fontSize   : '24px',
                        lineHeight : '24px',
                        mb         : 2
                    }}
                >
                    {props.title}
                </Typography>

                <Typography
                    variant={'subtitle1'}
                    gutterBottom
                    align="center"
                    sx={{
                        fontSize   : '14px',
                        lineHeight : '20px',
                        mb         : 2
                    }}
                >
                    {documentToReactComponents(props.body)}
                </Typography>
            </Stack>
        </>
    );
}
