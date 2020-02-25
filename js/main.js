export{audioElement, canvasElement, playButton, maxRadius, timer, drawCtx, audioCtx, delayAmount, delayNode, waveform, activeOscillators,
		sourceNode, analyserNode, gainNode, filterNode, audioData, keyboardFrequencies, wallLineColor, waveData, playing, hammerImg};
export{init};

import{update} from './update.js';
import{keyDown, keyUp, requestFullscreen} from './helper-functions.js';
		
		// SCRIPT SCOPED VARIABLES
				
		// 1- here we are faking an enumeration - we'll look at another way to do this soon 
		const SOUND_PATH = Object.freeze({
			sound1: "https://people.rit.edu/mvh9602/330/project1/media/PigsOnTheWing.mp3",
			sound2: "https://people.rit.edu/mvh9602/330/project1/media/Dogs.mp3"
		});
		
		// 2 - elements on the page
		let audioElement,canvasElement;
		
		// UI
		let playButton;
		let maxRadius = 1;
		let timer = 0;
		
		// 3 - our canvas drawing context
		let drawCtx;
		
		// 4 - our WebAudio context
		let audioCtx;
		let delayAmount = 0.5;
    	let delayNode;
		let waveform = 'sawtooth';
		const activeOscillators = {};
		let wallLineColor = '#555d69';
		let playing = false;
		let hammerImg;
		
		// 5 - nodes that are part of our WebAudio audio routing graph
		let sourceNode, analyserNode, gainNode, filterNode;
		
		// 6 - a typed array to hold the audio frequency data
		const NUM_SAMPLES = 256;
		// create a new array of 8-bit integers (0-255)
		let audioData = new Uint8Array(NUM_SAMPLES/2); 
		let waveData = new Uint8Array(NUM_SAMPLES/2); 

		//NOTE: I used a medium article on creating a keyboard, but I can't remember what I looked up to find it
		//		I primarily used the article for keyboard codes and tonal frequencies
		//		The article also inpired my waveform and envelope radios
		//		I will let you know if I find the link to this article soon
		const keyboardFrequencies = {
			'90': 261.6, //Z: C
			'83': 277.2, //S: C#
			'88': 293.7, //X: etc...
			'68': 311.1, //D
			'67': 329.6, //C
			'86': 349.2, //V
			'71': 370.0, //G
			'66': 392.0, //B
			'72': 415.3, //H
			'78': 440.0, //N
			'74': 466.2, //J
			'77': 493.9, //M
			'81': 523.3, //Q: C
			'50': 554.4, //2
			'87': 587.3, //W
			'51': 622.3, //3
			'69': 659.3, //E
			'82': 698.5, //R
			'53': 740.0, //5
			'84': 784.0, //T
			'54': 830.6, //6
			'89': 880.0, //Y
			'55': 932.3, //7
			'85': 987.8, //U
			'73': 1043.6 //I: C
		}

		function init(){
			setupWebaudio();
			setupCanvas();
			setupUI();
			update();
		}
		
		function setupWebaudio(){
			// 1 - The || is because WebAudio has not been standardized across browsers yet
			const AudioContext = window.AudioContext || window.webkitAudioContext;
			audioCtx = new AudioContext();
			
			// 2 - get a reference to the <audio> element on the page
			audioElement = document.querySelector("audio");
			audioElement.src = SOUND_PATH.sound1;
			
			// 3 - create an a source node that points at the <audio> element
			sourceNode = audioCtx.createMediaElementSource(audioElement);
			
			// 4 - create an analyser node
			analyserNode = audioCtx.createAnalyser();

			//delayNode = audioCtx.createDelay();
    		//delayNode.delayTime.value = delayAmount;

			filterNode = audioCtx.createBiquadFilter();
			
			/*
			We will request NUM_SAMPLES number of samples or "bins" spaced equally 
			across the sound spectrum.
			
			If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
			the third is 344Hz. Each bin contains a number between 0-255 representing 
			the amplitude of that frequency.
			*/ 
			
			// fft stands for Fast Fourier Transform
			analyserNode.fftSize = NUM_SAMPLES;
			
			// 5 - create a gain (volume) node
			gainNode = audioCtx.createGain();
			gainNode.gain.value = 1;

			/*
			oscillator = audioCtx.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(fundFreq, audioCtx.currentTime);
			
			oscillator.start();
			*/
			
			// 6 - connect the nodes - we now have an audio graph
			sourceNode.connect(audioCtx.destination);
    		sourceNode.connect(filterNode);
			//delay.connect(filterNode);
			filterNode.connect(analyserNode);
			analyserNode.connect(gainNode);
			gainNode.connect(audioCtx.destination);

			window.addEventListener('keydown', keyDown, false);
			window.addEventListener('keyup', keyUp, false);
		}
		
		function setupCanvas(){
			canvasElement = document.querySelector('canvas');
			drawCtx = canvasElement.getContext("2d");

			hammerImg = new Image();
			hammerImg.src = "./media/audio-viz-hammers.png";
		}
		
		function setupUI(){
			playButton = document.querySelector("#playButton");
			playButton.onclick = e => {
				console.log(`audioCtx.state = ${audioCtx.state}`);
				
				// check if context is in suspended state (autoplay policy)
				if (audioCtx.state == "suspended") {
					audioCtx.resume();
				}

				if (e.target.dataset.playing == "no") {
					audioElement.play();
					playing = true;
					e.target.dataset.playing = "yes";
				// if track is playing pause it
				} else if (e.target.dataset.playing == "yes") {
					audioElement.pause();
					playing = false;
					e.target.dataset.playing = "no";
				}
	
			};
			
			let volumeSlider = document.querySelector("#volumeSlider");
			volumeSlider.oninput = e => {
				gainNode.gain.value = e.target.value;
				volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
			};
			volumeSlider.dispatchEvent(new InputEvent("input"));

			//Event not connected I believe
			/*
			let timeSlider = document.querySelector("#timeSlider");
			audioElement.timeupdate = e => {
				console.log("writing timeupdate...");
				timeSlider.value = audioElement.currentTime / audioElement.duration;
				timeLabel.innerHTML = audioElement.currentTime +" / " + audioElement.duration;
			};
			*/
			
			document.querySelector("#trackSelect").onchange = e =>{
				audioElement.src = e.target.value;
				// pause the current track if it is playing
				playButton.dispatchEvent(new MouseEvent("click"));
			};
			
			document.querySelector("#waveform").onchange = e =>{
				waveform = e.target.value;
			}

			document.querySelector("#filterType").onchange = e =>{
				filterNode.type = e.target.value;
			}

			let frequencySlider = document.querySelector("#filterFrequency");
			frequencySlider.oninput = e => {
				filterNode.frequency.setValueAtTime(e.target.value, audioCtx.currentTime);
				frequencyLabel.innerHTML = Math.round(e.target.value);
			};
			frequencySlider.dispatchEvent(new InputEvent("input"));
			
			// if track ends
			audioElement.onended =  _ => {
				playButton.dataset.playing = "no";
			};
			
			document.querySelector("#fsButton").onclick = _ =>{
				requestFullscreen(canvasElement);
			};
		}