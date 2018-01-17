import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as FormActions from '../actions/articleFormActions';
import * as RecorderActions from '../actions/RecorderActions';

import { Redirect } from 'react-router-dom';
import { Recorder } from '../components/recorder/Recorder';
import { resetRecorder } from '../actions/RecorderActions';

interface ArticleFormProps {
  form: Types.ArticleFormState;
  changeTitle: (title: string) => any;
  submitForm: () => any;
  resetForm: () => any;
  recorder: Types.RecorderState;
  startRecording: () => any;
  stopRecording: () => any;
  resetRecorder: () => any;
}

class ArticleForm extends React.Component<ArticleFormProps> {
  public componentWillUnmount() {
    this.props.resetRecorder();
    this.props.resetForm();
  }

  public render() {
    const { form, recorder } = this.props;

    if (form.submitted) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        {!recorder.recordingCompleted &&
          <Recorder
            isRecording={recorder.isRecording}
            startRecording={this.props.startRecording}
            stopRecording={this.props.stopRecording}
          />
        }
        {recorder.recordingCompleted &&
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              value={form.title}
              onChange={this.handleTitleChange.bind(this)}
            />
            <input type="submit" />
          </form>
        }
      </React.Fragment>
    );
  }

  private handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    this.props.submitForm();
  }

  private handleTitleChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.stopPropagation();
    this.props.changeTitle(evt.currentTarget.value);
  }
}

export const mapStateToProps = (state: Types.AppState) => {
  return {
    form: state.articleForm,
    recorder: state.recorder
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
