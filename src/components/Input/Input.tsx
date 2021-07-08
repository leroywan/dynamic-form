import React from "react";

import { UseFormRegisterReturn } from "react-hook-form";

import "./Input.css";

export type FieldTags = "input" | "select" | "textarea";
export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InputProps {
  name: string;
  label: string;
  type: InputType;
  required?: boolean;
  error?: string;
  register: UseFormRegisterReturn;
}

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className="form-field__error">{message}</span>
);

export function Input({
  name,
  label,
  type,
  required,
  error,
  register,
}: InputProps) {
  const labelClass = required
    ? "form-field__label form-field__label--required"
    : "form-field__label";

  return (
    <div className="form-field">
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        className="form-field__input"
        id={name}
        type={type}
        aria-label={name}
        {...register}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
