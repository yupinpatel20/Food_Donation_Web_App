import { partner1, partner2, partner3, partner4, partner5, partner6, partner7 } from "../../assets";
import '../css/sponsorLogo.css'

export default function sponsorLogo({ id }) {
    return (
        <section id={id}>
            <div className="mainContainer">
                <div className="customContainer">
                    <h1>Our Partners</h1>
                    <div className="client">
                        <ul>
                            <li>
                                <img src={partner1} alt="client1" />
                                <img src={partner1} alt="client1" />
                            </li>
                            <li>
                                <img src={partner2} alt="client2" />
                                <img src={partner2} alt="client2" />
                            </li>
                            <li>
                                <img src={partner3} alt="client3" />
                                <img src={partner3} alt="client3" />
                            </li>
                            <li>
                                <img src={partner4} alt="client4" />
                                <img src={partner4} alt="client4" />
                            </li>
                            <br />
                            <li>
                                <img src={partner6} alt="client6" />
                                <img src={partner6} alt="client6" />
                            </li>
                            <li>
                                <img src={partner5} alt="client5" />
                                <img src={partner5} alt="client5" />
                            </li>
                            <li>
                                <img src={partner7} alt="client7" />
                                <img src={partner7} alt="client7" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
