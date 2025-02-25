import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { getIn } from 'formik'
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

  describe('nested objects', () => {
    const schema = z.object({
      user: z.object({
        name: z.string().min(2),
        email: z.string().email(),
      }),
    })

    it('returns no errors for valid data', () => {
      const result = withZodSchema(schema)({
        user: {
          name: 'Luke',
          email: 'Glazy@users.noreply.github.com',
        },
      })

      expect(result).toStrictEqual({})
    })

    it('returns field error if no children have errors', () => {
      // @ts-ignore Type incorrect for usage in test case.
      const result = withZodSchema(schema)({})

      expect(getIn(result, 'user')).toEqual('Required')
    })

    it('returns object errors correctly', () => {
      const result = withZodSchema(schema)({
        user: {
          name: 'X',
          email: 'invalid-email',
        },
      })

      expect(getIn(result, 'user.name')).toEqual(
        'String must contain at least 2 character(s)'
      )
      expect(getIn(result, 'user.email')).toEqual('Invalid email')
    })
  })

  describe('simple arrays', () => {
    const schema = z.object({
      favouriteColours: z.string().array().min(3),
    })

    it('returns field issue if children are valid', () => {
      const result = withZodSchema(schema)({
        favouriteColours: ['Yellow', 'Red'],
      })

      expect(getIn(result, 'favouriteColours')).toEqual(
        'Array must contain at least 3 element(s)'
      )
    })

    it('returns no errors for valid data', () => {
      const result = withZodSchema(schema)({
        favouriteColours: ['Yellow', 'Blue', 'Purple', 'Red'],
      })

      expect(result).toStrictEqual({})
    })

    it('returns error in array correctly', () => {
      const result = withZodSchema(schema)({
        // @ts-ignore Incorrect type to facilitate test case.
        favouriteColours: ['Yellow', 'Red', 42],
      })

      expect(getIn(result, 'favouriteColours.1')).toBeUndefined()
      expect(getIn(result, 'favouriteColours.2')).toEqual(
        'Expected string, received number'
      )
    })
  })

  describe('array of objects', () => {
    const schema = z.object({
      footballTeams: z
        .object({
          name: z.string().endsWith('FC'),
          manager: z.string().min(2),
        })
        .array()
        .min(2),
    })

    it('returns no errors for correct data', () => {
      const result = withZodSchema(schema)({
        footballTeams: [
          { name: 'Green FC', manager: 'Mr Green' },
          { name: 'Red FC', manager: 'Mr Red' },
        ],
      })

      expect(result).toStrictEqual({})
    })

    it('returns field error if no children have errors', () => {
      const result = withZodSchema(schema)({
        footballTeams: [{ name: 'Green FC', manager: 'Mr Green' }],
      })

      expect(getIn(result, 'footballTeams')).toEqual(
        'Array must contain at least 2 element(s)'
      )
    })

    it('returns errors correctly', () => {
      const result = withZodSchema(schema)({
        footballTeams: [
          { name: 'Green Athletic', manager: 'X' },
          { name: 'Red FC', manager: 'X' },
        ],
      })

      expect(getIn(result, 'footballTeams[0].name')).toEqual(
        'Invalid input: must end with "FC"'
      )
      expect(getIn(result, 'footballTeams[0].manager')).toEqual(
        'String must contain at least 2 character(s)'
      )

      expect(getIn(result, 'footballTeams[1].name')).toBeUndefined()
      expect(getIn(result, 'footballTeams[1].manager')).toEqual(
        'String must contain at least 2 character(s)'
      )
    })
  })
})
