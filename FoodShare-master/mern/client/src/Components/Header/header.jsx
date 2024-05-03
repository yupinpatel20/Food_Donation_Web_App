import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { brandLogo } from "../../assets";
import MainLine from "./mainLine";
import "../../App.css"
export default function header({ id }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();

                    console.log(userData);
                    console.log("header");
                    if (userData && userData.first_name) {
                        setUserRole(userData.account_type);
                    }
                });
            }
        });

        // Return the cleanup function inside the useEffect
        return () => unsubscribe();
    }, []);


    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <section className="Navheader" id={id}>
            <nav>
                <a href="/" className="logo-link">
                    <img
                        src={brandLogo}
                        alt="logo"
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                        className="logo-image"
                    />
                </a>

                <div className="nav-links" id="navlink">
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/dashboard">DASHBOARD</a></li>
                        <li><a href="/about">ABOUT US</a></li>
                        <li><a href="/contact">CONTACT US</a></li>
                        {user ? (
                            <button className="logInBtn" onClick={handleLogout}>Log Out</button>
                        ) : (
                            <a href="/login" className="logInBtn">Log In</a>
                        )}
                    </ul>
                </div>
            </nav>
            <MainLine user={user} userRole={userRole} />
        </section>
    )
}
