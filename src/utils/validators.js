import { nameRegexp, passwordRegexp } from './constants';

export const validators = {
  username: {
    required(val) {
      return val === '';
    },
    maxLength(val) {
      return val.length > 150;
    },
    nameFormatErr(val) {
      return !nameRegexp.test(val);
    },
  },
  password: {
    required(val) {
      return val === '';
    },
    maxLength(val) {
      return val.length > 128;
    },
    passFormatError(val) {
      return !passwordRegexp.test(val);
    },
    passMinLength(val) {
      return val.length < 8;
    },
  },
  password_login: {
    required(val) {
      return val === '';
    },
    maxLength(val) {
      return val.length > 128;
    },
  },
  'first_name': {
    maxLength(val) {
      return val.length > 30;
    }, 
    nameFormatErr(val) {
      if(val === '') return false;
      return !nameRegexp.test(val);
    },
  },
  'last_name': {
    maxLength(val) {
      return val.length > 150;
    },
    nameFormatErr(val) {
      if(val === '') return false;
      return !nameRegexp.test(val);
    },
  },
};

