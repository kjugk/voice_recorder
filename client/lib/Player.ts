import * as Api from '../lib/Api';

const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;

let ctx: AudioContext;
export const getContext = (): AudioContext => {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
};

export default class Player {
  private context: AudioContext;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private startOffset: number;
  private startTime: number;

  constructor() {
    this.context = getContext();
    this.startOffset = 0;
    this.startTime = 0;
  }

  public loadTrack = (id: string) => {
    return new Promise((resolve) => {
      Api.getTrackFromStorage(id).then((response: any) => {
        this.context.decodeAudioData(response, (decodedData: AudioBuffer) => {
          this.buffer = decodedData;
          resolve(this.buffer.duration);
        });
      });
    });
  };

  public play() {
    this.startTime = this.context.currentTime;
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(0, this.startOffset % this.buffer.duration);
  }

  public pause() {
    if (!this.source) {
      return;
    }
    this.startOffset = this.context.currentTime - this.startTime;
    this.source.stop(0);
  }

  public stop() {
    if (!this.source) {
      return;
    }
    this.startOffset = 0;
    this.source.stop(0);
  }

  public getDuration() {
    return this.startOffset + (this.context.currentTime - this.startTime);
  }

  public isEnded() {
    return this.getDuration() >= this.buffer.duration;
  }
}

export const getDurationFromFile = (audio: Blob) => {
  return new Promise((resolve) => {
    const fr = new FileReader();

    fr.onload = () => {
      const context = getContext();
      context.decodeAudioData(fr.result, (decodeAudioData: AudioBuffer) => {
        resolve(decodeAudioData.duration);
      });
    };
    fr.readAsArrayBuffer(audio);
  });
};

export const formatDurationToTime = (duration: number): string => {
  return formatToMinutes(duration) + ':' + formatToSeconds(duration);
};

const formatToSeconds = (seconds: number): string => {
  const t = Math.floor(seconds % 60);
  return t < 10 ? '0' + t : '' + t;
};

const formatToMinutes = (seconds: number): string => {
  const t = Math.floor(seconds / 60);
  return t < 10 ? '0' + t : '' + t;
};
