import * as React from 'react';
import { Link } from 'react-router-dom';

interface FabProps {
  className?: string;
  linkTo: string;
  title: string;
}

export const Fab: React.SFC<FabProps> = (props) => {
  return (
    <Link
      className={`button is-primary c-fab ${props.className}`}
      title={props.title}
      to={props.linkTo}
    >
      <span className="icon">
        <i className="fas fa-microphone" />
      </span>
    </Link>
  );
};

Fab.defaultProps = {
  className: ''
};
