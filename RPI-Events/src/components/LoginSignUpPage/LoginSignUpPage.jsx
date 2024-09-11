import React, { useEffect, useState } from 'react';
import LoginForm from '../Forms/LoginForm';
import SignUpForm from '../Forms/SignUpForm';
import background from '../src/img/stroy_bg_02.jpg';
import { useLocation } from 'react-router-dom';

import './LoginSignupContainer.css';

const LoginSignupContainer = () => {
    const location = useLocation();
    const [display, setDisplay] = useState(location.search.includes('signup') ? 'signup' : 'login');

    useEffect(() => {
        setDisplay(location.search.includes('signup') ? 'signup' : 'login');
    }, [location.search]);

    return (
        <div className="LoginSignupContainer" style={{ background: `url(${background})` }}>
            {display === 'login' && <LoginForm display={display} setDisplay={setDisplay} />}
            {display === 'signup' && <SignUpForm display={display} setDisplay={setDisplay} />}
        </div>
    );
};

export default LoginSignupContainer;