import './RegisterButton.css'
import { useState } from 'react';

function RegisterButton({handleRegister, handleUnregister, isRegistered=false}) {
    const [registered, setRegistered] = useState(isRegistered);
    const handleClick = () => {
        if (!registered) {
            handleRegister();
        } else {
            handleUnregister();
        }
        setRegistered(!registered);
    };
    return (
        <div className={registered == true ? "already-registered" : "event-card-register-button"}onClick={handleClick}>
            {registered ? "Unregister" : "Register"}
        </div>
    );
}

export default RegisterButton;