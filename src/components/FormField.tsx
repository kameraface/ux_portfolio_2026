import type { ComponentPropsWithoutRef } from 'react'
import { Form } from 'radix-ui'
import './FormField.css'

interface FormFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'name'> {
  name: string
  label: string
  messages?: Partial<Record<'valueMissing' | 'typeMismatch', string>>
  serverError?: string | null
}

export function FormField({ name, label, messages = {}, serverError, ...inputProps }: FormFieldProps) {
  return (
    <Form.Field name={name} className="form-field" serverInvalid={Boolean(serverError)}>
      <Form.Label className="form-field__label">{label}</Form.Label>
      <Form.Control className="form-field__input" {...inputProps} />
      {Object.entries(messages).map(([match, text]) => (
        <Form.Message key={match} match={match as keyof typeof messages} className="form-field__error">
          {text}
        </Form.Message>
      ))}
      {serverError && (
        <Form.Message className="form-field__error">
          {serverError}
        </Form.Message>
      )}
    </Form.Field>
  )
}
