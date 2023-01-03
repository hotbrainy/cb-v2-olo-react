import _                  from 'lodash';
import * as React         from 'react';
import MenuItem           from '@mui/material/MenuItem';
import Menu               from '@mui/material/Menu';
import {SxProps}          from '@mui/system';
import {Theme, useTheme}  from '@mui/material/styles';
import {Link, Typography} from '@mui/material';
import ChevronDownIcon    from '@mui/icons-material/ChevronRight';

interface IDropDownMenuProps
{
    items: ReadonlyArray<INavigationItem>;
    sx?: SxProps<Theme>;
}

export default function DropDownMenu(props: IDropDownMenuProps): JSX.Element {
    const {items, sx} = props;

    const theme = useTheme();

    type AnchorCache = {[key: string]: HTMLElement};

    const _cache: AnchorCache     = {};
    const [anchorEl, setAnchorEl] = React.useState<AnchorCache>({..._cache});
    const isOpen                  = (key: string) => Boolean(anchorEl[key]);
    const handleClick             = (event: React.MouseEvent<HTMLElement>, key: string) => {
        event.preventDefault();
        _cache[key] = event.currentTarget;
        setAnchorEl({..._cache});
    };
    const handleClose             = (key: string) => {
        delete _cache[key];
        setAnchorEl({..._cache});
    };

    return (
        <>
            {(items || []).map((item, ii) => _.isEmpty(item.items)
                ? (
                    <MenuItem
                        key={`menu-item-${ii}`}
                        component={Link}
                        href={['#', ''].includes((item.href || '').trim()) ? undefined : item.href}
                        sx={{...sx}}
                    >
                        <Typography
                            variant={'h4'}
                            sx={{
                                color      : theme.palette.common.white,
                                fontSize   : {lg : '16px'},
                                lineHeight : {lg : '19px'}
                            }}
                        >
                            {item.title}
                        </Typography>
                    </MenuItem>
                )
                : (
                    <React.Fragment key={`menu-item-${ii}`}>
                        <MenuItem
                            id={`menu-trigger-${ii}`}
                            component={Link}
                            href={['#', ''].includes((item.href || '').trim()) ? undefined : item.href}
                            sx={{
                                ...sx,
                                color : isOpen(`menu-trigger-${ii}`)
                                    ? theme.palette.common.yellow
                                    : theme.palette.common.white
                            }}
                            aria-controls={isOpen(`menu-trigger-${ii}`) ? `menu-${ii}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={isOpen(`menu-trigger-${ii}`) ? 'true' : undefined}
                            onClick={(event) => handleClick(event, `menu-trigger-${ii}`)}
                        >
                            <Typography
                                variant={'h4'}
                                sx={{
                                    color      : isOpen(`menu-trigger-${ii}`)
                                        ? theme.palette.common.yellow
                                        : theme.palette.common.white,
                                    fontSize   : {lg : '16px'},
                                    lineHeight : {lg : '19px'}
                                }}
                            >
                                {item.title}
                            </Typography>
                            <ChevronDownIcon
                                sx={{
                                    transform : isOpen(`menu-trigger-${ii}`)
                                        ? 'rotate(-90deg)'
                                        : 'rotate(90deg)'
                                }}
                            />
                        </MenuItem>
                        <Menu
                            id={`menu-${ii}`}
                            aria-labelledby={`menu-trigger-${ii}`}
                            anchorEl={anchorEl[`menu-trigger-${ii}`]}
                            open={isOpen(`menu-trigger-${ii}`)}
                            onClose={() => handleClose(`menu-trigger-${ii}`)}
                            MenuListProps={{
                                sx : {backgroundColor : theme.palette.common.coolGrey}
                            }}
                        >
                            {(item.items || []).map((subItem, jj, arr) => (
                                <MenuItem
                                    key={`menu-sub-item-${jj}`}
                                    component={Link}
                                    href={['#', ''].includes((subItem.href || '').trim()) ? undefined : subItem.href}
                                    sx={{
                                        background : theme.palette.common.coolGrey,
                                        color      : theme.palette.common.white
                                    }}
                                    onClick={() => handleClose(`menu-trigger-${ii}`)}
                                >
                                    <Typography
                                        variant={'h4'}
                                        sx={{
                                            color      : theme.palette.common.white,
                                            fontSize   : {lg : '16px'},
                                            lineHeight : {lg : '19px'},
                                            width      : '100%',
                                            // -- Bottom Divider
                                            pb           : (jj < arr.length - 1) ? 2 : 0,
                                            borderBottom : (jj < arr.length - 1)
                                                ? ('2px solid ' + theme.palette.common.grey)
                                                : 'none'
                                        }}
                                    >
                                        {subItem.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </React.Fragment>
                )
            )}
        </>
    );
}
