export{update};

import{canvasElement, maxRadius, timer, drawCtx, analyserNode, audioData, wallLineColor, waveData, playing, hammerImg} from './main.js';
import{makeColor, manipulatePixels} from './helper-functions.js';

let defaultWaveValue = 0;
let gradientFrame = 0;
let imgFrame = 0;

function update() { 
			// this schedules a call to the update() method in 1/60 seconds
			requestAnimationFrame(update);
			//timer++;

			//delayNode.delayTime.value = delayAmount;
			
			/*
				Nyquist Theorem
				http://whatis.techtarget.com/definition/Nyquist-Theorem
				The array of data we get back is 1/2 the size of the sample rate 
			*/
			
			// populate the audioData with the frequency data
			// notice these arrays are passed "by reference" 
			analyserNode.getByteFrequencyData(audioData);
			analyserNode.getByteTimeDomainData(waveData);
		
			// OR
			//analyserNode.getByteTimeDomainData(audioData); // waveform data
			
			// DRAW!
			drawCtx.clearRect(0,0,800,800);  

			if(document.querySelector('#gradientBG').checked)
			{
				let grad = drawCtx.createLinearGradient(0, 0, 540, 540);
				if(playing){
					if(gradientFrame <= 360){
						//grad.addColorStop(0, "blue");
						grad.addColorStop(0, makeColor(50, 50, 200, 255));
					}
					else if(gradientFrame > 360 && gradientFrame <= 720){
						//grad.addColorStop(0, "green");
						grad.addColorStop(0, makeColor(50, 200, 50, 255));
					}
					else if(gradientFrame > 720 && gradientFrame <= 1080){
						//grad.addColorStop(0, "red");
						grad.addColorStop(0, makeColor(200, 50, 50, 255));
					}
					else
						gradientFrame = 0;
				}
				grad.addColorStop(1, "white");
				drawCtx.save();
				drawCtx.fillStyle = grad;
				drawCtx.fillRect(0, 0, 640, 640);
				drawCtx.restore();
				
				gradientFrame++;
			}

			let barWidth = 4;
			let barSpacing = 3;
			let barHeight = 100;
			let topSpacing = drawCtx.canvas.height / 2;
			
			drawCtx.strokeStyle = wallLineColor;
			for(let i = 1; i < 12; i++){
				if(i != 6){
					drawCtx.beginPath();
					drawCtx.moveTo(0, drawCtx.canvas.height * (i / 12));
					drawCtx.lineTo(drawCtx.canvas.width, drawCtx.canvas.height * (i / 12));
					drawCtx.closePath();
					drawCtx.stroke();
				}
			}
			
			drawCtx.beginPath();
			drawCtx.moveTo(0, drawCtx.canvas.height - topSpacing);
			
			// loop through the data and draw!
			for(let i=0; i<audioData.length; i++) { 
				//drawCtx.fillStyle = 'rgba(0,255,0,0.6)'; 
				drawCtx.strokeStyle = wallLineColor;
				
				// the higher the amplitude of the sample (bin) the taller the bar
				// remember we have to draw our bars left-to-right and top-down
				//drawCtx.fillRect(i * (barWidth + barSpacing),topSpacing + 256-audioData[i],barWidth,barHeight); 
				let barX = i * (barWidth + barSpacing);
				drawCtx.lineTo(barX, drawCtx.canvas.height - topSpacing);
				if(playing)
					drawCtx.lineTo(barX + barWidth, drawCtx.canvas.height - (topSpacing * 1) - (waveData[i] - defaultWaveValue));
				else
					drawCtx.lineTo(barX + barWidth, drawCtx.canvas.height - topSpacing);
				
			}

			drawCtx.lineTo(drawCtx.canvas.width, drawCtx.canvas.height - topSpacing);
			drawCtx.lineTo(drawCtx.canvas.width, 0);
			drawCtx.lineTo(0, 0);
			drawCtx.closePath();
			drawCtx.stroke();

			for(let i = 1; i < 12; i++){
				for(let j = 0; j < 6; j++){
					drawCtx.beginPath();
					if(i % 2 == 0 && playing){
						drawCtx.moveTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)) + (drawCtx.canvas.height * (1 / 12)));
						drawCtx.lineTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)) + (drawCtx.canvas.height * (1 / 12)) - audioData[Math.round(audioData.length * (i / 36))] * 0.25);
					}
					else if(i % 2 == 1 && playing){
						drawCtx.moveTo(drawCtx.canvas.width * (i / 12), drawCtx.canvas.height * (j / 6) + (drawCtx.canvas.height * (2 / 12)));
						drawCtx.lineTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)) + (drawCtx.canvas.height * (2 / 12))- audioData[Math.round(audioData.length * (i / 36))] * 0.25);
					}
					else if(i % 2 == 0 && !playing){
						drawCtx.moveTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)));
						drawCtx.lineTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)) + (drawCtx.canvas.height * (1 / 12)));
					}
					else{
						drawCtx.moveTo(drawCtx.canvas.width * (i / 12), drawCtx.canvas.height * (j / 6) + (drawCtx.canvas.height * (1 / 12)));
						drawCtx.lineTo(drawCtx.canvas.width * (i / 12), (drawCtx.canvas.height * (j / 6)) + (drawCtx.canvas.height * (2 / 12)));
					}
					drawCtx.closePath();
					drawCtx.stroke();
				}
			}
			
			if(playing){
				let imgWidth = 150 + audioData[Math.round(audioData.length / 36)];
				let imgHeight = 150 + audioData[Math.round(audioData.length / 36)];
				drawCtx.drawImage(hammerImg, imgFrame - 1000, (drawCtx.canvas.height/2) - (imgHeight / 2), imgWidth, imgHeight);
				if(imgFrame >= 2000)
					imgFrame = 0;
			}

			if(defaultWaveValue == 0)
			{
				defaultWaveValue = waveData[0];
			}

			imgFrame++;
			manipulatePixels(drawCtx);
		} 