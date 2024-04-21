export const getInputDevices = () => {
  return new Promise<MediaDeviceInfo[]>((resolve, reject) => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return reject(new Error('enumerateDevices() ni podprt.'));
    }

    return navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        resolve(devices.filter((dev) => dev.kind == 'audioinput'));
      })
      .catch(() => {
        return reject(new Error('Enumeracija vhodnih naprav ni mogoča'));
      });
  });
};

export class Streamer {
  source: MediaStreamAudioSourceNode | undefined;
  processor: AudioWorkletNode | undefined;

  constructor(
    stream: MediaStream,
    ctx: AudioContext,
    onDataAvailable: (ev: ArrayBuffer) => void,
  ) {
    // this line is added on load in --audioStore.ts--
    ctx.audioWorklet
      .addModule('processor-script.js')
      .then(() => {
        this.processor = new AudioWorkletNode(ctx, 'mic-processor');
        this.processor.port.onmessage = (e) => {
          onDataAvailable(e.data);
        };

        this.source = ctx.createMediaStreamSource(stream);
        this.source.connect(this.processor);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  destroy() {
    this.source?.disconnect();
    this.processor?.disconnect();
  }
}
