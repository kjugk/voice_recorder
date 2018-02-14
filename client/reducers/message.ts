import * as Types from '../types';
import * as Constants from '../constants';

const initialState: Types.MessageState = {
  body: '',
  errorMessage: ''
};

export const message = (state = initialState, action: any): Types.MessageState => {
  switch (action.type) {
    case Constants.SET_MESSAGE:
      return {...state, body: action.payload.body};

    case Constants.CLEAR_MESSAGE:
      return {...state, body: ''};

    default:
      return state;
  }
};
