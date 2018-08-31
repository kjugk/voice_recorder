import * as React from 'react';
import { formatDurationToTime } from '../../lib/Player';

interface TotalTimeFieldProps {
  duration: number;
}

export const TotalTimeField: React.SFC<TotalTimeFieldProps> = (props) => {
  return (
    <div className="field">
      <label className="label">Total time</label>
      <div>{formatDurationToTime(props.duration)}</div>
    </div>
  );
};
