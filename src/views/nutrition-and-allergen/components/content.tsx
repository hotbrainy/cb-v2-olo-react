import React from 'react';

// MUI Components
import {Box}        from '@mui/material';
import {Button}     from '@mui/material';
import {Typography} from '@mui/material';

import {Theme}    from '@mui/material/styles';
import {useTheme} from '@mui/material/styles';

import {SxProps}                   from '@mui/system';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

interface IDisclaimerProps
{
    title: string;
    body: any;
    downloadUrl?: string;
    sx?: SxProps<Theme>;
}

export default function Content(props: IDisclaimerProps): JSX.Element {
    const theme = useTheme();

    return (
        <>
            <Box sx={{p : 3, ...props.sx}}>
                <Typography variant="h2" align="center" sx={{mb : 5}}>
                    {props.title}
                </Typography>

                <Typography variant="subtitle1" sx={{m : 2, fontSize : {lg : '20px'}}}>
                    {documentToReactComponents(props.body)}
                </Typography>

                {props.downloadUrl && (
                    <Box sx={{display : 'flex', width : '100%'}}>
                        {/* TODO: move button style to a common module */}
                        <Button
                            variant="contained"
                            color="primary"
                            href={props.downloadUrl}
                            target={'_blank'}
                            download={'chicken-treat-allergen-guide.pdf'}
                            sx={{
                                textAlign : 'center',
                                width     : {sx : '170px', lg : '210px'},
                                p         : 1,
                                mx        : 'auto',
                                mt        : 5,
                                mb        : 3
                            }}
                        >
                            {'Download Allergen Guide'}
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
}
