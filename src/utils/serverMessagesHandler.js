import { popupMessages, serverCodes } from './constants';

function serverMessagesHandler(status, errorSetter) {
  const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = serverCodes;
  const { serverError, wrongUserData, unknownError, notFound } = popupMessages;

  switch(status) {
    case INTERNAL_SERVER_ERROR:
      errorSetter(serverError);
      break;
    case BAD_REQUEST:
      errorSetter(wrongUserData);
      break;
    case NOT_FOUND:
      errorSetter(notFound);
      break;
    default:
      errorSetter(unknownError);
  };
};

export default serverMessagesHandler;