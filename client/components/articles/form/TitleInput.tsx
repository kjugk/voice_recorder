import * as React from 'react';
import * as classnames from 'classnames';

interface TitleInputProps {
  isValid: boolean;
  value: string;
  onChange: () => any;
}

export const TitleInput: React.SFC<TitleInputProps> = (props) => {
  const className = classnames('input is-large', {
    'is-danger': !props.isValid
  });

  return (
    <div className="field">
      <label className="label">Title</label>
      <div className="control">
        <input className={className} type="text" value={props.value} onChange={props.onChange} />
      </div>
      {!props.isValid && <p className="help is-danger">10文字以内</p>}
    </div>
  );
};
