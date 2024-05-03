import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons';
import ScrollTrigger from "react-scroll-trigger";
import Countup from "react-countup";
import '../../App.css'
import { donorpng } from "../../assets";
import { getRoleCounts } from '../../config/rolecount-config';

export default function Info() {

    const [CounterOn, setCounterOn] = useState(false);
    const [counts, setCounts] = useState([0, 0, 0]);

    useEffect(() => {
        getRoleCounts((countsArray) => {
            console.log('Received Counts Array:', countsArray);
            setCounts(countsArray);
            console.log(counts[0]);
        });
    }, []);



    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div className='full-info'>
                <section className="info">

                    <div className='container'>
                        <div className="info-row">
                            <div className="info-col">
                                {/* <img src={donorpng} alt="" /> */}
                                <FontAwesomeIcon icon={faUserFriends} className="info-icon" style={{ width: '128px', height: '128px', color: 'rgb(35, 202, 35)' }}  />
                                <p className='info-p'>{CounterOn && <Countup start={0} end={counts[1] || 890} duration={3} delay={0} />}+</p>
                                <h3>Donors</h3>
                            </div>
                            <div className="info-col">
                                {/* <img src={donorpng} alt="" /> */}
                                <FontAwesomeIcon icon={faUsers} className="info-icon" style={{ width: '128px', height: '128px', color: 'rgb(35, 202, 35)' }}/>
                                <p className='info-p'>{CounterOn && <Countup start={0} end={counts[0] || 1000} duration={3} delay={0} />}+</p>
                                <h3>Volunteers</h3>
                            </div>
                            <div className="info-col">
                                {/* <img src={donorpng} alt="" /> */}
                                <FontAwesomeIcon icon={faUserFriends} className="info-icon" style={{ width: '128px', height: '128px', color: 'rgb(35, 202, 35)' }} />
                                <p className='info-p'>{CounterOn && <Countup start={0} end={counts[2] || 706} duration={3} delay={0} />}+</p>
                                <h3>Recipient</h3>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </ScrollTrigger>
    )
}
