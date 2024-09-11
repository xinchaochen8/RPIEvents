import React, { useState } from 'react';
import './GenericForm.css';
import FormInput from './components/forminput/FormInput';
import FormHeader from './components/formheader/FormHeader';
import FormSubmit from './components/formsubmit/FormSubmit';

const GenericForm = ({ title, fields, onSubmit, action, width, height, switchForm, switchFormFunction }) => {
    const [formData, setFormData] = useState(
        // using reduce to initialize the formData state based on the fields array
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
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // using onSubmit function 
        if (onSubmit(formData) === true) {
            setFormData(
                fields.reduce((accumulator, currentValue) => {
                    accumulator[currentValue.name] = '';
                    return accumulator;
                }, {})
            );    
        }

    };

    return (
        <div className="form-container"
            style={{
                width: width ? width : "500px",
                height: height ? height : "fit-content"
            }}
        >
            {switchForm}
            <FormHeader title={title} />
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

                <FormSubmit type="submit" content={action} />
            </form>
        </div>
    );
};

export default GenericForm;
