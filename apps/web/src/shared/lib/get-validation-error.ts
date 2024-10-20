import z from 'zod'

export function getValidationError(
  error: z.typeToFlattenedError<any, string>,
  key: string
): string {
  const fieldErrors = error.fieldErrors[key] ?? []
  return fieldErrors[0] ?? ''
}
