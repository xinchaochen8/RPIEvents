import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FormInput from './GenericForm/components/forminput/FormInput.jsx';
import FormHeader from './GenericForm/components/formheader/FormHeader.jsx';
import FormSubmit from './GenericForm/components/formsubmit/FormSubmit.jsx';
import SwitchForm from './components/SwitchForm';
import fields from './loginFormFields';
import { useAuth } from '../../FireBase/AuthContext.jsx';

const LoginForm = ({ display, setDisplay, signOut }) => {
    const navigate = useNavigate();
    const { login, loginWithPassword } = useAuth();
    const [formData, setFormData] = useState(
        fields.reduce((accumulator, currentValue) => {
            accumulator[currentValue.name] = '';
            return accumulator;
        }, {})
    );

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        console.log('LoginForm submitted', formData);
        if (formData.email === '') {
            alert('Enter an email');
            return false;
        }
        if (formData.password === '') {
            alert('Enter a password');
            return false;
        }
        try {
            await loginWithPassword(formData.email, formData.password);
            alert('Login submitted');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container" style={{ width: "500px", height: "708px" }}>
            <SwitchForm display={display} setDisplay={setDisplay} />
            <FormHeader title="Login" />
            <form className="form-contents" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {fields.map(field => (
                    <FormInput
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        options={field.options}
                        minNum={field.minNum}
                        step={field.step}
                    />
                ))}
                <FormSubmit type="submit" content="Login" />
            </form>
            <button type="button" onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default LoginForm;
