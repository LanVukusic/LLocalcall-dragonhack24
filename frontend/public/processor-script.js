/// <reference types="@types/audioworklet" />

/** Converts Float32 array to 16 bit little endian integer BufferArray */
export function floatTo16BitPCM(input) {
  // if (!input) {
  //   console.error('PROCESSOR-SCRIPT-ERROR');
  //   return;
  // }
  //Each 32bit (4byte) float from input is converted to one 16bit (2byte) integer.
  //Each element needs 2 bytes
  let buffer = new ArrayBuffer(input.length * 2);

  //Define view to raw buffer so we can set values as int16.
  let view = new DataView(buffer);

  for (let i = 0; i < input.length; i++) {
    //Limit input to [-1, -1]
    const s = Math.max(-1, Math.min(1, input[i]));

    //Convert float32 to int16 and force little endian
    view.setInt16(2 * i, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return buffer;
}

class MicrophoneProcessor extends AudioWorkletProcessor {
  /**
   * @param {Float32Array[][]} inputs
   * @param {Float32Array[][]} outputs
   * @param {Record<string, Float32Array>} parameters
   * @returns {boolean}
   */
  process(inputs, outputs, parameters) {
    this.port.postMessage(floatTo16BitPCM(inputs[0][0]));
    return true;
  }
}

registerProcessor('mic-processor', MicrophoneProcessor);
