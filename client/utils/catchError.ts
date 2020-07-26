export const catchError = (error: any) => {
  let errorMsg: string = '';
  if (error.response) {
    errorMsg = error.response.data;

    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else {
    //something else happened
    errorMsg = error.message;
  }

  return errorMsg;
};
