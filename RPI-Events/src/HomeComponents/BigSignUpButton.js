import './BigSignUpButton.css';
import { Link } from 'react-router-dom';

function BigSignUpButton() {
    return (
        <div className="big-sign-up-container text-center">
            <Link to="/login-signup?signup" className='big-sign-up'>
                Sign Up
            </Link>
        </div>
    );
}

export default BigSignUpButton;
