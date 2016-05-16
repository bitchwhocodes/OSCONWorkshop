var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.TOKEN_SECRET
});

// include the library

var serialport = require('serialport');
// make a local instance of it
var SerialPort = serialport.SerialPort; 
// get port name from the command line:
var portName = process.argv[2];


var myPort = new SerialPort(portName, {
    baudRate: 9600,
    // look for return and newline at the end of each data packet:
    parser: serialport.parsers.readline("\r\n")
});

myPort.on("open", handleOpen);
myPort.on("close", handleClose);
myPort.on("data", onData);

var isSending = false;

function handleOpen() {
	console.log("the connection is open ");
}

function handleClose() {
    console.log("the connection has been closed");
}

function onData(data) {
	console.log("data"+data);
  if(data=="ON"){
    sendTweet();
  }
}

function sendTweet(){
  client.post('statuses/update', {status: 'Doing a workshop @forwardjs on the iots'},  function(error, tweet, response){
    if(error) throw error;
    console.log(tweet);  // Tweet body. 
    console.log(response);  // Raw response object. 
  });
}
