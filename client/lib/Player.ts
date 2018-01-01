import * as API from '../lib/API';

export default class Player {
  private context: AudioContext;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private startOffset: number;
  private startTime: number;

  constructor() {
    this.context = new AudioContext();
    this.startOffset = 0;
    this.startTime = 0;
  }

  public loadTrack = (url: string) => {
    return new Promise((resolve) => {
      API.getTrack(url).then((response: any) => {
        this.context.decodeAudioData(response, (decodedData: AudioBuffer) => {
          this.buffer = decodedData;
          resolve(this.buffer.duration);
        });
      });
    });
  };

  public play = () => {
    this.startTime = this.context.currentTime;
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(0, this.startOffset % this.buffer.duration);
  };

  public pause = () => {
    if (!this.source) {
      return;
    }
    this.startOffset = this.context.currentTime - this.startTime;
    this.source.stop(0);
  };

  public stop = () => {
    if (!this.source) {
      return;
    }
    this.startOffset = 0;
    this.source.stop(0);
  };

  public getDuration = (): number => {
    return this.startOffset + (this.context.currentTime - this.startTime);
  };

  public isEnded = (): boolean => {
    return this.getDuration() >= this.buffer.duration;
  };
}
