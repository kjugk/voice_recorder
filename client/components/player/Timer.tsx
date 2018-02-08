import * as React from 'react';
import { formatDurationToTime } from '../../lib/Player';

interface TimerProps {
  curPos: number;
  duration: number;
}

export const Timer: React.SFC<TimerProps> = (props) => {
  const { duration, curPos } = props;

  if (curPos > duration) {
    return (
      <span>
        {formatDurationToTime(duration)} / {formatDurationToTime(duration)}
      </span>
    );
  } else {
    return (
      <span>
        {formatDurationToTime(curPos)} / {formatDurationToTime(duration)}
      </span>
    );
  }
};
