import React, { FormHTMLAttributes } from 'react'

export type ErrorType = {
  fieldName: string
  message?: string
}

type FormProps = {
  errors?: ErrorType[]
} & FormHTMLAttributes<HTMLFormElement>

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={`flex flex-col w-full gap-3 appearance-none placeholder-gray focus:ring-primary sm:text-sm ${className}`}
      {...props}
    >
      {props.children}
      {props.errors?.length ? <div>{props.errors?.length}</div> : null}
    </form>
  ),
)
Form.displayName = 'Form'
