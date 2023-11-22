
import useChengeDocumentTitle from '../hooks/useSetDocumentTitle';
import { SimpleHeader } from '../simpleHeader/SimpleHeader';
import { BodyAboutUs } from './BodyAboutUs';
import { BodyContactUs } from '../contactUs/BodyContactUs';
import Footer from '../footer/Footer';

import './aboutUs.css';

export const AboutUs = () => {

    useChengeDocumentTitle('درباره ما');

    return (

        <div className='containerMain_AUs'>

            <SimpleHeader />

            <BodyAboutUs />

            <BodyContactUs />

            <Footer />

        </div>

    );

}