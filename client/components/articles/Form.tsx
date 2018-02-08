import * as React from 'react';
import * as classnames from 'classnames';
import { TitleInput } from '../form/TitleInput';

interface FormProps {
  title: string;
  onSubmit: () => any;
  onTitleChange: (newTitle: string) => any;
}

interface FormState {
  titleIsValid: boolean;
}

export class Form extends React.Component<FormProps, FormState> {
  private static TITLE_MAX_LENGTH = 10;

  constructor(props: FormProps) {
    super(props);
    this.state = {titleIsValid: true };
  }

  public render() {
    const { title } = this.props;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TitleInput
          value={title}
          isValid={this.state.titleIsValid}
          onChange={this.handleTitleChange.bind(this)}
        />
        <div className="field">
          <div className="control">
            <button
              title="save"
              className="button is-primary is-large"
              type="submit"
              disabled={!this.state.titleIsValid}
            >
              <div className="icon">
                <i className="fas fa-download" />
              </div>
              <span>Save</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  private handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    this.props.onSubmit();
  }

  private handleTitleChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.stopPropagation();
    const newTitle: string = evt.currentTarget.value;

    if (newTitle.length > Form.TITLE_MAX_LENGTH) {
      this.setState({ titleIsValid: false });
    } else {
      this.setState({ titleIsValid: true });
    }

    this.props.onTitleChange(evt.currentTarget.value);
  }
}
