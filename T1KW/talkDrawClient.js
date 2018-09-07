/* this program is launched each time a T1KW client is connected to the port(3000) where DadaSpeakerDrawserver is sharing informations to its clients
it receives a label called "distance" which will tell it to activate or not the reading of the generative poetry stored in dadapoem.txt 
with the computer voices. the dadapoem.txt file is updated daily by Dadastory.js program.
it will draw some shapes according to the sound environement's pitch, frequency, spectrum, volume   
when the reading is activated, a different set of shapes will be drawn according to the pitch, frequency, sprectrum, volume 
of the computer voices*/

/* References and  sources for borrowing Code
client reading infos from the server :https://www.youtube.com/watch?v=bjULmG8fqc8
Text-to-Speech with p5.Speech - Programming with Text: https://youtu.be/v0CHV33wDsI
Live Stream #63: Sound in p5.js https://www.youtube.com/watch?v=bM9MfoKe9GU
example drawing sketch with sounds : https://www.openprocessing.org/sketch/446310
drawing sketch with sounds , understanding the basic : :https://www.unicornsfartpixels.com/posts/2017-10-25audio-fft/
perlin noise : http://genekogan.com/code/p5js-perlin-noise/
*/


//variables for server

var socket;
var label = 'distance';
var activate;





//global variable for voices

//var countActivate = 0; // how many times before changing voices , smooth?
let speech;
let voices, voice;
let refText, index, sentence,phrase;
var iptr = 0; // a counter for the sentences
var v = 0;// a counter for the voices
//var dadaVoices=[0,28,20];// Alex. Moira,Lekha
var dadaVoices=[50,28,20];// list of computer voices
// var dadaNode  = 2;//characters drawing
let dadaName;

let play = true;
let playNum = 0;
var interval;
//28 Moira 49 Google UK English Female 27 Milena 26 Melina 39 Veena
//end variables voices

// Variables for the sound drawings=========

var showRays = false

var octaves = 3//3
var fftSmooth = 0.95
var frameSize = 512
var startMhz = 150
var endMhz = 12000
var beatThreshold = 0.9//0.4
var bpm = 120 //120
//size of drawings, transparency and brightness
var headRadius = 13//4,13
var wingSize = .4//.9
var dotSize = 4

var wingTransparency = 0.08//0.035 or 0.5 for very bright
var wingSaturationMultiplier = 0.65//0.8
var wingBrightness = bnorm(.6)//.6


var strokeTransparency = 0.8//.9
var strokeBaseBrightness = bnorm(.3)


var audio, fft, beat //, amplitude
var angle = 360, sign = 1
// var prevMouseX = 0

//perlin noise

var t;
//functions for the sound making
function bnorm(floatVal, low=0, high=255){return Math.round(floatVal*(high - low))}

//SETUP=================================================
function setup() {

  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  background(31,14,26);
  //perlin noise
    t=0;


  //+++++++++++++++set up for server talking and listening
  /*connecting to the server via sockets and reading message with the label=========*/
    socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
  //sharing
  //including data from the server
  //and use it in the function (message, function) ie (label,newDrawing)

    socket.on(label,newDrawing);// open the channel label with data from the server
    socket.on('listening',newSensorMsg);//another possible message/channel , use data in newSensorMsg
    socket.on('listening',dadaDraw);//another possible message/channel , use data in newSensorMsg
    socket.emit('listening',activate);//emitting through the channel 'listening ', sending the message activate, this is done each time mouse is dragged



  //================end set up for server talking





// setup sound draw+++++++++

audio = new p5.AudioIn()
audio.start()

fft = new p5.FFT(fftSmooth, frameSize)
fft.setInput(audio)

beat = new p5.PeakDetect(startMhz,endMhz, beatThreshold, 60/(bpm/60))
// end setup sound draw++++++++++

// load the generated poem text+++++++++
  refText = loadStrings("dadaPoem.txt");
  console.log(refText);
	
// setup sound voices+++++++++
  speech = new p5.Speech(); // speech synthesis object
  speech.onLoad = voiceReady;

  speech.started(startSpeaking);
  speech.ended(endSpeaking);

//functions for dadavoices talking and management of the voices
  function startSpeaking() {
  v++;
  if (v==dadaVoices.length) v= 0;// go back to the beginning
  console.log("voice number +v");

  }

  function endSpeaking() {
 //change the background between each voice

  if (v==0)  background(33, 100, 68);
  if (v==1)  background(0);
  if (v==2)  background(184, 100, 72);
  }

  function voiceReady() {// callback for setting up the voices
    console.log('voice ready');
    console.log(speech.voices);
  }
//end setup sound voices+++++++++
}// end SETUP+++++++++++++++++++++++++


