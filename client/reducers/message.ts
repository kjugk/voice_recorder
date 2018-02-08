import * as Types from '../types';
import * as Constants from '../constants';

const initialState: Types.MessageState = {
  body: ''
};

export const message = (state = initialState, action: any): Types.MessageState => {
  switch (action.type) {
    case Constants.SET_MESSAGE:
      return {body: action.payload.body};

    case Constants.CLEAR_MESSAGE:
      return {body: ''};

    default:
      return state;
  }
};
