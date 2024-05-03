import React from 'react';
import Footer from "../Footer/footer";
import Header from '../Header/header';
import '../css/about.css';

const About = () => {
    return (
        <>
            <section>
                <Header />
            </section>

            <div className="MissionVisionContainer">
                <section className='Mission'>
                    <div className='innerDiv'>
                        <h2>Our Mission</h2>
                        <div className="content">
                            FoodShare is a digital platform that aims to address the issue of food wastage by connecting restaurants, grocery stores, and individuals willing to donate surplus food with local shelters or individuals in need. This initiative not only helps in reducing food wastage but also fosters a sense of community responsibility and support.
                        </div>
                    </div>
                </section>

                <section className='Vision'>
                    <div className='innerDiv'>
                        <h2>Our Vision</h2>
                        <div className="content">
                            Food wastage is a significant global issue, and there is a lack of efficient systems to channel surplus food to those who need it. The FoodShare platform intends to bridge this gap by providing a seamless digital interface for food donation, ensuring that surplus food reaches those who are in need.
                        </div>
                    </div>
                </section>
            </div>

            <section>
                <Footer />
            </section>
        </>
    );
};

export default About;
