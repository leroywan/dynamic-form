import React from 'react'

interface DynamicFormProps {
  name: string;
}

export function DynamicForm({name}: DynamicFormProps) {
  return <form>
    <label htmlFor="name">{name}:</label>
    <input id="name" name="name" placeholder="name" />
    <label htmlFor="email">Email:</label>
    <input id="email" name="email" placeholder="email"/>
  </form>
}