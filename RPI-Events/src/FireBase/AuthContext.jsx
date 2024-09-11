import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from './.firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const auth = getAuth();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const login = await signInWithPopup(auth, provider);
            const idToken = await auth.currentUser.getIdToken(true);

            if (!idToken) {
                throw new Error("Missing ID token");
            } else {
                localStorage.setItem('token', JSON.stringify(idToken));
            }

            const csrfToken = Cookies.get('csrfToken');

            const response = await fetch('/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken, csrfToken: csrfToken })
            });

            const cookies = response.headers.get('Set-Cookie');
            document.cookie = cookies;

            const data = await response.json();
            if (data.status === "success") {
                console.log(document.cookie['session-token']);
                alert("Welcome");
                setIsAuthenticated(true);
                navigate('/dash');
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while logging in");
        }
    };

    const signin = async () => {

        try {
            const provider = new GoogleAuthProvider();
            const login = await signInWithPopup(auth, provider);
            const idToken = await auth.currentUser.getIdToken(true);

            if (!idToken) {
                throw new Error("Missing ID token");
            } else {
                localStorage.setItem('token', JSON.stringify(idToken));
            }

            const response = await fetch('/users/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken })
            });

            const data = await response.json();

            if (data.status === "success") {
                alert("Sign In Success\nRedirecting to Login Page...");
                navigate('/login-signup?login');
            } else {
                if (data.message === "User already exists") {
                    alert("User already exists\nRedirecting to Login Page...");
                    navigate('/login-signup?login');
                    return;
                } else {
                    alert("Sign In Failed: " + data.message);

                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        Cookies.remove('session-token');
        alert("Goodbye");
        navigate('/');
    };

    const loginWithPassword = async (email, password) => {
        try {
            console.log(email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const idToken = await userCredential.user.getIdToken();
            console.log(idToken);
            if (!idToken) {
                throw new Error("Missing ID token");
            } else {
                localStorage.setItem('token', JSON.stringify(idToken));
            }

            const csrfToken = Cookies.get('csrfToken');
            console.log(csrfToken);

            const response = await fetch('/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken, csrfToken: csrfToken })
            });

            const data = await response.json();
            if (data.status === "success") {
                console.log(document.cookie);
                alert("Welcome");
                setIsAuthenticated(true);
                navigate('/dash');
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert("An error occurred while logging in");
        }
    };

    const signinWithPassword = async (email, password, confirmPassword, profile) => {
        try {
            if (!email || !password || !confirmPassword || !profile) {
                console.log(email, password, confirmPassword, profile);
                alert("Please fill out all fields");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // const hashedPassword = await bcrypt.hash(password, 10);

            await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await auth.currentUser.getIdToken(true);

            if (!idToken) {
                throw new Error("Missing ID token");
            } else {
                localStorage.setItem('token', JSON.stringify(idToken));
            }

            const response = await fetch('/users/signinWithPassword', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken: idToken,
                    profile: profile
                })
            });

            const data = await response.json();

            if (data.status === "success") {
                alert("Sign In Success\nRedirecting to Login Page...");
                navigate('/login-signup?login');
            } else {
                if (data.message === "User already exists") {
                    alert("User already exists\nRedirecting to Login Page...");
                    navigate('/login-signup?login');
                    return;
                } else {
                    alert("Sign In Failed: " + data.message);
                }
            }

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, signin, loginWithPassword, signinWithPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
