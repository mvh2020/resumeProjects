export{keyDown, keyUp, makeColor, requestFullscreen, manipulatePixels};

import{audioCtx, waveform, activeOscillators, filterNode, keyboardFrequencies} from './main.js';

function keyDown(event){
			const key = (event.detail || event.which).toString();
			if(keyboardFrequencies[key] && !activeOscillators[key])
				playNote(key);
		}

		function keyUp(event){
			const key = (event.detail || event.which).toString();
			if(keyboardFrequencies[key] && activeOscillators[key])
			{
				activeOscillators[key].stop();
				delete activeOscillators[key];
			}
		}

		function playNote(key){
			const osc = audioCtx.createOscillator();
			osc.frequency.setValueAtTime(keyboardFrequencies[key], audioCtx.currentTime);
			osc.type = waveform;
			activeOscillators[key] = osc;
			activeOscillators[key].connect(filterNode);
			activeOscillators[key].start();
		}

		// HELPER FUNCTIONS
		function makeColor(red, green, blue, alpha){
   			var color='rgba('+red+','+green+','+blue+', '+alpha+')';
   			return color;
		}

		let redShift = 0;
		let greenShift = 0;
		let blueShift = 0;

		function manipulatePixels(ctx){
			let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

			let data = imageData.data;
			let length = data.length;
			let width = imageData.width;
			
			let hueShift = document.querySelector('#hueShift').checked;
			let noise = document.querySelector('#noise').checked;

			let i;
			for(i = 0; i < length; i += 4){

				if(noise && Math.random() < 0.05){
					data[i] = data[i + 1] = data[i + 2] = 0;
					data[i + 3] = 200;
				}

				if(hueShift){
					//data[i] = data[i] + 100;
					if(data[i] + redShift >= 255 && data[i + 1] + greenShift < 255){
						data[i + 1] = data[i + 1] + greenShift;
						greenShift++;
						//console.log("Shifting up green...");
					}
					else if(data[i] + redShift > 0 && data[i + 1] + greenShift >= 255){
						data[i] = data[i] + redShift;
						redShift--;
						//console.log("Shifting down red...");
					}
					else if(data[i + 1] + greenShift >= 255 && data[i + 2] + blueShift < 255){
						data[i + 2] = data[i + 2] + blueShift;
						blueShift++;
						//console.log("Shifting up blue...");
					}
					else if(data[i + 1] + greenShift > 0 && data[i + 2] + blueShift >= 255){
						data[i + 1] = data[i + 1] + greenShift;
						greenShift--;
						//console.log("Shifting down green...");
					}
					else if(data[i + 2] + blueShift >= 255 && data[i] + redShift < 255){
						data[i] = data[i] + redShift;
						redShift++;
						//console.log("Shifting up red...");
					}
					else if(data[i + 2] + blueShift > 0 && data[i] + redShift >= 255){
						data[i + 2] = data[i + 2] + blueShift;
						blueShift--;
						//console.log("Shifting down blue...");
					}
					else if(data[i] + redShift < 255){
						data[i] = data[i] + redShift;
						redShift++;
						//console.log("Shifting up red...");
					}
				}
			}
			ctx.putImageData(imageData, 0, 0)
		}
		
		function requestFullscreen(element) {
			if (element.requestFullscreen) {
			  element.requestFullscreen();
			} else if (element.mozRequestFullscreen) {
			  element.mozRequestFullscreen();
			} else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
			  element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
			  element.webkitRequestFullscreen();
			}
			// .. and do nothing if the method is not supported
		};