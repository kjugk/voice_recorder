import * as React from 'react';

interface TimerProps {
  curPos: number;
  duration: number;
}

const minu = (sec: number) => {
  let minStr = '';
  const tmp = Math.floor(sec / 60);
  if (tmp < 10) {
    minStr = '0' + tmp;
  } else {
    minStr = '' + tmp;
  }

  return minStr;
};

const formatter = (sec: number): string => {
  const min = minu(sec);

  let secStr = '';
  const tmp = Math.floor(sec);

  if (tmp < 10) {
    secStr = '0' + tmp;
  } else {
    secStr = '' + tmp;
  }

  return min + ':' + secStr;
};

export class Timer extends React.Component<TimerProps> {
  public render() {
    if (this.props.curPos > this.props.duration) {
      return (
        <span>
          {formatter(this.props.duration)} / {formatter(this.props.duration)}
        </span>
      );
    } else {
      return (
        <span>
          {formatter(this.props.curPos)} / {formatter(this.props.duration)}
        </span>
      );
    }
  }
}
