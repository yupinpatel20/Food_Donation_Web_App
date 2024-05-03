import "../css/footer.css";
import React, { useState } from 'react';

export default function footer() {

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsEmailValid(true);
    };

    const handleSubscribe = () => {
        if (email.trim() === "") {
            setIsEmailValid(false);
            return;
        }

        alert(`Subscription done for ${email}`);
    };

    return (
        <>
            <div className="custom-main-footer container">
                <footer className="pt-5 pb-3">
                    <div className="row">
                        <div className="col-2">
                            <h5>Tabs</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item abc mb-2"><a href="/" className="nav-link p-0 ">Home</a></li>
                                <li className="nav-item abc mb-2"><a href="#whatwedo" className="nav-link p-0 ">Gallery</a></li>
                                <li className="nav-item  abc mb-2"><a href="#sponsors" className="nav-link p-0 ">Our Partners</a></li>
                                <li className="nav-item abc mb-2"><a href="/contact" className="nav-link p-0 ">Contact Us</a></li>
                            </ul>
                        </div>

                        

                        <div className="col-4 ">
                            <h5>About Us</h5>
                            <p className=' p-0'>Food Donation is dedicated to alleviating hunger and combating food wastage. Our core mission is to ensure that no edible food goes to waste, thereby contributing to the reduction of greenhouse gas emissions. Utilizing our cutting-edge online platform, we seamlessly link food donors with volunteers, enabling the efficient redistribution of surplus food to organizations and charities assisting those in need. Together, we strive to address food insecurity by directly delivering nutritious meals to individuals and families facing hunger.</p>
                        </div>

                        <div className="col-5 offset-1">
                            <form>
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of whats new and exciting from us.</p>
                                <div className="d-flex w-100 gap-2">
                                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="text" className={`form-control ${isEmailValid ? "" : "is-invalid"}`} placeholder="Email address" value={email}
                                        onChange={handleEmailChange} />
                                    <button type="button" className="SubscribeBtn" onClick={handleSubscribe}>
                                        Subscribe
                                    </button>
                                </div>
                                {!isEmailValid && <div className="invalid-feedback">Please enter a valid email.</div>}
                            </form>
                        </div>
                    </div>

                   
                </footer>
            </div>
        </>
    )
}
