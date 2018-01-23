import * as React from 'react';

export interface PlayerProps {
  isLoading: boolean;
  isPlaying: boolean;
  title: string;
  duration?: number;
  curPos?: number;
  onPlay: () => any;
  onPause: () => any;
}

export class Player extends React.Component<PlayerProps> {
  public render() {
    const { title, isLoading, isPlaying, curPos, duration } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h5 className="title is-6">{title}</h5>
        <div>
          {curPos}/{duration}
        </div>
        {this.renderButton()}
      </div>
    );
  }

  private renderButton() {
    const { isPlaying, onPause, onPlay } = this.props;

    if (isPlaying) {
      return <button onClick={onPause}>pause</button>;
    } else {
      return <button onClick={onPlay}>play</button>;
    }
  }
}
