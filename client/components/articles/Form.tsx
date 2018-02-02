import * as React from 'react';
import * as classnames from 'classnames';

interface FormProps {
  title: string;
  onSubmit: () => any;
  onTitleChange: (newTitle: string) => any;
}

interface FormState {
  titleHasChanged: boolean;
  titleIsValid: boolean;
}

export class Form extends React.Component<FormProps, FormState> {
  private static TITLE_MAX_LENGTH = 10;

  constructor(props: FormProps) {
    super(props);
    this.state = { titleHasChanged: false, titleIsValid: true };
  }

  public render() {
    const { title } = this.props;
    const c = classnames('input', {
      'is-danger': this.state.titleHasChanged && !this.state.titleIsValid
    });

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className={c}
              type="text"
              value={title}
              onChange={this.handleTitleChange.bind(this)}
            />
          </div>
          {this.state.titleHasChanged &&
            !this.state.titleIsValid && <p className="help is-danger">{Form.TITLE_MAX_LENGTH}文字以内</p>}
        </div>
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
    this.setState({ titleHasChanged: true });

    if (newTitle.length > Form.TITLE_MAX_LENGTH) {
      this.setState({ titleIsValid: false });
    } else {
      this.setState({ titleIsValid: true });
    }

    this.props.onTitleChange(evt.currentTarget.value);
  }
}
