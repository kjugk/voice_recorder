import * as React from 'react';
import * as classnames from 'classnames';
import * as d3 from 'd3';
import Player from '../../../lib/Player';

interface VisualizerProps {
  stream?: MediaStream;
  isRecording: boolean;
}
export class Visualizer extends React.Component<VisualizerProps> {
  private static BAR_SPACE = 0.1;
  private static SVG_HEIGHT = 150;
  private static FFT_SIZE = 128;
  private containerElem: any;
  private requestId: number = 0;

  public componentDidMount() {
    const stream = this.props.stream as MediaStream;
    if (!stream) {
      return;
    }

    const width = this.containerElem.offsetWidth;
    const height = Visualizer.SVG_HEIGHT;
    const svg = d3.select('svg');
    const audioCtx = Player.getContext();
    const analyser = audioCtx.createAnalyser();

    analyser.fftSize = Visualizer.FFT_SIZE;
    audioCtx.createMediaStreamSource(stream).connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(Visualizer.BAR_SPACE);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const ar = [];
    for (let i = 0; i < Visualizer.FFT_SIZE / 2; i++) {
      ar.push('' + i);
    }

    x.domain(ar);
    y.domain([0, 255]);

    svg
      .selectAll('rect')
      .data(Array.from(dataArray))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x('' + i) || '0')
      .attr('width', x.bandwidth());

    const draw = () => {
      this.requestId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      svg
        .selectAll('rect')
        .data(Array.from(dataArray))
        .attr('y', (d) => y(d))
        .attr('height', (d) => height - y(d));
    };

    draw();
  }

  public componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }

  public render() {
    const c = classnames('c-visualizer', { on: this.props.isRecording });

    return (
      <div
        style={{ width: '100%', height: '150px' }}
        ref={(container) => {
          this.containerElem = container;
        }}
      >
        <svg className={c} width="100%" height="100%" />
      </div>
    );
  }
}
