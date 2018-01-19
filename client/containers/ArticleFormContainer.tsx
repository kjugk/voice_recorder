import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as FormActions from '../actions/articleFormActions';
import * as RecorderActions from '../actions/RecorderActions';
import * as mediaActions from '../actions/mediaActions';

import { Redirect } from 'react-router-dom';
import { resetRecorder } from '../actions/RecorderActions';

import { Recorder } from '../components/recorder/Recorder';
import { Form } from '../components/articles/Form';

interface ArticleFormContainerProps {
  form: Types.ArticleFormState;
  recorder: Types.RecorderState;
  media: Types.MediaState;
  changeTitle: (title: string) => any;
  submitForm: () => any;
  resetForm: () => any;
  startRecording: () => any;
  stopRecording: () => any;
  resetRecorder: () => any;
  requestMicPermission: () => void;
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
    const {
      form,
      recorder,
      media,
      startRecording,
      stopRecording,
      submitForm,
      changeTitle
    } = this.props;

    if (!media.micPremitted) {
      return <div>マイクが許可されていません。</div>;
    }

    if (form.submitted) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {!recorder.recordingCompleted && (
          <Recorder
            isRecording={recorder.isRecording}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        )}

        {recorder.recordingCompleted && (
          <Form onSubmit={submitForm} onTitleChange={changeTitle} title={form.title} />
        )}
      </>
    );
  }
}

export const mapStateToProps = (state: Types.AppState) => {
  return {
    form: state.articleForm,
    recorder: state.recorder,
    media: state.media
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    requestMicPermission: () => {
      dispatch(mediaActions.requestMicPermission());
    },
    startRecording: () => {
      dispatch(RecorderActions.startRecording());
    },
    stopRecording: () => {
      dispatch(RecorderActions.stopRecording());
    },
    resetRecorder: () => {
      dispatch(RecorderActions.resetRecorder());
    },
    changeTitle: (title: string) => {
      dispatch(FormActions.changeTitle(title));
    },
    submitForm: () => {
      dispatch(FormActions.submitForm());
    },
    resetForm: () => {
      dispatch(FormActions.resetForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFormContainer);
