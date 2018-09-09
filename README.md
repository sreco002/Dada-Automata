
<h1> The Code is a shadow Bubble </h1>
Installation for the EchoSystems show MA/MFA Degree Show 2018 : http://echosystems.xyz/
Goldsmiths University in London

The installation is a tangible outcome celebrating how human beings and machines affect each other. The network of artifacts is tuning itself. Their bodies are made of electronic textile and hard material and a combination of traditional craftsmanship and new technology making. The nodes are connected with the world made of humans and machines , through sound and proximity sensors. When no humans are around, the artefacts are moving in response to the sound 's feed and to each other moves. When sensing humans presence, they share their private taughts about how they feel about us in a surrealist and philosophical discourse.
I am inspired by the definition adopted from GAS (Drossos et al 2007) about “Artifacts : Tangible objects that can express their properties digitally”. Artifacts can be simpler composite, from a single sensor to an augmented building, from tagged objects to systems and infrastructures elements as recalled by Irene Mavrommati.[U.Ekman, J.D.Bolter, L.Díaz, M.Søndergaard, M.Engberg Eds, Ubiquitous Computing, Complexity and Culture, New York, Routledge, 2016, pp 135]. 

<h2>Run the code</h2>
Run node dadaSpeakerserverDraw.js on terminal will launch the webserver, when opening on a locally on port 3000, will launch the talking and drawing application talkDrawClient.js which will read the proximity sensor via serialport

<h3> possibility to run independantly these apps</h3>
To run environment sound environment drawing and activation of the talking while changing background colour each time the mouse is pressed independantly of the physical installation , log in T1KW deployed on heroku : https://theatre1k-soundraw.herokuapp.com/index.html</br> which will run the script SounDraw.js
to generate dada poetry independantly of the whole application run DadaStory.py</br>
run Poem-Deployed.js to tweet daily generated poetry from DadaStory.py
to generate the nodeMaskText.txt feeder of the generative poetry system, run TextGen-NodeMaskText.ipynb in Training folder </br>

<h2>Credits</h2>
Text-generating neural network with Max Woolf (@minimaxir) https://github.com/minimaxir/textgenrnn
Reading and Writing Electronic Text Example Code with Allison Parrish  at https://github.com/aparrish/rwet 
json files taken from Corpora database Darius Kazemi: https://github.com/dariusk/corpora in dadastory.py and textgenrnn.jpynb
Programming with text and sounds, creating a web server application  Daniel Shiffmann : https://shiffman.net/a2z/
Data programming Goldsmiths University with Dr Sorrel Harriet (s.harriet@gold.ac.uk). 
Chun,W. (2016). Updating to remain the same : Habitual new media.
MejiAs, U., 2013. Off the network. 1st edition Electronic  Mediations , University of Minnesota Press 

<h3> json files created for DadaStory.py</h3>
code_nouns.json and code_verbs.json</br>

<h2>Physical installation and programming</h2>
Material : Wood, electronics, wire, wool, metal </br>
Technical requirement : see the Doc Risk assessment</br>
The applications have been created within node.js environment https://nodejs.org and the generative poetry with python via jupyter notebook.

<h3>Pre-request</h3>

via Serial port, connection to an Arduino establishing the connection via port declared in DadaServerSpeakerdraw.js</br>
Install Arduino :https://www.arduino.cc/</br>
Install p5 js libraries https://p5js.org/libraries/ specified in index.html file of the T1KW folder</br>
Install dependencies specified in the package.json files via https://www.npmjs.com/</br>

<h3>Equipment </h3>
Unidirectional Microphone to capture the sound environment </br>
Bluetooth speaker with the ability to cover the sound environment</br>
Proximity sensor with a servo, 5 micro Dc motors with a capacitive touch sensor and 5 servos with a capacitive touch sensor</br>
Projector</br>
3 spotlights</br>


