import * as Constants from '../constants';

export const changeTitle = (title: string) => {
  return {
    type: Constants.CHANGE_TITLE,
    payload: {
      title
    }
  };
};

export const submit = () => {
  return {
    type: Constants.SUBMIT_REQUEST,
    payload: {}
  };
};
