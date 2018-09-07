//launch a server to host sockets from diffferent "computers" https://www.youtube.com/watch?v=bjULmG8fqc8om/watch?v=2hhEOGXcCvg
//https://socket.io/get-started/chat/
//index.html is the socket client ,
// goes with index.html/talkDrawClient.js from T1KW website
// stop reading via Arduino , otherwise , resource will be too busy to send values to the server on channel 9600
/* client is the place where can other app /people could look at the files we want to share
link with this website where database is listen to the request to the "website" on the port and get the output
net ninja :https://github.com/iamshaunjp/websock...
*/

//DECLARATIONS
//set up variables

var client = 'T1KW';// name of the website directory which will use the data from the server
var port = '3000'// name of the local host on computer
var label = 'distance'; // distance label for communication between server and client
var receivedData ="";
//using libraries
var express = require('express');
var app = express();
app.use(express.static(client));// this is the place where can other app /people could look at the files I want to share link with this website where database is listen to the request to the "website" on the port and get the output

// open the socket for communication with server and listening to serial port
var server = app.listen(port);// listen on that port
var socket = require('socket.io');
var io = socket(server);



//Arduino=====================================

/* eslint-disable no
de/no-missing-require */
'use strict';

// Use a Readline parser

var serialPort = require('serialport');
var parsers = serialPort.parsers;

// Use a `\r\n` as a line terminator
var parser = new parsers.Readline({
  delimiter: '\r\n'
});

var serialDevicePort = new serialPort('/dev/cu.wchusbserial1410', {// check the port for the Arduino//'/dev/cu.usbmodem1421', /dev/cu.wchusbserial1410
  baudRate: 9600
});


//----------read data from the sensor on Arduino
  serialDevicePort.on('open', () => console.log('Port open'));
  serialDevicePort.pipe(parser);

 //parser.on('data', console.log);//print on console , what is received
 // put the parser into an array of receivedData and translate into string
   parser.on('data',function(data){
   receivedData =data.toString();
   console.log(receivedData);
   // checking that we can manipulate what we received

   });



//-------------



var message = "we are the Dada Data listening"; // data goes there

console.log(message+ " to "+client +" with the label :  " +label)// which website is the client

//EVENT=========================
io.sockets.on('connection', newConnection);



//FUNCTIONS
// what to do if there is a new connection
function newConnection(socket){//called by io.sockets.on('connection', newConnection)

  console.log('new connection:' + socket.id);//when there is a new connection
  //socket.on(label, drawingMsg);// if there is a message called 'label' trigger this function 'mouseMsg'link between label and function
  socket.on('listening',sensorMsg);// listen this channel to the sensor to check if there is a viewer
  socket.on(label,drawingMsg); // listen here to check what to draw

  // sending information to client , about which shapes to draw according to viewer presence

    function drawingMsg(data){
    if (receivedData == "Hello") { data = 1;}//drawing lines
    if (receivedData == "0") {data = 0;} // drawing shapes

    //  console.log(receivedData);// add the received Data from Arduino to the new message
    socket.broadcast.emit(label,data);// send back out emit the data received with this label , sent by the client website
    //io.sockets.emit('brush',data); // emit to everyone io.sockets including the sender

    }
    // check if there is a viewer with receivedData via reading Arduino serial

    function sensorMsg(data){
    if (receivedData == "Hello") {
      console.log(receivedData);
      data =true;}// send the message to talk client, sensor has been activated
    if (receivedData == "0") {data =false;}
    //console.log(receivedData);// add the received Data from Arduino to the new message
    //console.log("server says : " + data);// add the received Data from Arduino to the new message

    // setInterval(function(){
    //   io.sockets.emit('listening',data);// send back out emit the data received with this label , sent by the client website
    //
    // }, 1000);



     io.sockets.emit('listening',data);// send back out emit the data received with this label , sent by the client website
     io.sockets.emit(label,data);// send back out emit the data received with this label , sent by the client website

    }

}//end newconnection FUNCTIONS
