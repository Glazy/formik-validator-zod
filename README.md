# Formik Validator Zod

Allows you to easily validate [Formik](https://github.com/jaredpalmer/formik)
forms with the power of [Zod](https://github.com/colinhacks/zod) schemas.

WARNING: As of v2, this package uses native ESM and no longer provides a
CommonJS export. If this is something you need, you should be able to use the
[dynamic import](https://v8.dev/features/dynamic-import) function or use v1 of
this package.

## Installation

This package is published both on [NPM](https://www.npmjs.com) and
[JSR](https://jsr.io/).

To install from NPM:

```sh
npm install formik-validator-zod

yarn add formik-validator-zod

bun add formik-validator-zod
```

To install from JSR:

```sh
npx jsr add @glazy/formik-validator-zod

yarn dlx jsr add @glazy/formik-validator-zod

bunx jsr add @glazy/formik-validator-zod
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
