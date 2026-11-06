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
  email: z.email(),
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

## Zod version support

| formik-validator-zod | Zod       |
| -------------------- | --------- |
| `3.x`                | `^4.0.0`  |
| `2.x`                | `^3.19.1` |

Version 3 of this library targets Zod 4. If you are still on Zod 3, stay on
`formik-validator-zod@2`.

## Is this library still maintained?

Yes. The library is small and stable, and it is kept up to date with new Zod
releases. Issues and pull requests are welcome.
