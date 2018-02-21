import * as React from 'react';
import * as prettyBytes from 'pretty-bytes';

interface FileSizeFieldProps {
  size: number;
}

export const FileSizeField: React.SFC<FileSizeFieldProps> = (props) => {
  return (
    <div className="field">
      <label className="label">File size</label>
      <div>{prettyBytes(props.size)}</div>
    </div>
  );
};
