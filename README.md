# Dada-Automata
 Practice based research academic year 2017/2018 at Goldsmiths University in London

MFA in computational art final year

This installation illustrates how, like masks, networks frame, mirror, mediate, catalyse , transform, reveal or hide. While staging the entanglement between machines and humans, I rely on my exploration of the ubiquitous Network as an anthropomorphic frame [Napier, A. (1996). Foreign bodies : Performance, art, and symbolic anthropology. Berkeley: University of California Press.] and on Jacques Lacan’s theorisation of the gaze ” Spectators perceive the effects of the gaze because their estranged screen representations allow them to momentarily see themselves as objects “[K .Mondloch. Screens, Viewing Media Installation Art, University of Minnesota, 2010, pp 29]. The artwork , made of textile sculptures, and artefacts tune itself with data and provides to the visitor a physical environment to his digital presence.

I am inspired by the definition adopted from GAS (Drossos et al 2007) about “Artifacts : Tangible objects that can express their properties digitally”. Artifacts can be simpler composite, from a single sensor to an augmented building, from tagged objects to systems and infrastructures elements as recalled by Irene Mavrommati.[U.Ekman, J.D.Bolter, L.Díaz, M.Søndergaard, M.Engberg Eds, Ubiquitous Computing, Complexity and Culture, New York, Routledge, 2016, pp 135]. The installation is a tangible outcome celebrating how human beings and machines affect each other. The interaction via twitter, occurs in a loop between the visitor and the crafted electronic “nodes”, between physical and digital manipulation. Fed by data, the network of artifacts is tuning itself. Their bodies are made of electronic textile and hard material and a combination of traditional craftsmanship and new technology making. The nodes are connected with the world with sound and proximity sensors. When “alone”, the artefacts are moving in response to sound feed and to each other moves ["The way the things go by Fischli &Weiss" , video available at https://www.nytimes.com/video/movies/100000003611613/the-way-things-go.html].

Material : Wood, electronics, wire, wool, metal Technical requirement : see the Doc Risk assessment
Resources : 
Allison Parrish " Reading and Writing Electronic Text Example Code" at https://github.com/aparrish/rwet very detailed 
Shiffmann : https://shiffman.net/a2z/
teaching resources Data programming Goldsmiths University with Dr Sorrel Harriet (s.harriet@gold.ac.uk). 
Object Theatre :https://wepa.unima.org/en/theatre-of-objects/ Html : https://www.w3schools.com/default.asp


The installation has been created in the node.js environment https://nodejs.org and the generative poetry within python environment
all installations via npm :https://www.npmjs.com/ and 
Pre-request: 
via Serial port, connection to an Arduino establishing the connection via port declared in DadaServerSpeakerdraw.js
Install libraries and dependencies specified in the package.json files
Equipment :
Unidirectional Microphone 
Bluetooth speaker
Proximity sensor with a servo, 5 micro Dc motors with a capacitive touch sensor and 5 servos with a capacitive touch sensor
Projector

To play environment sound drawing independantly of the whole application on the server, run SoundDraw.js
to generate dada poetry independantly of the whole application on the server with Tracery grammar, run DadaStory.py
to generate the nodeMaskText.txt feeder of the generative poetry system, run TextGen-NodeMaskText.ipynb in Training folder 


