import { popupMessages, serverCodes } from './constants';

function serverMessagesHandler(status, errorSetter) {
  const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = serverCodes;
  const { serverError, wrongUserData, unknownError } = popupMessages;

  switch(status) {
    case INTERNAL_SERVER_ERROR:
      errorSetter(serverError);
      break;
    case BAD_REQUEST:
      errorSetter(wrongUserData);
      break;
    default:
      errorSetter(unknownError);
  }
}

export default serverMessagesHandler;