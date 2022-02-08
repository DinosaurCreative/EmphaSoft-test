import { nameRegexp, passwordRegexp } from './constants';

export const validators = {
  name: {
    required(val) {
      return val === '';
    },
    maxLength(val) {
      return val.length > 150;
    },
    nameFormatErr(val) {
      return !nameRegexp.test(val);
    }
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
  }
}

