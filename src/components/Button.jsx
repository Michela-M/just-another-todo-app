import PropTypes from "prop-types";
import React from "react";

const Button = ({ label, onClick, disabled = false }) => {
  <button
    className="card text-primary px-3 py-2"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>;
};

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