/*===============what to do with the messages received from the server on channels label and listening*/
function newDrawing(data){ //function getting the data (modified or not) from the server in order to draw
  dadaDraw(data); // data is 1 -activate or  0 -not activate

}

function newSensorMsg(activate){// receiving the status of the proximity sensor from server and activate or not the talking 
//console.log("new message is : "+ activate);

  if(activate==true){

    speech.setRate(0.8);
    speech.setPitch(0.6);
    voices = speech.voices;
    readText(iptr,v);// read the text with voice from 0 to 2

  }
  else if (activate == false){

  speech.cancel();//stop talking

}//end newSensorMsg


socket.emit('listening',activate);//listen again through the channel 'listening ', check the activate status,

// noStroke();
//triangle(18,240,180,360,240,18); // use the new data (shared) on the server

}//end newSensorMsg



//read the poem text sentence by sentence with a different voice each time
function readText(i,j){
//readText (refText[i], with dadaVoices[j])
/* called when function newSensorMsg(activate){// receiving the status of the sensor from server and display it in the browser
  if(activate==true)
*/

    voice = voices[dadaVoices[(j)]];
    console.log(voice.name);
    speech.setVoice(voice.name);
    console.log(refText[i]);
    speech.speak(refText[i]);// reftext one by one with a set of voices
    iptr++;
    if (iptr==refText.length) iptr= 0;// if we are at the end of dadapoem go back to the beginning, // change here to generate a new DadaStory2.py


}



