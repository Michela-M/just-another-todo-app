import React from "react";

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
