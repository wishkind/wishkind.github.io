import autobind from 'autobind-decorator';

export class Webcam {
    public flip: boolean;
    public width: number;
    public webcam: HTMLVideoElement;
    public canvas: HTMLCanvasElement;
   
    constructor(width = 400, height = 4500, flip = false) {
        this.width = width;
        this.height = height;
        this.flip = flip;
    }
    @autobind
    public getWebcam(options: MediaTrackContraints) {
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return Promise.reject("not support WebRTC");
        }
        options.width = 640;
    }

}
