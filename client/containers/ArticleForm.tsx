import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState, ArticleFormState } from '../types/index';
import * as FormActions from '../actions/articleFormActions';
import { KeyboardEvent } from 'react';

interface ArticleFormProps {
  form: ArticleFormState;
  changeTitle: (title: string) => any;
}

class ArticleForm extends React.Component<ArticleFormProps> {
  public render() {
    return (
      <form>
        <input
          type="text"
          value={this.props.form.title}
          onChange={this.handleTitleChange.bind(this)}
        />
      </form>
    );
  }

  private handleTitleChange(evt: React.FormEvent<HTMLInputElement>) {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
