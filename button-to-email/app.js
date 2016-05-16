var nodemailer = require('nodemailer');



var serialport = require('serialport');// include the library
SerialPort = serialport.SerialPort; // make a local instance of it
// get port name from the command line:
portName = process.argv[2];

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

    if (data == 1) {

        if (!isSending) {
            isSending = true;
            sendEmail();
        }
    }
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'YO <stacey.mulcahy@gmail.com>', // sender address
    to: 'stacey.mulcahy@microsoft.com', // list of receivers
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b>' // html body
};


function sendEmail() {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
            isSending = false;
        }
    });

}






