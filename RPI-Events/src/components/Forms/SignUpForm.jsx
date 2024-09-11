import React, { useState } from 'react';
import Cookies from 'js-cookie';
import FormInput from './GenericForm/components/forminput/SignUpInput.jsx';
import FormHeader from './GenericForm/components/formheader/FormHeader.jsx';
import FormSubmit from './GenericForm/components/formsubmit/FormSubmit.jsx';
import SwitchForm from './components/SwitchForm';
import fields from './signupFormFields.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../FireBase/.firebaseConfig.js';
import { useAuth } from '../../FireBase/AuthContext.jsx';

const SignUpForm = ({ display, setDisplay }) => {
  const { signin, signinWithPassword } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === '') {
      alert('Enter an email');
      return;
    }
    if (formData.password === '') {
      alert('Enter a password');
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      alert('Confirm password must match with password');
      return;
    }

    try {
      const { email, password, confirmpassword, profileImage } = formData;

      await signinWithPassword(email, password, confirmpassword, profileImage);

      setFormData(
        fields.reduce((accumulator, currentValue) => {
          accumulator[currentValue.name] = '';
          return accumulator;
        }, {})
      );

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signin();

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="form-container" style={{ width: "500px", height: "708px" }}>
      <SwitchForm display={display} setDisplay={setDisplay} />
      <FormHeader title="Sign Up" />
      <form className="form-contents" onSubmit={handleSubmit}>
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
        <FormSubmit type="submit" content="Sign Up" />
      </form>
      <button type="button" onClick={handleGoogleSignIn}>Sign Up with Google</button>
    </div>
  );
};

export default SignUpForm;
