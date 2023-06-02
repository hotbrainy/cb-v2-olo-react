import React      from 'react';
import {useState} from 'react';
import {MenuList} from '@mui/material';
import {MenuItem} from '@mui/material';

import {SxProps} from '@mui/system';
import {Theme}   from '@mui/material/styles';

import {fonts} from '../../../shared/styles';

import {paletteColors} from '../../../theme/paletteColors';
import {Swiper}        from 'swiper/react';
import {SwiperSlide}   from 'swiper/react';
import {useSelector}   from 'react-redux';
import {ISelectable}   from '../../../types/products';

interface IHorizontalMenuItem
{
    id: string;
    name: string;
}

interface IHorizontalMenuProps
{
    sx?: SxProps<Theme>;
    items: ReadonlyArray<IHorizontalMenuItem>;
    onSelected?: ISelectable;
}

const styles = {
    container : {
        ...fonts.matter,
        backgroundColor  : paletteColors.white,
        maxWidth         : 265,
        display          : 'flex',
        alignItems       : 'center',
        '&.Mui-selected' : {
            backgroundColor : `${paletteColors.oportoOrange} !important`,
            borderRadius    : '12px'
        }
    },

    menuItemTitle : {
        ...fonts.matter,
        fontWeight : 900,
        fontSize   : '20px',
        lineHeight : '24px',
        color      : paletteColors.black
    }
};

export default function HorizontalMenu(props: IHorizontalMenuProps & ISelectable) {
    const {items, onSelected, sx} = props;

    // Selected Category
    const {currentCategory} = useSelector((state: any) => state.categories);

    const [selectedIndex, setSelectedIndex] = useState<number>(currentCategory
        ? items.findIndex((cat) => cat.id == currentCategory.id)
        : 0
    );

    function selectMenuItem(index: number): void {
        setSelectedIndex(index);
        onSelected?.call(this, items[index]);
    }

    return (
        <MenuList
            sx={{
                paddingTop          : 0,
                '& .swiper-wrapper' : {display : 'flex'},
                '& .swiper-slide'   : {minWidth : 'unset', width : 'fit-content !important'}
            }}
        >
            <Swiper spaceBetween={0} slidesPerView={3}>
                {(items || []).map((item, index) => (
                    <SwiperSlide key={`men-${index}`}>
                        <MenuItem
                            key={item.id}
                            selected={selectedIndex === index}
                            onClick={() => selectMenuItem(index)}
                            sx={{...styles.container, ...sx}}
                        >
                            {item.name}
                        </MenuItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MenuList>
    );
}
