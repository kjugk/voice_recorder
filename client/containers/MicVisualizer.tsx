import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { getContext } from '../lib/Player';
import { requestMicPermission } from '../lib/Media';

interface MicVisualizerProps {
  stream: MediaStream;
}
class MicVisualizer extends React.Component<MicVisualizerProps> {
  private static WIDTH = 300;
  private static HEIGHT = 120;
  private static BAR_SPACE = 1;
  private canvas: any;
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;

  public componentDidMount() {
    const canvasCtx = this.canvas.getContext('2d');

    this.audioCtx = getContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.audioCtx.createMediaStreamSource(this.props.stream).connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(245, 245, 245)';
      canvasCtx.fillRect(0, 0, MicVisualizer.WIDTH, MicVisualizer.HEIGHT);

      const barWidth = MicVisualizer.WIDTH / bufferLength * 2; // 高い周波数がほぼ0 なので、右側に詰める
      const barColor = 'hsl(171, 100%, 41%)'; // props の状態で色を替える
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
      <div>
        <canvas
          style={{ width: 300, height: 120 }}
          ref={(canvas) => {
            this.canvas = canvas;
          }}
        />
      </div>
    );
  }
}

export default connect()(MicVisualizer);
