// FormInput.jsx

import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  options,
  minNum,
  step,
}) => {
  const handleNumberChange = (e) => {
    const inputValue = parseInt(e.target.value);
    const newValue = isNaN(inputValue) ? 0 : Math.max(inputValue, minNum);
    onChange(name, newValue);
  };

  const handleInputChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleCheckboxChange = (e) => {
    onChange(name, e.target.checked);
  };

  const inputElement =
    type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
      />
    ) : type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'number' ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleNumberChange}
        placeholder={placeholder}
        min={minNum}
        step={step}
        required={required}
      />
    ) : type === 'checkbox' ? ( 
      <input
        type={type}
        name={name}
        checked={value} 
        onChange={handleCheckboxChange} 
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
      />
    );

  return (
    <div className="form-input-container">
      <label className="inputfield">
        {label}
        {inputElement}
      </label>
    </div>
  );
};

export default FormInput;
