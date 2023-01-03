import React          from 'react';
import {Box, Stack}   from '@mui/material';
import {ListItemText} from '@mui/material';
import {MenuList}     from '@mui/material';
import {MenuItem}     from '@mui/material';

import {SxProps} from '@mui/system';
import {Theme}   from '@mui/material/styles';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {effects} from '../../../shared/styles';
import {fonts}   from '../../../shared/styles';

import {paletteColors} from '../../../theme/paletteColors';

interface IFixedMenuItem
{
    id: string;
    name: string;
}

interface IFixedMenuProps
{
    sx?: SxProps<Theme>;
    items: ReadonlyArray<IFixedMenuItem>;
    onSelected?: ISelectable;
}

const styles = {
    container : {
        ...effects.buttonShadow,
        backgroundColor : paletteColors.white,
        maxWidth        : 265
    },

    menuItemTitle : {
        ...fonts.ceraBlack,
        fontWeight : 900,
        fontSize   : '20px',
        lineHeight : '24px',
        color      : paletteColors.black
    }
};

export default function FixedMenu(props: IFixedMenuProps & ISelectable) {
    const {items, onSelected, sx} = props;

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>, index: number) => {
        setSelectedIndex(index);

        if (onSelected) {
            onSelected(items[index]);
        }
    };

    return (
        <Box sx={{...styles.container, ...sx}}>
            <MenuList sx={{py : 2}}>
                {items && items.map((item, index) => (
                    <MenuItem
                        key={item.id}
                        selected={selectedIndex === index}
                        onClick={(e) => handleListItemClick(e, index)}
                    >
                        <Stack direction={'row'} sx={{width : '100%'}}>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{
                                    variant : 'subtitle2',
                                    style   : {
                                        fontFamily : 'Cera',
                                        fontWeight : 900,
                                        fontSize   : '20px',
                                        lineHeight : '24px',
                                        color      : (selectedIndex === index)
                                            ? paletteColors.white
                                            : paletteColors.black
                                        ,
                                        whiteSpace   : 'pre-line',
                                        textOverflow : 'wrap'
                                    }
                                }}
                                sx={{width : '100%'}}
                            />
                            <ChevronRightIcon
                                sx={{
                                    color : (selectedIndex === index)
                                        ? paletteColors.white
                                        : paletteColors.black
                                }}
                            />
                        </Stack>
                    </MenuItem>
                ))}
            </MenuList>
        </Box>
    );
}
