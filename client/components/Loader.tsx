import * as React from 'react';
import * as classnames from 'classnames';

export enum LoaderSize {
  SMALL,
  LARGE
}

interface LoaderProps {
  show?: boolean;
  size?: LoaderSize;
}

export const Loader: React.SFC<LoaderProps> = (props) => {
  if (!props.show) {
    return null;
  }

  const c = classnames('fas fa-spin fa-spinner', {
    'fa-2x': props.size === LoaderSize.SMALL,
    'fa-3x': props.size === LoaderSize.LARGE
  });

  return (
    <div className="c-loader">
      <span className="icon">
        <i className={c} />
      </span>
    </div>
  );
};

Loader.defaultProps = {
  show: true,
  size: LoaderSize.LARGE
};
