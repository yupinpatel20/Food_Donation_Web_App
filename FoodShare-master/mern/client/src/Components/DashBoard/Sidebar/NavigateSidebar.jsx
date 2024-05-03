import React from 'react';
import '../../css/NavigateSidebar.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const NavigateSidebar = ({ userName }) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="sidebar col-md-3 col-lg-2" id="sidebar" role="navigation">
            <ul className="nav flex-column sticky-top">
                <li className="nav-item mb-3 ">
                    <a className="nav-link text-secondary" href="#">
                        <h5>Greetings {userName}</h5>
                    </a>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        <i className="fas fa-chart-bar font-weight-bold"></i>
                        <span className="ml-3">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-home font-weight-bold"></i>
                        <span className="ml-3">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-request" className="nav-link">
                        <i className="fas fa-donate font-weight-bold"></i>
                        <span className="ml-3">Donations</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/analytics" className="nav-link">
                        <i className="fas fa-user font-weight-bold"></i>
                        <span className="ml-3">Profile</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        <i className="fas fa-info-circle"></i>
                        <span className="ml-3">About</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                        <i className="fas fa-address-book"></i>
                        <span className="ml-3">Contact</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/sign-out" className="nav-link" onClick={handleSignOut}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="ml-3">Sign Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavigateSidebar;
