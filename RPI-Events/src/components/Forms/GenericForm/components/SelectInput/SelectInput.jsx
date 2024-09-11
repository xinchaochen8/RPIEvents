import React from 'react';
// import './FormInput.css';

const SelectInput = ({ label, name, value, onChange, options, required }) => {
  return (
    <div>
      <label className="inputfield">
        {label}
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
    </div>
  );
};

export default SelectInput;
