import React         from 'react';
import {Box}         from '@mui/material';
import {Container}   from '@mui/material';
import {Theme}       from '@mui/material/styles';
import {useTheme}    from '@mui/material/styles';
import {SxProps}     from '@mui/system';
import FaqGroupItem  from './faq-group-item';

interface IFaqGroupProps
{
    items: ReadonlyArray<IFaqGroup>;
    sx?: SxProps<Theme>;
}

export default function FaqGroup(props: IFaqGroupProps): JSX.Element {
    const {items, sx} = props;

    const theme = useTheme();

    return (
        <Container sx={{...sx}}>
            <Box marginBottom={6}>
                {(items || []).map((faq: IFaqGroup, index: number) => (
                    <FaqGroupItem
                        key={`faq-item-${index}`}
                        title={faq.title}
                        items={faq.items}
                        sx={{mt : 6}}
                    />
                ))}
            </Box>
        </Container>
    );
}
