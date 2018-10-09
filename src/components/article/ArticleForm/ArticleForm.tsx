import * as React from 'react';
import { TotalTimeField } from './TotalTimeField';
import { FileSizeField } from './FileSizeField';
import { TitleInput } from './TitleInput';

interface FormProps {
  duration: number;
  size: number;
  title: string;
  onSubmit: () => any;
  onTitleChange: (newTitle: string) => any;
}

interface FormState {
  titleIsValid: boolean;
}

export class ArticleForm extends React.Component<FormProps, FormState> {
  private static TITLE_MAX_LENGTH = 20;

  constructor(props: FormProps) {
    super(props);
    this.state = { titleIsValid: true };
  }

  public render() {
    const { title, duration, size } = this.props;

    return (
      <>
        <TotalTimeField duration={duration} />
        <FileSizeField size={size} />

        <form onSubmit={this.handleSubmit.bind(this)}>
          <TitleInput
            value={title}
            isValid={this.state.titleIsValid}
            onChange={this.handleTitleChange.bind(this)}
            maxLength={ArticleForm.TITLE_MAX_LENGTH}
          />
          <div className="field">
            <div className="control">
              <button
                title="save"
                className="button is-primary is-large"
                type="submit"
                disabled={!this.isValid}
              >
                <div className="icon">
                  <i className="fas fa-download" />
                </div>
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }

  private isValid(): boolean {
    return this.state.titleIsValid;
  }

  private handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!this.isValid) {
      return;
    }

    this.props.onSubmit();
  }

  private handleTitleChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.stopPropagation();

    const newTitle: string = evt.currentTarget.value;
    this.setState({ titleIsValid: newTitle.length <= ArticleForm.TITLE_MAX_LENGTH });
    this.props.onTitleChange(evt.currentTarget.value);
  }
}
