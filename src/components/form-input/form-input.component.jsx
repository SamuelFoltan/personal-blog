import React from 'react';
import PropTypes from 'prop-types';
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} placeholder=" " />
      {label && (
        <label className={`${otherProps.value ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  otherProps: PropTypes.object
};

FormInput.defaultProps = {
  label: '',
  otherProps: {}
};

export default FormInput;