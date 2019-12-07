import React, {Component} from 'react'
import {BrowserRouter, HashRouter, Router, Route, Link, NavLink, Redirect,Prompt } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as tf from '@tensorflow/tfjs'
import './styles.scss';

window.jQuery = window.$ = require('jquery');
require('velocity-animate');
require('velocity-animate/velocity.ui');


const IMAGE_SIZE = 784;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = 65000;

const TRAIN_TEST_RATIO= 5 / 6;
const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);


const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

const MNIST_IMAGES_SPRITE_PATH =
    'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';
const MNIST_LABELS_PATH =
    'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8';



class BrowserUtils {

    constructor() {
        /* eslint-disable */
        this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
        this.isSafari = navigator.userAgent.indexOf('Safari') > -1;
        this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        this.isIE = navigator.userAgent.indexOf('MSIE') > -1;
        this.isEdge = navigator.userAgent.indexOf('Edge') > -1;
        this.isMobile = false;
        this.isChrome = /chrome/i.test(navigator.userAgent);
        this.isCompatible;

        if (this.isChrome) {
            this.isSafari = false;
        }

        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            this.isMobile = true;
        }

        if (this.isMobile) {
            let androidVersion = this.getAndroidVersion();
            if (androidVersion) {
                this.isSafari = false;
            }
            if (androidVersion && androidVersion >= 7) {
                this.isCompatible = true;
            }

            if (
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia &&
                this.isSafari
            ) {
                this.isCompatible = true;
            }
        } else {
            if (
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia &&
                !this.isEdge &&
                !this.isIE
            ) {
                this.isCompatible = true;
            }
        }
        if (this.isCompatible) {
            this.isCompatible = this.webglSupport();
        }
    }

    webglSupport() {
        var canvas;
        var ctx;
        var exts;
        var support = false;

        try {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            exts = ctx.getSupportedExtensions();
        } catch (e) {
            return support;
        }

        if (ctx !== undefined) {
            support = true;
        }

        for (var i = -1, len = exts.length; ++i < len; ){
            support = true;
        }

        canvas = undefined;
        console.log(support);
        return support;
    };

    getAndroidVersion() {
        let ua = (navigator.userAgent).toLowerCase();
        let match = ua.match(/android\s([0-9\.]*)/);
        return match ? parseInt(match[1], 10) : false;
    }
    /* eslint-enable */
}


let AudioContext = window.AudioContext || window.webkitAudioContext;
let GLOBALS = {
	button: {
		padding: 0,
		frontHeight: 40,
		states: {
			normal: {
				x: 8,
				y: 8
			},
			pressed: {
				x: 4,
				y: 4
			}
		}
	},
	classNames: [
	'green',
	'purple',
	'orange',
	'red'
	],
	colors: {
		'green': '#2baa5e',
		'purple': '#c95ac5',
		'orange': '#dd4d31',
		'red': '#e8453c'
	},
	rgbaColors: {
		'green': 'rgba(43, 170, 94, 0.25)',
		'purple': 'rgba(201, 90, 197, 0.25)',
		'orange': 'rgba(221, 77, 49, 0.25)',
		'red': 'rgba(232, 69, 60, 0.25)'
	},
	classId: null,
	predicting: false,
	micThreshold: 25,
	classesTrained: {
		'green': false,
		'purple': false,
		'orange': false
	},
	numClasses: 3,
	audioContext: new AudioContext(),
    isBackFacingCam: false
};
GLOBALS.browserUtils = new BrowserUtils()
class TextToSpeech {
	constructor() {
		this.voices = [];
		this.voice = null;
		this.message = null;
		if (typeof speechSynthesis === 'object' && typeof speechSynthesis.onvoiceschanged === 'function') {
			speechSynthesis.onvoiceschanged = this.setVoice;
		}

	}

	setVoice() {
		this.voices = window.speechSynthesis.getVoices();
		this.voice = this.voices.filter(function(voice) { 
			return voice.name === 'Google US English Female';
		})[0];
	}

	stop() {
		window.speechSynthesis.cancel();
	}

