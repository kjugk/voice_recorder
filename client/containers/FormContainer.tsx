import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as FormActions from '../actions/articleFormActions';
import { Form } from '../components/articles/Form';

interface FormContainerProps {
  form: Types.ArticleFormState;
  changeTitle: (title: string) => any;
  submitForm: () => any;
}

class FormContainer extends React.Component<FormContainerProps> {
  public render() {
    const { submitForm, changeTitle, form } = this.props;

    return <Form onSubmit={submitForm} onTitleChange={changeTitle} title={form.title} />;
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    form: state.articleForm
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    changeTitle: (title: string) => {
      dispatch(FormActions.changeTitle(title));
    },
    submitForm: () => {
      dispatch(FormActions.submitForm());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
