import React from "react";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { Input, InputType } from "../Input";

import "./DynamicForm.css";

export type FieldTags = "input" | "select" | "textarea";

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

function renderErrorMessage(name: string, errors: FieldErrors) {
  if (!(name in errors)) {
    return;
  }

  switch (errors[name].type) {
    case "required":
      return "This field is required";
    default:
      return "This field is invalid";
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
        <Input
          key={field.name}
          name={field.name}
          label={field.human_label}
          type={field.type}
          required={field.required}
          error={renderErrorMessage(field.name, errors)}
          register={register(field.name, {
            required: field.required,
            shouldUnregister: true,
          })}
        />
      );
    // TODO: Add <select> component
    // case 'select':
    //   return
    // TODO: Add <textarea> component
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
