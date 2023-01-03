import {configureStore}  from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {useDispatch}     from 'react-redux';

import appReducer               from './app';
import basketReducer            from './basket';
import careerReducer            from './careers';
import categoryReducer          from './categories';
import cateringReducer          from './catering';
import faqReducer               from './faqs';
import nutritionAllergenReducer from './nutrition-and-allergen';
import privacyPolicyReducer     from './privacy-policy';
import productReducer           from './products';
import storeReducer             from './stores';
import termsConditionsReducer   from './terms-and-conditions';
import userReducer              from './user';

const rootReducer = combineReducers({
    app               : appReducer,
    basket            : basketReducer,
    careers           : careerReducer,
    categories        : categoryReducer,
    catering          : cateringReducer,
    faqs              : faqReducer,
    nutritionAllergen : nutritionAllergenReducer,
    privacyPolicy     : privacyPolicyReducer,
    products          : productReducer,
    stores            : storeReducer,
    termsConditions   : termsConditionsReducer,
    user              : userReducer
});

export const store = configureStore({
    reducer : rootReducer
});

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
