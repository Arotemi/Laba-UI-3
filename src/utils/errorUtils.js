import errorCodeMessages from './errorCodeMessages/errorCodeMessages.js'

export const getResponseError = (error) => {
    console.log(error);
    const errorObject = JSON.parse(error);
 
    const errorMessages = {};
    for (const errorField of Object.keys(errorObject)) {
        errorMessages[errorField] = errorCodeMessages[errorObject[errorField]];
    }

    return errorMessages;
}