# Use your Web Cam , Detect Emotion and then light up an LED on a Particle Photon 

This demo uses the web camera to capture and send an image to the Cognitive Services API, analyzing for emotion. If the emotion hits a trigger of over 0.5 for happiness it will call a function on the Photon, which will light up an LED. 
This demo demonstrates how to work with the Cognitive Services API, and use the Spark Module for the Photon. 

For this demo you will need the following:
* Cognitive Services API key [https://www.microsoft.com/cognitive-services/en-us/emotion-api](https://www.microsoft.com/cognitive-services/en-us/emotion-api)
* Username, password and ID of your Photon ( will require you to create an account at[https://www.particle.io/](https://www.particle.io/)
* a .env file - based off the .sampleenv file that populates these variables. Fill in your values so that you don't share them with others. 

## Steps
1. Install Node.js and the Particle CLI [https://docs.particle.io/guide/tools-and-features/cli/photon/](https://docs.particle.io/guide/tools-and-features/cli/photon/)
````npm install -g particle-cli
Documentation for the CLI is [https://docs.particle.io/reference/cli/](https://docs.particle.io/reference/cli/)
2. Open a terminal / command window and type in
````particle login



