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
                                <li className="nav-item abc mb-2"><a href="#whatwedo" className="nav-link p-0 ">What We Do</a></li>
                                <li className="nav-item  abc mb-2"><a href="#sponsors" className="nav-link p-0 ">Our Partners</a></li>
                                <li className="nav-item abc mb-2"><a href="/contact" className="nav-link p-0 ">Contact Us</a></li>
                            </ul>
                        </div>

                        

                        <div className="col-4 ">
                            <h5>About Us</h5>
                            <p className=' p-0'>Food Rescue is dedicated to eliminating hunger and food waste. Our mission is to keep food out of landfills and reduce greenhouse gases. We engage volunteers and food donors through our proprietary web-based app to directly transfer nutritious excess food to social service agencies serving the food insecure.</p>
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

                    <div className="d-flex justify-content-between border-top- pr-5 mt-3">
                        <p>&copy; 2024 Food Rescue. All rights reserved.</p>
                        <ul className="list-unstyled d-flex mt-2 icon">
                            <li className="ms-3"><a className="link-dark" href="/contact"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" /></svg></a></li>
                            <li className="ms-3"><a className="link-dark" href="/contact"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" /></svg></a></li>
                            <li className="ms-3"><a className="link-dark" href="/contact"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg></a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    )
}
