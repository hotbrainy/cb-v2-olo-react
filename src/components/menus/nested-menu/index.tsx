import React      from 'react';
import {useState} from 'react';

import {Collapse}     from '@mui/material';
import {Link}         from '@mui/material';
import {List}         from '@mui/material';
import {ListItem}     from '@mui/material';
import {ListItemIcon} from '@mui/material';
import {ListItemText} from '@mui/material';
import {Stack}        from '@mui/material';
import {ExpandLess}   from '@mui/icons-material';
import {ExpandMore}   from '@mui/icons-material';

export function ListItemBody(props: any): JSX.Element {
    const {config} = props;

    return (
        <>
            <Link
                href={['#', ''].includes((config.href || '').trim()) ? undefined : config.href}
                sx={{
                    width          : '100%',
                    textDecoration : 'none'
                }}
            >
                {config.icon && (
                    <ListItemIcon sx={{color : (theme) => theme.palette.common.white}}>
                        {config.icon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={config.title}
                    primaryTypographyProps={{
                        variant : 'h4',
                        sx      : {color : (theme) => theme.palette.common.white}
                    }}
                    sx={{pb : 2}}
                />
            </Link>
        </>
    );
}

export function MenuItem(props: any): JSX.Element {
    const {config} = props;

    const nextLevel = (config.level || 0) + 1;

    return (
        <ListItem sx={{px : 3 * nextLevel}}>
            <Stack
                direction={'row'}
                sx={{
                    width        : '100%',
                    borderBottom : (theme) => `1px solid ${theme.palette.common.coolGrey}`
                }}
            >
                <ListItemBody config={config}/>
            </Stack>
        </ListItem>
    );
}

export function ExpandableMenuItem(props: any): JSX.Element {
    const {config}        = props;
    const [open, setOpen] = useState(false);
    const handleClick     = () => setOpen(!open);

    const nextLevel = (config.level || 0) + 1;

    return (
        <nav>
            <ListItem
                onClick={handleClick}
                sx={{
                    px : 3 * nextLevel
                }}
            >
                <Stack
                    direction={'row'}
                    sx={{
                        width        : '100%',
                        borderBottom : (theme) => `1px solid ${theme.palette.common.coolGrey}`
                    }}
                >
                    <ListItemBody config={config}/>
                    {open
                        ? (<ExpandLess sx={{color : (theme) => theme.palette.common.white}}/>)
                        : (<ExpandMore sx={{color : (theme) => theme.palette.common.white}}/>)
                    }
                </Stack>
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <NestedMenu items={config.items} level={nextLevel}/>
            </Collapse>
        </nav>
    );
}

export function NestedMenu(props: any): JSX.Element {
    const level = (props.level || 0);

    return (
        <List sx={{width : '100%'}}>
            {
                props.items.map((p: any, ii: number) => (Array.isArray(p.items) && (p.items.length > 0))
                    ? (<ExpandableMenuItem config={{...p, level}} key={`${p.title}-${ii}`}/>)
                    : (<MenuItem config={{...p, level}} key={`${p.title}-${ii}`}/>)
                )
            }
        </List>
    );
}

export default NestedMenu;
