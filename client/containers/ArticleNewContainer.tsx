import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Types from '../types';
import * as formActions from '../actions/articleFormActions';
import * as mediaActions from '../actions/mediaActions';
import * as recorderActions from '../actions/recorderActions';
import RecorderContainer from '../containers/RecorderContainer';
import FormContainer from '../containers/FormContainer';
import { MicPermissionDeniedMessage } from '../components/messages/MicPermissionDeniedMessage';
import { NotSupportedMessage } from '../components/messages/NotSupportedMessage';
import { Loader } from '../components/Loader';
import { Helmet } from 'react-helmet';

interface NewArticleContainerProps {
  form: Types.ArticleFormState;
  media: Types.MediaState;
  message: Types.MessageState;
  recorder: Types.RecorderState;
  requestMicPermission(): any;
  resetForm(): any;
  resetRecorder(): any;
}

class NewArticleContainer extends React.Component<NewArticleContainerProps> {
  public componentDidMount() {
    this.props.requestMicPermission();
  }

  public componentWillUnmount() {
    this.props.resetRecorder();
    this.props.resetForm();
  }

  public render() {
    if (this.props.form.submitted) {
      return <Redirect to="/articles" />;
    }

    return (
      <>
        <Helmet>
          <title>New Article | Voice Recorder</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="section">
          <div className="container">{this.renderContents()}</div>
        </section>
      </>
    );
  }

  private renderContents() {
    const { media, recorder } = this.props;

    if (media.permission === Types.MediaPermissionState.NOT_CHECKED) {
      return <Loader />;
    }

    if (media.permission === Types.MediaPermissionState.DENIED) {
      return <MicPermissionDeniedMessage />;
    }

    if (media.permission === Types.MediaPermissionState.NOT_SUPPORTED) {
      return <NotSupportedMessage />;
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
    recorder: state.recorder,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      requestMicPermission: () => mediaActions.requestMicPermission(),
      resetForm: () => formActions.resetForm(),
      resetRecorder: () => recorderActions.resetRecorder()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewArticleContainer);
