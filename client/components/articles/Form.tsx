import * as React from 'react';

interface FormProps {
  title: string;
  onSubmit: () => any;
  onTitleChange: (newTitle: string) => any;
}

export class Form extends React.Component<FormProps> {
  public render() {
    const { title } = this.props;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={title}
              onChange={this.handleTitleChange.bind(this)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button title="save" className="button is-primary" type="submit">
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
    this.props.onTitleChange(evt.currentTarget.value);
  }
}
