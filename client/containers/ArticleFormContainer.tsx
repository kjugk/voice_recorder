import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Types from '../types';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as recorderActions from '../actions/recorderActions';

import RecorderContainer from '../containers/RecorderContainer';
import FormContainer from '../containers/FormContainer';

interface ArticleFormContainerProps {
  form: Types.ArticleFormState;
  recorder: Types.RecorderState;
  media: Types.MediaState;
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
    const { form, recorder, media } = this.props;

    if (!media.micPremitted) {
      return <div>マイクの使用が許可されていません。</div>;
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
    recorder: state.recorder,
    media: state.media
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
