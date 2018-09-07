// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI
/* output random voices and random text from refText */
//https://www.youtube.com/watch?v=bM9MfoKe9GU
//drawing sketh : https://www.openprocessing.org/sketch/446310
// understanding the basic : :https://www.unicornsfartpixels.com/posts/2017-10-25audio-fft/
//perlin noise genekogan http://genekogan.com/code/p5js-perlin-noise/


//global variable
let speech;
let voices, voice;
let refText, index, sentence,phrase;
var iptr = 0; // a counter for the sentences
var v = 0;// a counter for the voices
var dadaVoices=[0,28,20];// Alex. Moira,Lekha
var dadaNode  = 2;//characters drawing
let dadaName;

let play = true;
let playNum = 0;
//28 Moira 49 Google UK English Female 27 Milena 26 Melina 39 Veena
var delayInMilliseconds = 2000; //allow the voice switching before reading


var words = ["77 65","617265"," 64 61 64 61 ","We are the MASK DATA","01010111 01100101" , "77 65","64 61 64 61","61 72 65","6d 61 73 6b","un","one", "zero un", "uno zero uno zero zero", "zero one one"]; // some words

//perlin noise

var t;

// Variables for the sound drawing

var showRays = false

var octaves = 3//3
var fftSmooth = 0.95
var frameSize = 512
var startMhz = 300//150
var endMhz = 12000
var beatThreshold = 0.6//0.4
var bpm = 120 //120

var headRadius = 13//4,13
var wingSize = .4//.9
var dotSize = 4

var wingTransparency = 0.065//0.035 or 0.5 for very bright
var wingSaturationMultiplier = 0.65//0.8
var wingBrightness = bnorm(.6)//.6


var strokeTransparency = 0.9//.9
var strokeBaseBrightness = bnorm(.3)


var audio, fft, beat //, amplitude
var angle = 360, sign = 1
var prevMouseX = 0


//functions for the sound  treatment
function bnorm(floatVal, low=0, high=255){return Math.round(floatVal*(high - low))}


function setup() {
  background(31,14,26);
//perlin noise
  t=0;

  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)

// setup sound draw

audio = new p5.AudioIn()
audio.start()

fft = new p5.FFT(fftSmooth, frameSize)
fft.setInput(audio)

beat = new p5.PeakDetect(startMhz,endMhz, beatThreshold, 60/(bpm/60))
// end setup sound draw
// speech synthesis

  refText = loadStrings("dadaPoem.txt");
  console.log(refText);
  speech = new p5.Speech(); // speech synthesis object
  speech.onLoad = voiceReady;

  speech.started(startSpeaking);
  speech.ended(endSpeaking);


  function startSpeaking() {
    //background(0, 255, 0);

  }

  function endSpeaking() {
    if (v==0)  background(9, 100, 31);
    if (v==1)  background(31,14,26);
    if (v==2)  background(237, 100, 40);


  }

  function voiceReady() {
    console.log('voice ready');
    console.log(speech.voices);
  }

}// end setup
//activate speech with a different voice each time mouse pressed
function mousePressed() {
  //this function will be called when the Ping sensor is on > function PingDraw and when the installation is complete with the computer connected to arduino and Ping sensor
//and when the installation is complete with the computer connected to arduino and Ping sensor
//

  speech.setRate(0.8);
  speech.setPitch(0.6);
  voices = speech.voices;

  readText(iptr,v)// read the text with voice from 0 to 2

  iptr++;
  v++;
  if (v==dadaVoices.length) v= 0;// go back to the beginning

  if (iptr==refText.length) iptr= 0;// if we are at the end of dadapoem go back to the beginning, // change here to generate a new DadaStory2.py



  if (playNum ==1) {
    play = false
    noLoop();
  }

  if ((playNum ==2)||(playNum ==0)) {
    play = true;
    loop();

  }

  //console.log(playNum);
  if (playNum==2) playNum =0; else playNum++


}//end function

//load the dadaPoem text to be read by the voices
function loadText(){

  refText = loadStrings("dadaPoem.txt");
  console.log(refText);
  }
  function returnSentence(){
  //  index = Math.floor((Math.random()*txt.length));
    index = 5;
    phrase = refText[index];
    console.log(phrase);
    return phrase;
  }
// read the text with the dadaVoices
function readText(){


    console.log(v);
    voice = voices[dadaVoices[(v)]];

    console.log(voice.name);
    speech.setVoice(voice.name);
    //speech.speak(refText);// reftext with just one voice
    console.log(refText[iptr]);
    speech.speak(refText[iptr]);// reftext one by one with a set of voices

    iptr++;
    v++;
     if (v==dadaVoices.length) v= 0;// go back to the beginning

     if (iptr==refText.length) iptr= 0;// go back to the beginning

}

//readText (refText[i], with dadaVoices[j])
function readText(i,j){


    console.log(j);
    voice = voices[dadaVoices[(j)]];
    dadaName = voice.name;
    console.log(voice.name);

    speech.setVoice(voice.name);
    //speech.speak(refText);// reftext with just one voice
    console.log(refText[i]);
    speech.speak(refText[i]);// reftext one by one with a set of voices


}



//Draw the shapes in response to environment sound
function draw() {
  // clear the background every 500 frames using mod (%) operator
  if (frameCount % 1500 == 0) {
	background(0);


  }

    t += 0.6;


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


  //where to draw

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

    let N = scaledSpectrum.length;// number of shapes depending on the spectrum
    let mirrorCopy = Array(N)


    for (let i=0; i < N; i++) {

      let R = (headRadius + wingSize )* scaledSpectrum[i]
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
    //  stroke(hue, volume, strokeBaseBrightness - volume/2, 0.4)
    strokeWeight(1)
    endShape(CLOSE)
  } // end drawing shapes



}// end draw






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
// taking care of the full screen for projection wise
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
