import * as Constants from '../constants';

export const changeTitle = (title: string) => {
  return {
    type: Constants.CHANGE_TITLE,
    payload: {
      title
    }
  };
};

export const reset = () => {
  return {
    type: Constants.RESET_FORM,
    payload: {}
  };
};

export const submit = () => {
  return {
    type: Constants.SUBMIT_REQUEST,
    payload: {}
  };
};

export const completeSubmit = () => {
  return {
    type: Constants.SUBMIT_COMPLETE,
    payload: {}
  };
};