	say(text, callback) {
		this.message = new SpeechSynthesisUtterance();
		this.message.text = text;
		this.message.voice = this.voice;
		this.message.rate = 0.9;
		this.message.lang = 'en-US';
		this.message.addEventListener('end', callback);
		window.speechSynthesis.speak(this.message);
	}
}
class Webcam {
    constructor() {
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        this.video.setAttribute('playsinline', '');
        this.blankCanvas = document.createElement('canvas');
        this.blankCanvas.width = 227;
        this.blankCanvas.height = 227;
    }
    setup() { 
        let video = true;
        video = {facingMode: (GLOBALS.isBackFacingCam) ? 'environment' : 'user'};
        window.navigator.mediaDevices.getUserMedia({
            video:true,
            audio: true
        })
        .then((stream) => {
            GLOBALS.audioContext.createMediaStreamSource(stream);
            CLOBALS.stream = stream;
        });
        this.video.addEventListener('loadedmetadata', this.videoLoaded.bind(this));
        this.video.srcObject = stream;
        this.video.width = 227;
        this.video.height = 227;
    }
}

class MnistData{
    constructor() {
        this.shuffledTraindIndex = 0;
        this.shuffledTestIndex = 0;
    }
    async load() {

        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgReq = new Promise((resolve, reject) => {
            img.crossOrigin=''
            img.onload = () => {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
                const buf = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
                const chunk = 5000;
                cavas.width = img.width;
                canvas.height = chunk;

                for (let i = 0; i < NUM_DATASET_ELEMENTS /chunk; i++) {
                    const viewBuf = new Float32Array(buf, i * IMAGE_SIZE * chunk * 4, IMAGE_SIZE * chunk);
                    ctx.drawImage(img, 9, i * chunk, img.width, chunk, 0, 0, img.widht, chunk);
                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    for (let j = 0; j < imgData.data.length / 4; j++) {
                        viewBuf[j] = imgData.data[j * 4] / 255;
                    }
                }
                this.dataImages = new Float32Array(buf);
                resolve();
            };
            img.src = MNIST_IMAGES_SPRITE_PATH;
        });
    
    }
}              
 

export default  class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "deng",
            "age": 56
        };
         this.A = new Float32Array(32);
         this.A[0] = 0;
        this.element = document.createElement('div');
        this.element.classList.add('input_camera');
        this.webcam = new Webcam();
        this.element.appendChild(this.webcam.video);
        this.webcam.video.addEventListener(
                   'loadeddata', this.videoLoaded.bind(this));
        window.addEventListener('resize', this.size.bind(this));
    }

    videoLoaded() {
        this.videoWidth = this.webcam.video.videoWidth;
        this.videoHeight = this.webcam.video.videoHeight;
        this.videoRatio = this.videoWidth / this.videoHeight;
        this.size();
    }
    
    size() {
        this.width = this.element.offsetWidth;
        this.height = this.width;
        this.webcam.video.width = 227;
        this.webcam.video.height = 227;
    }
  
    enterHandler = (event, ele) => {
        ele.toggleClass("hover");
        $(".hover").velocity("stop").velocity({ scale: 1.25 }, { duration: 200 });
    }

    leaveHandler = (event, ele) => {
        $(".hover").velocity("stop").velocity({ scale: 1 }, { duration: 200 }).toggleClass("hover");
    }

   
    componentDidMount() {
        const that = this;
        $(".radial-menu-button").mouseenter(function(e) {
            that.enterHandler(event, $(this));
        }).mouseleave(function() {
            that.leaveHandler(event, $(this));
        });
        console.log("ggg");
        //this.testFloat32Buffer();
    }

    async test() {
        data = new MnistData();
        await data.load();
    }
    testFloat32Buffer() {
        this.A[0] = this.A[0] + 1;
        console.log("ggg");
        alert(this.A[0]);
    }   
    render() {
        const {name, age} = this.state;
        const {gameId, phone} = this.props;
        return <div>
                 <div className="radial-menu-button">test</div>
                 <div> <h1> hello </h1> </div>
               </div>;
    };
}

App.propTypes = {
    gameId: PropTypes.string,
    loginTime: PropTypes.number,
    phone: PropTypes.string
}

App.defaultProps = {
    gameId: "deng",
    phone: "123456789"
}
