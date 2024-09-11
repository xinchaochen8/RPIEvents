import React from "react";
import './SwitchForm.css'
const SwitchForm = ({ display, setDisplay }) => {
    return (
        <div className="LoginSignupFormSelection">
            <button onClick={() => setDisplay('login')}>Login</button>
            <button onClick={() => setDisplay('signup')}>Signup</button>
        </div>
    );
}

export default SwitchForm;