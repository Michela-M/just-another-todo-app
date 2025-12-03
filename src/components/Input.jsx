import PropTypes from "prop-types";
import React from "react";

export default function Input({
  label,
  placeholder,
  helperText,
  value,
  onChange,
  ...props
}) {
  const id =
    props.id || `input-${placeholder.replace(/\s+/gu, "-").toLowerCase()}`;

  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label htmlFor={id} className="font-medium text-primary">
          {label}
        </label>
      )}

      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="card text-primary px-2 py-2"
        {...props}
      />

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}

Input.propTypes = {
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
