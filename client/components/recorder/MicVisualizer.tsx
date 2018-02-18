import * as React from 'react';
import Player from '../../lib/Player';
import { requestMicPermission } from '../../lib/Media';

import * as d3 from 'd3';

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
  private requestId: number = 0;

  public componentDidMount() {
    const stream = this.props.stream as MediaStream;
    const height = 140;
    const width = 300;
    const svg = d3.select('svg');
    this.audioCtx = Player.getContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.audioCtx.createMediaStreamSource(stream).connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const x = d3
      .scaleBand()
      .padding(0.1)
      .rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([150, 0]);
    const g = svg.append('g');

    this.analyser.getByteFrequencyData(dataArray);

    const xxxx: string[] = [];
    for (let i = 0; i < 128; i++) {
      xxxx.push((i + 1).toString());
    }

    const draw = () => {
      // this.requestId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);
      const d: number[] = Array.from(dataArray, (ddd) => ddd);
      const max = d3.max(d, (zzz) => zzz) || 0;
      x.domain(xxxx);
      y.domain([0, max]);

      g.selectAll('.bar').data(d)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (dd, i) => x(i.toString()) || '')
        .attr('y', (dd) => y(dd))
        .attr('width', x.bandwidth())
        .attr('height', (dd) => 150 - y(dd));

      // bar.exit().remove();
      // bar
      //   .transition()
      //   .duration(200)
      //   .attr('x', (dd, i) => x(i.toString()) || '')
      //   .attr('y', (dd) => y(dd) || 0);

      setTimeout(draw, 500);
    };

    draw();

    /*
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
      this.requestId = requestAnimationFrame(draw);
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
    */
  }

  public componentWillUnmount() {
    if (this.requestId > 0) {
      cancelAnimationFrame(this.requestId);
    }
  }

  public render() {
    return (
      <>
        <svg id="svg" width="300" height="150" />
        <canvas
          style={{ width: '100%', height: '140px' }}
          ref={(canvas) => {
            this.canvas = canvas;
          }}
        />
      </>
    );
  }
}
