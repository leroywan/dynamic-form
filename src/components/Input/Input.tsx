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
  error?: string;
  register: UseFormRegisterReturn;
}

export function Input({ name, label, type, error, register }: InputProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-field__input"
        id={name}
        type={type}
        {...register}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
