import * as Constants from '../constants';

export const changeTitle = (newTitle: string) => {
  return {
    type: Constants.CHANGE_TITLE,
    payload: {
      newTitle
    }
  };
};

export const receiveAudio = (audio: any, duration: number) => {
  return {
    type: Constants.RECEIVE_AUDIO,
    payload: {
      audio,
      duration
    }
  };
};

export const resetForm = () => {
  return {
    type: Constants.RESET_FORM,
    payload: {}
  };
};

export const submitForm = () => {
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
