import * as React    from 'react';
import {Avatar}      from '@mui/material';
import {Box}         from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia}   from '@mui/material';
import {Checkbox}    from '@mui/material';
import {Typography}  from '@mui/material';
import {SxProps}     from '@mui/system';

import checkedIcon   from '../../../assets/images/figma/icons/checked.svg';
import unCheckedIcon from '../../../assets/images/figma/icons/unchecked.svg';
import {Theme}       from '@mui/material/styles';

const defaultImageBackgroundColor: string = '#FAD6C4';

interface IComponentProps
{
    imageUrl?: string;
    imageBackgroundColor?: string;
    title: string;
    description: string;
    isChecked: boolean;
    sx?: SxProps<Theme>;
}

export default function ProductOption(props: IComponentProps): JSX.Element {
    const {imageUrl, imageBackgroundColor, title, description} = props;

    const [isChecked, setIsChecked] = React.useState<boolean>(props.isChecked);
    const handleIsChecked           = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <Card
            elevation={0}
            sx={{
                width         : '100%;',
                p             : 2,
                display       : 'flex',
                flexDirection : 'row',
                ...props.sx
            }}
        >
            {imageUrl && (
                <Avatar
                    sx={{
                        m               : 'auto',
                        backgroundColor : imageBackgroundColor || defaultImageBackgroundColor,
                        minWidth        : '84px',
                        minHeight       : '84px'
                    }}
                >
                    <CardMedia
                        component={'img'}
                        title={title}
                        image={imageUrl}
                        sx={{
                            objectFit : 'cover',
                            mx        : 0,
                            p         : 1
                        }}
                    />
                </Avatar>
            )}

            <CardContent
                sx={{
                    ml    : imageUrl ? 3 : 0,
                    mt    : 'auto',
                    mb    : 'auto',
                    p     : '0 !important',
                    width : '100%'
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        align="left"
                        sx={{
                            mb         : 1,
                            fontSize   : '16px',
                            lineHeight : '19px'
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        align="left"
                        sx={{
                            fontSize   : '12px',
                            lineHeight : '16px'
                        }}
                    >
                        {description}
                    </Typography>
                </Box>

                {/*<Box sx={{mt : 2}}>*/}
                {/*    <Typography*/}
                {/*        variant="h6"*/}
                {/*        color="text.primary"*/}
                {/*        align="left"*/}
                {/*        sx={{*/}
                {/*            mb         : 1,*/}
                {/*            fontSize   : {xs : '12px', lg : '20px'},*/}
                {/*            lineHeight : {xs : '14px', lg : '24px'}*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {info2.title}*/}
                {/*    </Typography>*/}

                {/*    <Typography*/}
                {/*        variant="subtitle1"*/}
                {/*        color="text.secondary"*/}
                {/*        align="left"*/}
                {/*        sx={{*/}
                {/*            fontSize   : {xs : '12px', lg : '20px'},*/}
                {/*            lineHeight : {xs : '16px', lg : '24px'}*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {info2.description}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </CardContent>

            <CardContent
                sx={{
                    my : 'auto'
                }}
            >
                <Checkbox
                    checked={isChecked}
                    onChange={handleIsChecked}
                    icon={<img src={unCheckedIcon} alt="" style={{width : '42px', height : '42px'}}/>}
                    checkedIcon={<img src={checkedIcon} alt="" style={{width : '42px', height : '42px'}}/>}
                    sx={{
                        '&:hover' : {backgroundColor : 'transparent'}
                    }}
                />
            </CardContent>
        </Card>
    );
}
