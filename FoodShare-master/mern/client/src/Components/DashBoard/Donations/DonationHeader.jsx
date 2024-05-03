import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

const DonationHeader = () => {
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
        <header className="custom-header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="header-title">Donations Page</h1>
                    <p className="header-description">Make a difference by donating today!</p>
                </div>
                <div className="header-right">
                    <Link to="/" className="header-link">
                        <i className="fas fa-home font-weight-bold"></i>
                        Home
                    </Link>
                    <Link to="/dashboard" className="header-link">
                        <i className="fas fa-chart-bar font-weight-bold"></i>
                        Dashboard
                    </Link>
                    <Link to="/analytics" className="header-link">
                        <i className="fas fa-user font-weight-bold"></i>
                        Profile
                    </Link>
                    <Link to="/sign-out" className="header-link" onClick={handleSignOut}>
                        <i className="fas fa-sign-out-alt"></i>
                        Sign Out
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default DonationHeader;
