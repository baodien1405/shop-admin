import { AnyFieldApi } from '@tanstack/react-form'
import { classNames } from 'primereact/utils'

function FormLabel({
  className,
  required,
  ...props
}: React.ComponentProps<'label'> & { required?: boolean; note?: string }) {
  return (
    <div className='flex'>
      <label className={classNames('text-sm font-semibold text-neutral-600', className)} {...props} />

      {required && <span className='text-red-700 ml-1'>*</span>}
    </div>
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={classNames('text-neutral-600 text-xs', className)} {...props} />
}

function FormMessage({ className, field, ...props }: React.ComponentProps<'p'> & { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className={classNames('text-red-700 text-xs', className)} {...props}>
          {field.state.meta.errors.map((err) => err.message).join(',')}
        </p>
      ) : null}
    </>
  )
}

function FormField({ children, className }: React.ComponentProps<'div'>) {
  return <div className={classNames('space-y-1', className)}>{children}</div>
}

FormField.Label = FormLabel
FormField.Description = FormDescription
FormField.Message = FormMessage

export { FormField }
