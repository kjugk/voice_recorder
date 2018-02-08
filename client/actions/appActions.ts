import * as Constants from '../constants';
export const setMessage = (message: string) => {
  return {
    type: Constants.SET_MESSAGE,
    payload: {
      body: message
    }
  };
};

export const clearMessage = () => {
  return {
    type: Constants.CLEAR_MESSAGE,
    payload: {
      body: ''
    }
  };
};
