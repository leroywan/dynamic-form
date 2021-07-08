import React from "react";
import {
  FieldError,
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import "./DynamicForm.css";

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

export interface Conditional {
  name: string;
  show_if: (val?: any) => boolean;
}

export interface FormField {
  tag: FieldTags;
  name: string;
  type: InputType;
  human_label: string;
  conditional?: Conditional;
  required?: boolean;
}

interface DynamicFormProps {
  formFields: FormField[];
}

function renderFormError(error: FieldError) {
  if (!error) return null;

  switch (error.type) {
    case "required":
      return <span className="form-field__error">This field is required</span>;
    default:
      return <span className="form-field__error">This field is invalid</span>;
  }
}

function renderFormTag(
  field: FormField,
  register: UseFormRegister<any>,
  watch: UseFormWatch<any>,
  errors: FieldErrors
) {
  if (field.conditional) {
    const targetValue = watch(field.conditional.name);
    if (!targetValue || !field.conditional.show_if(targetValue)) {
      return null;
    }
  }

  switch (field.tag) {
    case "input":
      return (
        <div className="form-field" key={field.name}>
          <label className="form-field__label" htmlFor={field.name}>
            {field.human_label}
          </label>
          <input
            className="form-field__input"
            id={field.name}
            type={field.type}
            {...register(field.name, {
              required: field.required,
              shouldUnregister: true,
            })}
          />
          {renderFormError(errors[field.name])}
        </div>
      );
    // TODO: Add <select>
    // case 'select':
    //   return
    // TODO: Add <textarea>
    // case 'textarea':
    //   return
    default:
      return null;
  }
}

export function DynamicForm({ formFields }: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FormField) => console.log(data);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => renderFormTag(field, register, watch, errors))}
      <button className="form__submit">Submit</button>
    </form>
  );
}
