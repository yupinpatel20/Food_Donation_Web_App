import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateSidebar from '../Sidebar/NavigateSidebar';
import RequestListing from '../Donations/RequestListing';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import Footer from '../../Footer/footer';
import GoogleMaps from './GoogleMaps';
import Metrics from './Metrixs';
import '../../css/dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [selectedLocationLat, setSelectedLocationLat] = useState(null);
    const [selectedLocationLng, setSelectedLocationLng] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setUser(user);
            } else {
                // No user is signed in.
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate, setUser]);

    useEffect(() => {
        // Listen for changes in authentication state
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData);
                    if (userData && userData.first_name) {
                        setUserName(capitalizeFirstLetter(userData.first_name));
                        setUserRole(capitalizeFirstLetter(userData.account_type));
                    }
                });
            } else {
                setUserId(null);
                setUserName(null);
            }
        });
        return () => unsubscribe();
    }, []);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleLocationClick = (lan, lng) => {
        setSelectedLocationLat(lan);
        setSelectedLocationLng(lng);
    };

    return (
        <div className="container-fluid m-0 p-0">
            <div className="container-fluid row p-0">
                {/* Sidebar */}
                <NavigateSidebar userName={userName} />

                <div className="col-10">
                    {/* Request Listing */}
                    <RequestListing dashboardView={true}
                        handleLocationClick={handleLocationClick}
                    />

                    
                </div>
            </div>

            <div className='mt-3'>
                <Footer />
            </div>
        </div>
    );
}
