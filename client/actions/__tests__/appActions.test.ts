import * as Constants from '../../constants';
import * as appActions from '../appActions';

describe('appActions', () => {
  describe('setMessage', () => {
    it('should create an action to set message.', () => {
      expect(appActions.setMessage('hoge')).toEqual({
        type: Constants.SET_MESSAGE,
        payload: {
          body: 'hoge'
        }
      });
    });
  });

  describe('clearMessage', () => {
    it('should create an action to clear message.', () => {
      expect(appActions.clearMessage()).toEqual({
        type: Constants.CLEAR_MESSAGE,
        payload: {
          body: ''
        }
      });
    });
  });

  describe('setErrorMessage', () => {
    it('should create an action to set error message.', () => {
      expect(appActions.setErrorMessage('error')).toEqual({
        type: Constants.SET_ERROR_MESSAGE,
        payload: {
          body: 'error'
        }
      });
    });
  });
});
