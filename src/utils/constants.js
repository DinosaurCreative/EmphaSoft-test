export const nameRegexp = /^[\w.@+-]+$/;
export const passwordRegexp = /^(?=.*[A-Z])(?=.*\d).{0,}$/

export const errors = {
  required: 'Required field',
  maxLength: 'The maximum number of characters is exceeded',
  nameFormatErr: 'Invalid characters entered',
  passFormatError: 'Password must contain at least one number and one capital letter',
}