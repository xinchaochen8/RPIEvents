import React from 'react';
import FormSubmit from './GenericForm/components/formsubmit/FormSubmit';
const EventSignUpButton = ({EventInfo}) => {
    
    function signupEvent () {
        alert("Signed Up For Event");
        console.log(EventInfo);
    }

    return (
        <FormSubmit type="submit" onClick={signupEvent} content={"Sign Up Event"}/>
    );
};

export default EventSignUpButton;