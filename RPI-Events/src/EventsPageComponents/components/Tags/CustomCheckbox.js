import { useState } from "react";
import "./customCheckbox.css";

function CustomCheckbox({ label, handleChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    document.getElementById(e.target.id + '-label').classList.toggle("checked-off");
    setIsChecked(!isChecked);
    handleChange(label);
  };

  const handleCustomBox = (e) => {
    document.getElementById(e.target.id + 'label').classList.toggle("checked-off");
    setIsChecked(!isChecked);
    handleChange(label);
  }

  return (
  <div className="tagContainer">
    <label id={label + '-label'} className="tag-label" htmlFor={label}>
      {label}
    </label>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      id={label}
    />
    <span id={label +'-'} className="checkmark" onClick={handleCustomBox}></span>
  </div>
  );
}

export default CustomCheckbox;