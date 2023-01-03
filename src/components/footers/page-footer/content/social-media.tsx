import * as React   from 'react';
import Grid         from '@mui/material/Unstable_Grid2';
import {IconButton} from '@mui/material';
import {Link}       from '@mui/material';
import {Stack}      from '@mui/material';

export interface IComponentProps
{
    socialLinks?: ReadonlyArray<INavigationItem>;
}

export default function SocialMedia(props: IComponentProps): JSX.Element {
    const {socialLinks} = props;

    return (
        <>
            <Grid
                maxWidth="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                xs={12}
            >
                <Stack direction={'row'} spacing={3} sx={{mb : 1}}>
                    {socialLinks!.map((item, ii) => (
                        <IconButton
                            component={Link}
                            href={item.href}
                            target={'_blank'}
                            key={`social-${ii}`}
                        >
                            <img src={item.icon} height={'24px'} alt={item.title}/>
                        </IconButton>
                    ))}
                </Stack>
            </Grid>
        </>
    );
}
