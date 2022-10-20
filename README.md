# Formik Validator Zod

Allows you to easily validate [Formik](https://github.com/jaredpalmer/formik)
forms with the power of [Zod](https://github.com/colinhacks/zod) schemas.

## Installation

```sh
npm install formik-validator-zod

yarn add formik-validator-zod
```

## Example

```jsx
import { Formik } from 'formik'
import { z } from 'zod'
import { withZodSchema } from 'formik-validator-zod'

const mySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number(),
})

const MyForm = () => {
  return (
    <Formik validate={withZodSchema(mySchema)} {...}>
      {...}
    </Formik>
  )
}
```
