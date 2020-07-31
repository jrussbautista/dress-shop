interface Error {
  message: string;
}
interface Message {
  message?: string;
  error?: Error;
}

interface Response {
  data?: Message;
}

interface ErrorData {
  response?: Response;
  message: string;
}

export const catchError = (error: ErrorData): string | undefined => {
  let errorMsg: string | undefined = '';
  if (error.response) {
    errorMsg = error.response?.data?.message;

    if (error.response?.data?.error) {
      errorMsg = error.response.data.error.message;
    }
  } else {
    //something else happened
    errorMsg = error.message;
  }

  return errorMsg;
};
