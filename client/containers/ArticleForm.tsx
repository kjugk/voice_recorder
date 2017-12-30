import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState, ArticleFormState } from '../types/index';
import * as FormActions from '../actions/articleFormActions';
import { Redirect } from 'react-router-dom';

interface ArticleFormProps {
  form: ArticleFormState;
  changeTitle: (title: string) => any;
  submit: () => any;
  reset: () => any;
}

class ArticleForm extends React.Component<ArticleFormProps> {
  public componentWillUnmount() {
    this.props.reset();
  }

  public render() {
    const { form } = this.props;

    if (form.submitted) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={form.title}
          onChange={this.handleTitleChange.bind(this)}
        />
        <input type="submit" />
      </form>
    );
  }

  private handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    this.props.submit();
  }

  private handleTitleChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.stopPropagation();
    this.props.changeTitle(evt.currentTarget.value);
  }
}

export const mapStateToProps = (state: AppState) => {
  return {
    form: state.articleForm
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    changeTitle: (title: string) => {
      dispatch(FormActions.changeTitle(title));
    },
    submit: () => {
      dispatch(FormActions.submit());
    },
    reset: () => {
      dispatch(FormActions.reset());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
