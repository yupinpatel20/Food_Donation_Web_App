import { we_rescue_food_image, we_create_community_image, happiness_image } from "../../assets";
import { } from "../css/WhatWeDo.css";

export default function WhatWeDo({ id }) {
    return (
        <>
            <section id={id}>
                <div className=" container mt-5 mb-3">
                    <h1 className="centreHeading">WHAT WE DO ?</h1>
                    <div className="row m-5">
                        <div className="col">
                            <div className="card">
                                <img src={we_rescue_food_image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">We Rescue Food</h5>
                                    <p style={{
                                        padding: 0
                                    }} className="card-text">Using our web-based app, we engage volunteers to transfer fresh food surpluses from local businesses to social service agencies serving the food insecure.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={we_create_community_image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">We Create Community</h5>
                                    <p style={{
                                        padding: 0
                                    }} className="card-text">Our model empowers communities to serve themselves with the support of our app. All participants in our work are members of the communities that we serve.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={happiness_image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">We Bring Smile</h5>
                                    <p style={{
                                        padding: 0
                                    }} className="card-text">Fueling Smiles, Nourishing Souls: Our Passionate Drive to Alleviate Hunger, Embrace Unity, Compassion and Paint Brighter Tomorrows Through Food Donation. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
