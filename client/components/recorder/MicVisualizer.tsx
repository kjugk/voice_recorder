import * as React from 'react';
import * as classnames from 'classnames';
import Player from '../../lib/Player';
import { requestMicPermission } from '../../lib/Media';

interface MicVisualizerProps {
  stream?: MediaStream;
  isRecording: boolean;
}
export class MicVisualizer extends React.Component<MicVisualizerProps> {
  private static HEIGHT = 140;
  private static BAR_SPACE = 1;
  private canvas: any;
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;

  public componentDidMount() {
    const canvasCtx = this.canvas.getContext('2d');
    const stream = this.props.stream as MediaStream;
    const width = this.canvas.clientWidth;

    this.audioCtx = Player.getContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.audioCtx.createMediaStreamSource(stream).connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(245, 245, 245)';
      canvasCtx.fillRect(0, 0, width, MicVisualizer.HEIGHT);

      const barWidth = width / bufferLength;
      const barColor = this.props.isRecording ? 'hsl(348, 100%, 61%)' : 'hsl(171, 100%, 41%)';
      let barHeight = 0;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = barColor;
        canvasCtx.fillRect(x, MicVisualizer.HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + MicVisualizer.BAR_SPACE;
      }
    };

    draw();
  }

  public render() {
    return (
      <canvas
        style={{ width: '100%', height: '140px' }}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
      />
    );
  }
}
