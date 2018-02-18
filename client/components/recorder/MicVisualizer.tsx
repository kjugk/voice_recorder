import * as React from 'react';
import * as classnames from 'classnames';
import * as d3 from 'd3';
import Player from '../../lib/Player';

interface MicVisualizerProps {
  stream?: MediaStream;
  isRecording: boolean;
}
export class MicVisualizer extends React.Component<MicVisualizerProps> {
  private static BAR_SPACE = 3;
  private static SVG_HEIGHT = 150;
  private static FFT_SIZE = 128;
  private svgElem: any;
  private requestId: number = 0;

  public componentDidMount() {
    const stream = this.props.stream as MediaStream;
    if (!stream) { return; }

    const width = this.svgElem.clientWidth;
    const height = MicVisualizer.SVG_HEIGHT;
    const svg = d3.select('svg');
    const audioCtx = Player.getContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = MicVisualizer.FFT_SIZE;
    audioCtx.createMediaStreamSource(stream).connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    svg
      .selectAll('rect')
      .data(Array.from(dataArray))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * width / dataArray.length)
      .attr('width', width / dataArray.length - MicVisualizer.BAR_SPACE);

    const draw = () => {
      this.requestId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      svg
        .selectAll('rect')
        .data(Array.from(dataArray))
        .attr('y', (d) => height - d)
        .attr('height', (d) => d);
    };

    draw();
  }

  public componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }

  public render() {
    const c = classnames('c-visualizer', { on: this.props.isRecording });

    return (
      <svg
        className={c}
        width="100%"
        height="150"
        ref={(svg) => {
          this.svgElem = svg;
        }}
      />
    );
  }
}
