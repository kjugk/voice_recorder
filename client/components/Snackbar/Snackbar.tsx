import * as React from 'react';
import * as classnames from 'classnames';

interface Props {
  message: string;
}

export class Snackbar extends React.Component<Props> {
  public render() {
    const { message } = this.props;
    const c = classnames('notification is-primary c-snackbar', { hidden: message === '' });

    return <div className={`${c}`}>{message}</div>;
  }
}
