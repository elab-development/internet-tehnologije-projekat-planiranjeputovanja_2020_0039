
import React from 'react';

const FormInput = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default FormInput;
