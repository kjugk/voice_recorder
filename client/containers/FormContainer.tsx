import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as FormActions from '../actions/articleFormActions';
import { Form } from '../components/articles/Form';

interface FormContainerProps {
  form: Types.ArticleFormState;
  changeTitle(title: string): any;
  submitForm(): any;
}

class FormContainer extends React.Component<FormContainerProps> {
  public render() {
    const { submitForm, changeTitle, form } = this.props;

    return (
      <Form
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
)(FormContainer);
