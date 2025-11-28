import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick, disabled = false }) => {
  return (
    <button
      className="card text-primary px-3 py-2"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
