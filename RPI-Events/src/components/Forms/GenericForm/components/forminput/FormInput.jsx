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

  const handleFileChange = (e) => {
    onChange(name, e.target.files[0]);
  };



  const handleInputChange = (e) => {

    onChange(name, e.target.value);
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
    ) : type === 'file' ? (
      <input
        type={type}
        name={name}
        onChange={handleFileChange}
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
