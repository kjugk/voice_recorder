import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as FormActions from '../actions/articleFormActions';
import { ArticleForm } from '../components/ArticleForm/ArticleForm';

interface Props {
  form: Types.ArticleFormState;
  changeTitle(title: string): any;
  submitForm(): any;
}

class ArticleFormContainer extends React.Component<Props> {
  public render() {
    const { submitForm, changeTitle, form } = this.props;

    return (
      <ArticleForm
        duration={form.duration}
        onSubmit={submitForm}
        onTitleChange={changeTitle}
        size={form.size}
        title={form.title}
      />
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    form: state.articleForm
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      changeTitle: (title: string) => FormActions.changeTitle(title),
      submitForm: () => FormActions.submitForm()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleFormContainer);
