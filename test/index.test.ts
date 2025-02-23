import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { withZodSchema } from '../lib/index'

const testSchema = z.object({
  name: z.string().min(2),
  favouriteValue: z.union([z.string(), z.number()]),
})

describe('withZodSchema', () => {
  it('returns no errors with valid data', () => {
    const result = withZodSchema(testSchema)({
      name: 'Luke',
      favouriteValue: 42,
    })

    expect(result).toStrictEqual({})
  })

  it('returns error with invalid value', () => {
    const result = withZodSchema(testSchema)({ name: 'X', favouriteValue: 42 })

    expect(result).toStrictEqual({
      name: 'String must contain at least 2 character(s)',
    })
  })

  it('returns union errors correctly', () => {
    const result = withZodSchema(testSchema)({
      name: 'Luke',
      // @ts-ignore This is incorrect on purpose as part of the test case.
      favouriteValue: true,
    })

    expect(result).toStrictEqual({
      favouriteValue: 'Invalid input',
    })
  })
})
