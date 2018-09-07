
<h1> The Code is a shadow Bubble </h1>
Installation for the EchoSystems show MA/MFA Degree Show 2018 : http://echosystems.xyz/
Goldsmiths University in London

The installation is a tangible outcome celebrating how human beings and machines affect each other. The network of artifacts is tuning itself. Their bodies are made of electronic textile and hard material and a combination of traditional craftsmanship and new technology making. The nodes are connected with the world made of humans and machines , through sound and proximity sensors. When no humans are around, the artefacts are moving in response to the sound 's feed and to each other moves. When sensing humans presence, they share their private taughts about how they feel about us in a surrealist and philosophical discourse.
I am inspired by the definition adopted from GAS (Drossos et al 2007) about “Artifacts : Tangible objects that can express their properties digitally”. Artifacts can be simpler composite, from a single sensor to an augmented building, from tagged objects to systems and infrastructures elements as recalled by Irene Mavrommati.[U.Ekman, J.D.Bolter, L.Díaz, M.Søndergaard, M.Engberg Eds, Ubiquitous Computing, Complexity and Culture, New York, Routledge, 2016, pp 135]. 


<h2>Credits</h2>
Text-generating neural network with Max Woolf (@minimaxir) https://github.com/minimaxir/textgenrnn
Reading and Writing Electronic Text Example Code with Allison Parrish  at https://github.com/aparrish/rwet 
Corpora database Darius Kazemi: https://github.com/dariusk/corpora
Programming with text and sounds, creating a web server application  Daniel Shiffmann : https://shiffman.net/a2z/
Data programming Goldsmiths University with Dr Sorrel Harriet (s.harriet@gold.ac.uk). 
Chun,W. (2016). Updating to remain the same : Habitual new media.
MejiAs, U., 2013. Off the network. 1st edition Electronic  Mediations , University of Minnesota Press 

<h2>Physical installation and programming</h2>
Material : Wood, electronics, wire, wool, metal Technical requirement : see the Doc Risk assessment

The applications have been created within node.js environment https://nodejs.org and the generative poetry with python via jupyter notebook
installations via npm :https://www.npmjs.com/
Pre-request: 
via Serial port, connection to an Arduino establishing the connection via port declared in DadaServerSpeakerdraw.js
Install libraries and dependencies specified in the package.json files
Equipment :
Unidirectional Microphone 
Bluetooth speaker
Proximity sensor with a servo, 5 micro Dc motors with a capacitive touch sensor and 5 servos with a capacitive touch sensor
Projector

To run environment sound drawing independantly of the whole application , run SoundDraw.js
to generate dada poetry independantly of the whole application run DadaStory.py
to generate the nodeMaskText.txt feeder of the generative poetry system, run TextGen-NodeMaskText.ipynb in Training folder 


