import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "./Logo.js";
import EventButton from './EventButton.js';
import LogInButton from './LogInButton.js';
import SignUpButton from './SignUpButton.js';

import './LogoutButton.css';

import './NavBarContainer.css';

import { useAuth } from '../FireBase/AuthContext.jsx';
import axios from 'axios';

function NavBarContainer() {
    const { isAuthenticated, logout } = useAuth();
    const [role, setRole] = useState("Regular");

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.get("/users/dash");
                console.log(response.data);
                if (response.data.role.Moderator.AllOrganizationsAccess) {
                    setRole("Admin");
                } else if (response.data.role.Organizer.Organizations.length > 0) {
                    setRole("Organizer");
                }
                console.log(`role: ${role}`);
            } catch (error) {
                console.log(`Error from GET /user/dash: ${error.message}`)
            }
        };
        console.log(`isAuthenticated: ${isAuthenticated}`);
        if (isAuthenticated) fetchRole();
    }, [isAuthenticated]);

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="event-buttons-container">
                <ul className="text-center">
                    <li>
                        <Link to="/events-page">
                            <EventButton id="events-label" label="All Events" />
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link to="/dash">
                                <EventButton id="dashboard-label" label="Dashboard" />
                            </Link>
                        </li>
                    )}
                    {/* {(role === "Admin") && (
                        <li>
                            <Link to="/create-event">
                                <EventButton id="create-event-label" label="Create Event" />
                            </Link>
                        </li>
                    )} */}
                    {isAuthenticated && (
                        <li>
                            <Link to="/register-organizer">
                                <EventButton id="register-organizer-label" label="Register As Organizer" />
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            {!isAuthenticated ? (
                <>
                    <div className="sign-up-container">
                        <Link to="/login-signup?signup">
                            <SignUpButton label="Sign Up" />
                        </Link>
                    </div>
                    <div className="log-in-container">
                        <Link to="/login-signup?login">
                            <LogInButton label="Log In" />
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div onClick={logout} className="log-out-container">
                        <SignUpButton label="Log Out" />
                    </div>
                </>
            )}
        </div>
    );
}

export default NavBarContainer;
