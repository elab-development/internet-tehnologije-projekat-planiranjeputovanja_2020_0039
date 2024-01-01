import React from 'react';
import '../css/form.css';

const Form = ({ label, type, value, onChange }) => {
  return (
    <div>
      <div className="form-container">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
    </div>
  );
};

export default Form;
