import * as Constants from '../../constants';
import * as messageActions from '../messageActions';

describe('messageActions', () => {
  describe('setMessage', () => {
    it('should create an action to set message.', () => {
      expect(messageActions.setMessage('hoge')).toEqual({
        type: Constants.SET_MESSAGE,
        payload: {
          body: 'hoge'
        }
      });
    });
  });

  describe('clearMessage', () => {
    it('should create an action to clear message.', () => {
      expect(messageActions.clearMessage()).toEqual({
        type: Constants.CLEAR_MESSAGE,
        payload: {
          body: ''
        }
      });
    });
  });

  describe('setErrorMessage', () => {
    it('should create an action to set error message.', () => {
      expect(messageActions.setErrorMessage('error')).toEqual({
        type: Constants.SET_ERROR_MESSAGE,
        payload: {
          body: 'error'
        }
      });
    });
  });
});
