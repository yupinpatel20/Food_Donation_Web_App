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
            
        </ScrollTrigger>
    )
}
