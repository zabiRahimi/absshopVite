
import useChengeDocumentTitle from '../hooks/useSetDocumentTitle';
import { SimpleHeader } from '../simpleHeader/SimpleHeader';
import { BodyContactUs } from './BodyContactUs';
import { BodyAboutUs } from '../aboutUs/BodyAboutUs';
import Footer from '../footer/Footer';

import './contactUs.css';

export const ContactUs = () => {

    useChengeDocumentTitle('تماس با ما');

    return (

        <div className='containerMain_CUs'>

            <SimpleHeader />

            <BodyContactUs />

            <BodyAboutUs />

            <Footer />

        </div>

    );

}