import React             from 'react';
import Grid              from '@mui/material/Unstable_Grid2';
import {IconButton}      from '@mui/material';
import {useSelector}     from 'react-redux';
import {setMainMenuOpen} from '../../../../../store/app';
import {useAppDispatch}  from '../../../../../store';
import closeIcon         from '../../../../../assets/images/figma/icons/close-black.svg';
import hamburgerIcon     from '../../../../../assets/images/figma/icons/hamburger-black.svg';

interface IComponentProps
{
    // items: ReadonlyArray<INavigationItem>;
}

export default function Menu(props: IComponentProps): JSX.Element {
    // const {items}  = props;
    const dispatch = useAppDispatch();

    // Redux states
    const appState = useSelector((state: any) => state.app);

    function toggleMainMenu(): void {
        dispatch(setMainMenuOpen(!appState.isMainMenuOpen));
    }

    return (
        <>
            <Grid
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                xs
                sx={{display : 'flex'}}
            >
                <IconButton
                    onClick={() => toggleMainMenu()}
                    sx={{
                        ml : 1,
                        mr : 0,
                        px : 0
                    }}
                >
                    <img
                        src={appState.isMainMenuOpen ? closeIcon : hamburgerIcon}
                        style={{height : '48px'}}
                        alt="hamburger-icon"
                    />
                </IconButton>
            </Grid>
        </>
    );
}
