import './app.css';

import * as React from 'react';
import {Route}    from 'react-router-dom';
import {Routes}   from 'react-router-dom';

import ErrorPage from './views/errors/error';

import CareersPage              from './views/careers';
import CateringPage             from './views/catering';
import CheckoutPage             from './views/checkout';
import ContactUsPage            from './views/contact-us';
import FaqsPage                 from './views/faqs';
import FeedbackPage             from './views/feedback';
import FranchisingPage          from './views/franchising';
import HomePage                 from './views/home';
import LocationsPage            from './views/locations';
import MenuPage                 from './views/menu';
import NutritionAndAllergenPage from './views/nutrition-and-allergen';
import PrivacyPolicyPage        from './views/privacy-policy';
import SubscribePage            from './views/subscribe';
import TermsAndConditionsPage   from './views/terms-and-conditions';
import WhoWeArePage             from './views/who-we-are';

/**
 * Our Web Application
 */
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/careers" element={<CareersPage/>}/>
            <Route path="/catering" element={<CateringPage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/contact-us" element={<ContactUsPage/>}/>
            <Route path="/faqs" element={<FaqsPage/>}/>
            <Route path="/feedback" element={<FeedbackPage/>}/>
            <Route path="/franchising" element={<FranchisingPage/>}/>
            <Route path="/locations" element={<LocationsPage/>}/>
            <Route path="/menu" element={<MenuPage/>}/>
            <Route path="/nutrition-and-allergen" element={<NutritionAndAllergenPage/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
            <Route path="/subscribe" element={<SubscribePage/>}/>
            <Route path="/who-we-are" element={<WhoWeArePage/>}/>
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    );
}
