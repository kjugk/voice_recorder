import * as React from 'react';

interface LoaderProps {
  show: boolean;
}

export const Loader: React.SFC<LoaderProps> = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="c-loader">
      <span className="icon">
        <i className="fas fa-3x fa-spin fa-spinner" />
      </span>
    </div>
  );
};
