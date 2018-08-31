import * as Api from '../lib/Api';
const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;

export default class Player {
  private static ctx: AudioContext;
  public static getContext(): AudioContext {
    if (!Player.ctx) {
      Player.ctx = new AudioContext();
    }
    return Player.ctx;
  }

  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private startOffset: number;
  private startTime: number;

  constructor() {
    this.startOffset = 0;
    this.startTime = 0;
  }

  public loadTrack = (id: string): Promise<number> => {
    return new Promise<number>((resolve) => {
      Api.getTrackFromStorage(id).then((response: any) => {
        Player.getContext().decodeAudioData(response, (decodedData: AudioBuffer) => {
          this.buffer = decodedData;
          resolve(this.buffer.duration);
        });
      });
    });
  }

  public play(): void {
    this.startTime = Player.getContext().currentTime;
    this.source = Player.getContext().createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(Player.getContext().destination);
    this.source.start(0, this.startOffset % this.buffer.duration);
  }

  public pause(): void {
    if (!this.source) {
      return;
    }
    this.startOffset = Player.getContext().currentTime - this.startTime;
    this.source.stop(0);
  }

  public stop(): void {
    if (!this.source) {
      return;
    }
    this.startOffset = 0;
    this.source.stop(0);
  }

  public getDuration(): number {
    return this.startOffset + (Player.getContext().currentTime - this.startTime);
  }

  public isEnded(): boolean {
    return this.getDuration() >= this.buffer.duration;
  }
}

export const getDurationFromFile = (audio: Blob): Promise<number> => {
  return new Promise<number>((resolve) => {
    const fr = new FileReader();

    fr.onload = () => {
      const context = Player.getContext();
      context.decodeAudioData(fr.result as ArrayBuffer, (decodeAudioData: AudioBuffer) => {
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
