import { image1, image2, image3 } from "../../assets";
import { } from "../css/WhatWeDo.css";

export default function WhatWeDo({ id }) {
    return (
        <>
            <section id={id}>
                <div className=" container mt-5 mb-3">
                    <h1 className="centreHeading">Gallery</h1>
                    <div className="row m-5">
                        <div className="col">
                            <div className="card">
                                <img src={image1} className="card-img-top" alt="..." />
                                
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={image2} className="card-img-top" alt="..." />
                                
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={image3} className="card-img-top" alt="..." />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
