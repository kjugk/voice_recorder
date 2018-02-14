import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Types from '../types';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as recorderActions from '../actions/recorderActions';

import RecorderContainer from '../containers/RecorderContainer';
import FormContainer from '../containers/FormContainer';
import { MicPermissionDeniedMessage } from '../components/messages/MicPermissionDeniedMessage';
import { MediaPermissionState } from '../reducers/media';
import { Loader } from '../components/Loader';

interface ArticleFormContainerProps {
  form: Types.ArticleFormState;
  media: Types.MediaState;
  recorder: Types.RecorderState;
  requestMicPermission: () => void;
  resetForm: () => any;
  resetRecorder: () => any;
}

class ArticleFormContainer extends React.Component<ArticleFormContainerProps> {
  public componentDidMount() {
    this.props.requestMicPermission();
  }

  public componentWillUnmount() {
    this.props.resetRecorder();
    this.props.resetForm();
  }

  public render() {
    const { form, media, recorder } = this.props;

    if (media.permission === MediaPermissionState.NOT_CHECKED) {
      return <Loader />;
    }

    if (media.permission === MediaPermissionState.DENIED) {
      return <MicPermissionDeniedMessage />;
    }

    if (form.submitted) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {!recorder.recordingCompleted && <RecorderContainer />}
        {recorder.recordingCompleted && <FormContainer />}
      </>
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    form: state.articleForm,
    media: state.media,
    recorder: state.recorder
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    requestMicPermission: () => {
      dispatch(mediaActions.requestMicPermission());
    },
    resetForm: () => {
      dispatch(formActions.resetForm());
    },
    resetRecorder: () => {
      dispatch(recorderActions.resetRecorder());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFormContainer);
