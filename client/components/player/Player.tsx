import * as React from 'react';

export interface PlayerProps {
  isPlaying: boolean;
  title: string;
  duration?: number;
  currentDuration?: number;
  onPlay: () => any;
  onPause: () => any;
}

export class Player extends React.Component<PlayerProps> {
  public render() {
    const { title, isPlaying } = this.props;

    return (
      <div>
        <h5>{title}{this.props.duration}</h5>
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
