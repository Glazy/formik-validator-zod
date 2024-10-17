import { FormikErrors } from 'formik'
import type { ParseParams, ZodType, ZodTypeAny } from 'zod'

/**
 * Allows you to easily use Zod schemas with the <Formik /> component `validate`
 * prop.
 *
 * ```js
 * <Formik {...} validate={withZodSchema(yourSchema)}>
 * ```
 */
type ValidateFn = (values: any) => void | object | Promise<FormikErrors<any>>

export const withZodSchema = <T extends ZodType = ZodTypeAny>(
  schema: T,
  params?: Partial<ParseParams>
): ValidateFn => {
  return (values: any): void | object | Promise<FormikErrors<any>> => {
    const validation = schema.safeParse(values, params)

    if (validation.success) return

    return validation.error.issues.reduce((acc, curr) => {
      const key = curr.path.join('.')
      return {
        ...acc,
        [key]: curr.message,
      }
    })
  }
}
