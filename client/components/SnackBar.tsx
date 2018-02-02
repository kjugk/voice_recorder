import * as React from 'react';
import * as classnames from 'classnames';

interface SnackBarProps {
  message: string;
}

export class SnackBar extends React.Component<SnackBarProps> {
  public render() {
    const { message } = this.props;
    const c = classnames('c-snackbar', { hidden: message === '' });

    return <div className={`notification is-primary ${c}`}>{message}</div>;
  }
}
