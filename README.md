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

Yes! This library is used in a couple of production codebases that I'm aware of,
including my current employers.

I don't expect the library will need a lot of active maintenance going forwards.
This is due to its limited scope and the fact Formik itself seems to be
abandoned.
