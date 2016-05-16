var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem1411" }
  },

  devices: {
    led: { driver: "led", pin: 13 },
    button: { driver: "button", pin: 2 }
  },

  work: function(my) {
    my.button.on("push", my.led.turnOn);
	my.button.on("release", my.led.turnOff);
  }
}).start();