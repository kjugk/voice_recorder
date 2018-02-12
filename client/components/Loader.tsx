import * as React from 'react';
import * as classnames from 'classnames';

export enum LoaderSize {
  SMALL,
  LARGE
}

interface LoaderProps {
  show?: boolean;
  size?: LoaderSize;
  text?: string;
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
      {!!props.text && <h5 className="loader-text is-5 has-text-weight-bold">{props.text}</h5>}
    </div>
  );
};

Loader.defaultProps = {
  show: true,
  size: LoaderSize.LARGE,
  text: ''
};
