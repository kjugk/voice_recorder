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
        <input type="text" value={title} onChange={this.handleTitleChange.bind(this)} />
        <input type="submit" />
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
