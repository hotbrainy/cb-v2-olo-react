import _               from 'lodash';
import React           from 'react';
import Grid            from '@mui/material/Unstable_Grid2';
import {Link}          from '@mui/material';
import {MenuItem}      from '@mui/material';
import {Typography}    from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material/styles';
import NestedMenu      from '../../../menus/nested-menu';

export interface IComponentProps
{
    navMenu?: ReadonlyArray<INavigationItem>;
}

function makeColumnMenuItem(model: INavigationItem, fontStyle: any): JSX.Element {
    return (
        <MenuItem
            key={model.title}
            component={Link}
            href={['#', ''].includes((model.href || '').trim()) ? undefined : model.href}
            sx={{color : (theme) => theme.palette.common.white}}
        >
            <Typography
                variant={'h6'}
                sx={{
                    color : (theme) => theme.palette.common.white,
                    ...fontStyle
                }}
            >
                {model.title}
            </Typography>
        </MenuItem>
    );
}

// TODO:
//       This is hand-coded to generate a 4x4 grid (depth first)
//       so will need to be adjusted for different menu structures.
//       - the expected result could probably be achieved using CSS (flex-box) ???
//       - enhance to handle more than 1 level of menu nesting (if required)
function ColumnMenu(props: IComponentProps): JSX.Element {
    const {navMenu} = props;

    // Flatten all menu-items & submenu-items
    const menuItems = (navMenu || []).reduce((arr: Array<JSX.Element | null>, item: INavigationItem) => {
        arr.push(makeColumnMenuItem(item, {
            fontWeight : 900,
            fontSize   : {lg : '16px'},
            lineHeight : {lg : '19px'}
        }));

        // Add nested menu items (NOTE: only handling 1 level deep)
        const hasChildren = !_.isEmpty(item.items);
        if (hasChildren) {
            for (let subItem of (item.items || [])) {
                arr.push(makeColumnMenuItem(subItem, {
                    fontWeight : 400,
                    fontSize   : {lg : '14px'},
                    lineHeight : {lg : '20px'}
                }));
            }
        }
        else {
            // Add an empty place-holder item
            arr.push(null);
        }

        return arr;
    }, []);

    // Arrange the menuItems depth-first
    const arrangedMenuItems: JSX.Element[] = [];
    const maxRows                          = 4;
    const itemCount                        = menuItems.length;
    let ii                                 = 0;
    while (ii < maxRows) {
        for (let jj = ii; jj < itemCount; jj += maxRows) {
            arrangedMenuItems.push(
                <Grid xs={3} key={`menu-item-${jj}`}>
                    {menuItems[jj]}
                </Grid>
            );
        }
        ii++;
    }

    return (
        <>
            {/* NOTE: appears to be off-center due to trailing whitespace in the last grid column */}
            <Grid container sx={{my : 2, mx : 'auto'}}>
                {arrangedMenuItems}
            </Grid>
        </>
    );
}

export default function SiteMap(props: IComponentProps): JSX.Element {
    const {navMenu} = props;

    const theme     = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <>
            <Grid
                maxWidth="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                xs={12}
            >
                {
                    isDesktop
                        ? (<ColumnMenu navMenu={navMenu}/>)
                        : (<NestedMenu items={navMenu}/>)
                }
            </Grid>
        </>
    );
}
