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
