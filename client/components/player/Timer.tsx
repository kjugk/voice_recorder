import * as React from 'react';
import { formatDurationToTime } from '../../lib/Player';

interface TimerProps {
  curPos: number;
  duration: number;
}

export class Timer extends React.Component<TimerProps> {
  public render() {
    const { duration, curPos } = this.props;

    if (this.props.curPos > this.props.duration) {
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
  }
}
