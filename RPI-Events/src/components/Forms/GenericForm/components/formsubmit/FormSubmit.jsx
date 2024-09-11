import React from "react";
import "./FormSubmit.css";

const FormSubmit = ({ content, type, onclick }) => {

    return (
        <div className="submitButton" >
            <button type={type}
                onClick={onclick}
            >
                {content} 
            </button>
        </div>
    );
}

export default FormSubmit;