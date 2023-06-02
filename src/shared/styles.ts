import {paletteColors} from '../theme/paletteColors';

export const effects = {
    buttonShadow    : {boxShadow : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`},
    titleShadow     : {textShadow : `5px 5px 0 ${paletteColors.black}`},
    heroTitleShadow : {textShadow : `6px 8px 0 ${paletteColors.red}`}
};

export const fonts = {
    comicBook : {
        fontFamily : 'Comic Book',
        fontWeight : 'normal'
    },

    comicBookBold : {
        fontFamily : 'Comic Book',
        fontWeight : 'bold'
    },

    ceraPro : {
        fontFamily : 'Cera',
        fontWeight : 'normal'
    },

    ceraBlack : {
        fontFamily : 'Cera',
        fontWeight : 'bold'
    }
};
