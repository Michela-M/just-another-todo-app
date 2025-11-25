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
    props.id || `input-${placeholder.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
        {...props}
      />

      {helperText && <p className="input-helper">{helperText}</p>}
    </div>
  );
}
