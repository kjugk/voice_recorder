import * as Constants from '../constants';

export const changeTitle = (newTitle: string) => {
  return {
    type: Constants.CHANGE_TITLE,
    payload: {
      newTitle
    }
  };
};

export const receiveAudioData = (audio: any, duration: number, size: number) => {
  return {
    type: Constants.RECEIVE_AUDIO_DATA,
    payload: {
      audio,
      duration,
      size
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
