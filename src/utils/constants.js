export const nameRegexp = /^[\w.@+-]+$/;
export const passwordRegexp = /^(?=.*[A-Z])(?=.*\d).{0,}$/
export const baseURL = 'http://emphasoft-test-assignment.herokuapp.com';
export const errors = {
  required: 'Required field',
  maxLength: 'The maximum number of characters is exceeded',
  nameFormatErr: 'Invalid characters entered',
  passFormatError: 'Password must contain at least one number and one capital letter',
  passMinLength: 'Password must be at least 8 letters length',
}
export const popupMessages = {
  serverError: 'There was a server failure. Try again in a minute', // 500
  wrongUserData: 'Incorrect password or username', // 401
  userDataChangeFailure: 'Failed to change user data',
  unauthorized: 'You are not logged in', // 401
  unknownError: 'Unknown issue. Check internet connection and try again',
  notFound: 'User not found',
  userDataChanged: 'User data has been changed', // 200
  signinOk: 'You are logged in', // 200
  userCreated: 'New user created', // 201
  userDeleted: 'User deleted', // 204
}

export const serverCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,	
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
}
