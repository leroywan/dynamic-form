import React from 'react'
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";

import './DynamicForm.css'

export type FieldTags = "input" | "select" | "textarea"

export type InputType =
"button" |
"checkbox" |
"color" |
"date" |
"datetime-local" |
"email" |
"file" |
"hidden" |
"image" |
"month" |
"number" |
"password" |
"radio" |
"range" |
"reset" |
"search" |
"submit" |
"tel" |
"text" |
"time" |
"url" |
"week"

export interface Conditional {
  name: string
  show_if: (val?: any) => boolean
}

export interface FormField {
  tag: FieldTags
  name: string
  type: InputType
  human_label: string
  conditional?: Conditional
  required?: boolean
}

interface DynamicFormProps {
  formFields: FormField[];
}

function renderFormTag(field: FormField, register: UseFormRegister<any>, errors: FieldErrors) {
  switch (field.tag) {
    case 'input':
      return <div className="form-field" key={field.name}>
        <label className="form-field__label" htmlFor={field.name}>{field.human_label}</label>
        <input className="form-field__input" id={field.name} type={field.type} {...register(field.name, { required: field.required })} />
        {errors[field.name] && <span className="form-field__error">This field is required</span>}
      </div>
    // TODO: Add <select>
    // case 'select':
    //   return
    // TODO: Add <textarea>
    // case 'textarea':
    //   return
    default:
      return null
  }
}

export function DynamicForm({formFields}: DynamicFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: FormField) => console.log(data);

  return <form className="form" onSubmit={handleSubmit(onSubmit)}>
    {formFields.map((field) => renderFormTag(field, register, errors))}
    <button className="form__submit">Submit</button>
  </form>
}