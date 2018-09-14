import * as Types from '../../types';
import * as Constants from '../../constants';
import * as mediaActions from '../mediaActions';

describe('mediaActions', () => {
  describe('requestMicPermission', () => {
    it('should create an action to request mic premission.', () => {
      expect(mediaActions.requestMicPermission()).toEqual({
        type: Constants.MIC_PERMISSION_REQUESTED,
        payload: {}
      });
    });
  });

  describe('denyMicPermission', () => {
    it('should create an action to deny mic premission.', () => {
      expect(mediaActions.denyMicPermission()).toEqual({
        type: Constants.MIC_PREMISSION_DENIED,
        payload: {}
      });
    });
  });
});
