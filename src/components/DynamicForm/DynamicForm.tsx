import React from 'react'
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
}

interface DynamicFormProps {
  formFields: FormField[];
}

function renderFormTag(field: FormField) {
  switch (field.tag) {
    case 'input':
      return <div className="form-field" key={field.name}>
        <label className="form-field__label" htmlFor={field.name}>{field.human_label}</label>
        <input className="form-field__input" id={field.name} name={field.name} type={field.type} />
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
  return <form className="form">
    {formFields.map((field) => renderFormTag(field))}
    <button className="form__submit">Submit</button>
  </form>
}