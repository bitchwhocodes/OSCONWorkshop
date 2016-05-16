# Use your Web Cam , Detect Emotion and then light up an LED on a Particle Photon 

This demo uses the web camera to capture and send an image to the Cognitive Services API, analyzing for emotion. If the emotion hits a trigger of over 0.5 for happiness it will call a function on the Photon, which will light up an LED. 
This demo demonstrates how to work with the Cognitive Services API, and use the Spark Module for the Photon. 

Note: this demo will work fine locally. On a remote server, however, you will need to ensure it is a sercure domain ( https://) and use that to access the demo as it uses the getUserMedia functionality, which has several security implications. 

For this demo you will need the following:
* Cognitive Services API key [https://www.microsoft.com/cognitive-services/en-us/emotion-api](https://www.microsoft.com/cognitive-services/en-us/emotion-api)
* Username, password and ID of your Photon ( will require you to create an account at[https://www.particle.io/](https://www.particle.io/)
* a .env file - based off the .sampleenv file that populates these variables. Fill in your values so that you don't share them with others. 
* Ungated Wifi

## Steps
### Setting up Hardware
1. Create an account at Particle [https://www.particle.io/](https://www.particle.io/)
2. Install Node.js and the Particle CLI [https://docs.particle.io/guide/tools-and-features/cli/photon/](https://docs.particle.io/guide/tools-and-features/cli/photon/)
```npm install -g particle-cli```
Documentation for the CLI is [https://docs.particle.io/reference/cli/](https://docs.particle.io/reference/cli/)
3. Open a terminal / command window and type in
```particle login```
Login to your account on the command line

4. Plug in your Photon to the USB
5. In the terminal / command window type:
```particle setup```
This process will try to find the Particle device connected to your USB. Once it has located it, you can select it. Alternatively, you can download the Particle App to claim it as well. 
6. Get your Photon on the Wifi by allowing it to discover networks or manually entering it
7. Once it has been set up, you can get your device ID through the Web Interface or via the CLI with
```particle identify```
8. Load a sketch onto the Photon via the web interface - the sketch is in the Spark folder, copy and paste that


### Software App
1. First, we must install the modules that the Node/Express app requires. In the command / terminal navigate to this folder and type:
``` npm install```
2. Create a .env file at the root of this application. 
3. Populate the newly created .env file with the variables needed to run the application, including your Cognitive Services Emotion API key, and your password, username and id for your Photon. Use the .sampleenv file as an example of what to name things. 
4. Run the Node application by typing:
```npm start```
5. Navigate to [http://localhost:3000](http://localhost:3000)