//Draw the shapes in response to sound and breath
function dadaDraw(activate) {
//ACTIVATE
if(activate ==true){

  t += 0.6;// increment the parameter for using Perlin Noise in the drawings
  headRadius = 3*noise(t) // set the size of the drawing center according to Perlin Noise
  let spectrum = fft.analyze()

  // scaledSpectrum is a new, smaller array of more meaningful values
  let scaledSpectrum = splitOctaves(spectrum, octaves)
  let volume = max(scaledSpectrum)
  beat.update(fft)


  sign = Math.sign(sign + prevMouseX - mouseX)
  angle -= sign
  angle += noise(t)
  //prevMouseX = mouseX

  //where to draw

  let posY = map(fft.getCentroid(), startMhz,endMhz, windowHeight-200,100) // draw in the center , change the parameter according to the projection space
  posY = max(0,posY)
  translate(windowWidth*noise(t+5),posY)
  rotate(radians(angle))

  { beginShape() // shapes

    /*hue function(frequency)
    stroke function(volume) */
  	let hue = map(fft.getCentroid(), startMhz,endMhz, 0,500)
  	fill(hue, volume*wingSaturationMultiplier, wingBrightness, wingTransparency)
  	stroke(hue, volume, strokeBaseBrightness - volume/2, strokeTransparency)
    	strokeWeight(1)

    	let N = scaledSpectrum.length;
    	let mirrorCopy = Array(N)
//draw dadaVoice shapes : lines

    for (let i=0; i < N; i++) { 
      let R =  headRadius + wingSize * scaledSpectrum[i]
      let x = R * sin(radians(i*180+180))
      let y = R * cos(radians(i*180/2+180))
      drawDot(x,y, i)
      mirrorCopy[N-1-i] = [Math.abs(x),y]
    }
    mirrorCopy.map(([x,y], i)=> drawDot(x,y, N-1-i))

    function drawDot(x,y, i){
      if( beat.isDetected ){
        fill(hue, volume*wingSaturationMultiplier, wingBrightness, bnorm(0.8))
      }
        if(showRays){
      	strokeWeight(map(scaledSpectrum[i], 0,bnorm(1), 0,dotSize+4))
      	strokeWeight(1)
      }
	  curveVertex(x,y)
  }// end drawDot

    stroke(hue, volume, strokeBaseBrightness - volume/2, 0.4)
    //  stroke(hue, volume, strokeBaseBrightness - volume/2, 0.4)
    strokeWeight(1)
    endShape(CLOSE)
  } // end drawing shapes
  //triangle(18,240,180,360,240,18);


}
else {// if no activation of the dadavoice computer voices, draw in response to the sound environment 

  if (frameCount % 500 == 0) {
	background(0);

  }

  //t += 0.0065;
    t += 0.6;

//draw sound environment shapes : vessels
  headRadius = 3*noise(t)
  let spectrum = fft.analyze()

  // scaledSpectrum is a new, smaller array of more meaningful values
  let scaledSpectrum = splitOctaves(spectrum, octaves)
  let volume = max(scaledSpectrum)
  beat.update(fft)


  sign = Math.sign(sign + prevMouseX - mouseX)

  console.log(sign)
  angle -= sign
  angle += noise(t)
  //prevMouseX = mouseX

  //where to draw
  // translate(mouseX,mouseY)
  let posY = map(fft.getCentroid(), startMhz,endMhz, windowHeight-300,100)
  translate(windowWidth*noise(t+5),posY)
  rotate(radians(angle))

  { beginShape() // shapes

    /*hue function(frequency)
    stroke function(volume) */
  	let hue = map(fft.getCentroid(), startMhz,endMhz, 0,500)

  	fill(hue, volume*wingSaturationMultiplier, wingBrightness, wingTransparency)

  	stroke(hue, volume, strokeBaseBrightness - volume/2, strokeTransparency)
    	strokeWeight(1)

    let N = scaledSpectrum.length;
    let mirrorCopy = Array(N)


    for (let i=0; i < N; i++) { //N or dadaNode.length

      	let R = headRadius + wingSize * scaledSpectrum[i]
    	let x = R * sin(radians(i*180/2+180))
      	let y = R * cos(radians(i*180/2+180))

 	drawDot(x,y, i)
      	mirrorCopy[N-1-i] = [Math.abs(x),y]
    }
    	
   mirrorCopy.map(([x,y], i)=> drawDot(x,y, N-1-i))

    function drawDot(x,y, i){
      if( beat.isDetected ){

        fill(hue, volume*wingSaturationMultiplier, wingBrightness, bnorm(0.8))
      }
        if(showRays){
      	strokeWeight(map(scaledSpectrum[i], 0,bnorm(1), 0,dotSize+4))
      	//line(0,0, x,y)
      	strokeWeight(1)
      }
	  curveVertex(x,y)
  }// end drawDot

    stroke(hue, volume, strokeBaseBrightness - volume/2, 0.4)
    strokeWeight(1)
    endShape(CLOSE)
  } // end drawing shapes


}

}// end drawSpeak






/**
 *  Re-group the array of FFT bins into an
 *  array of more meaningful values
 *  using the splitOctaves method.
 */


/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *
 *  There are 10 octaves in the range 20 - 20,000 Hz,
 *  so this will result in 10 * slicesPerOctave + 1
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;

  // default to thirds
  var n = slicesPerOctave|| 3;
  var nthRootOfTwo = Math.pow(2, 1/n);

  // the last N bins get their own
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;


  while (i > lowestBin) {
    var nextBinIndex = round( binIndex/nthRootOfTwo );

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total/numBins;
    scaledSpectrum.push(energy);

    // keep the loop going
    binIndex = nextBinIndex;
  }

  // add the lowest bins at the end
  for (var j = i; j > 0; j--) {
    scaledSpectrum.push(spectrum[j]);
  }

  // reverse so that array has same order as original array (low to high frequencies)
  //scaledSpectrum.reverse();

  return scaledSpectrum;
}



// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

  // default to 2 neighbors on either side
  var neighbors = numberOfNeighbors || 2;
  var len = spectrum.length;

  var val = 0;

  // start below the index
  var indexMinusNeighbors = index - neighbors;
  var smoothedPoints = 0;

  for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof(spectrum[i]) !== 'undefined') {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val/smoothedPoints;

  return val;
}
// dynamically manage the fullscreen on the browser
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
