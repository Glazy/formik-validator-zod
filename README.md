# Formik Validator Zod

Allows you to easily validate [Formik](https://github.com/jaredpalmer/formik)
forms with the power of [Zod](https://github.com/colinhacks/zod) schemas.

## Installation

To install from NPM:

```sh
npm install formik-validator-zod

pnpm add formik-validator-zod

yarn add formik-validator-zod

bun add formik-validator-zod
```

## Usage

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

## Is this library still maintained?

No. The codebases I work in no longer use Formik, so this library works for Zod 3 but does not work for Zod 4.
