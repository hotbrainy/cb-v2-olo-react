import React                       from 'react';
import {Theme, useTheme}           from '@mui/material/styles';
import {Box}                       from '@mui/material';
import {Accordion}                 from '@mui/material';
import {AccordionDetails}          from '@mui/material';
import {AccordionSummary}          from '@mui/material';
import {Typography}                from '@mui/material';
import ExpandMoreIcon              from '@mui/icons-material/ExpandMore';
import {SxProps}                   from '@mui/system';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

interface IFaqGroupItemProps //extends IFaqGroup
{
    id?: string;
    level?: number;
    title?: string;
    subtitle?: any;
    items: ReadonlyArray<any>; //ReadonlyArray<IFaqGroup | IFaqQuestionAnswer>;
    sx?: SxProps<Theme>;
}

export default function FaqGroupItem(props: IFaqGroupItemProps): JSX.Element {
    const {sx, title, subtitle, items, level} = props;
    const theme                               = useTheme();

    const currentLevel = (level || 0);
    const nextLevel    = currentLevel + 1;

    // Apply a limit to the number of recursive groups
    const maxDepth = 3;
    if (currentLevel > maxDepth) {
        return (
            <Box
                alignItems="center"
                justifyContent="center"
                color={theme.palette.common.red}
                sx={{px : 2, py : 1}}
            >
                Max depth has been exceeded
            </Box>
        );
    }

    return (
        <Box sx={{...sx}}>
            {/* Render top-level group header & items */}
            {(currentLevel === 0) && (
                // No Accordion at the root level
                <Box marginBottom={2}>
                    {title && (
                        <Typography
                            variant={'h6'}
                            sx={{
                                fontSize     : '48px',
                                lineHeight   : '58px',
                                textAlign    : 'center',
                                marginBottom : '48px'
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    {(items || []).map((subItem: any, ii) => (
                        // Nested FAQ items
                        <FaqGroupItem
                            key={`faq-sub-item-${currentLevel}-${ii}`}
                            title={(typeof (subItem.question) === 'undefined') ? subItem.title : subItem.question}
                            subtitle={(typeof (subItem.answer) === 'undefined') ? null : subItem.answer}
                            items={subItem.items}
                            level={nextLevel}
                            sx={{mx : nextLevel * 2}}
                        />
                    ))}
                </Box>
            )}

            {/* Render nested items */}
            {(currentLevel > 0) && (
                <Box marginBottom={2}>
                    <Accordion sx={{mb : 2}}>
                        <AccordionSummary
                            id={`panel1a-header-${currentLevel}`}
                            aria-controls="panel1a-content"
                            expandIcon={<ExpandMoreIcon
                                sx={{
                                    size  : 'large',
                                    color : (currentLevel > 1)
                                        ? theme.palette.common.black
                                        : theme.palette.common.red
                                }}
                            />}
                        >
                            {title}
                        </AccordionSummary>

                        {subtitle && (
                            <AccordionDetails>
                                {documentToReactComponents(subtitle)}
                            </AccordionDetails>
                        )}

                        {(items || []).map((subItem: any, ii) => (
                            // Nested FAQ items (recursive)
                            <FaqGroupItem
                                key={`faq-sub-item-${currentLevel}-${ii}`}
                                title={(typeof (subItem.question) === 'undefined') ? subItem.title : subItem.question}
                                subtitle={(typeof (subItem.answer) === 'undefined') ? null : subItem.answer}
                                items={subItem.items}
                                level={nextLevel}
                                sx={{mx : nextLevel * 2}}
                            />
                        ))}
                    </Accordion>
                </Box>
            )}
        </Box>
    );
};
