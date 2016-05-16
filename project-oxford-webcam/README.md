# Use your Web Cam , Detect Emotion and then light up an LED on a Particle Photon 

For this demo you will need the following:
* Cognitive Services API key https://www.microsoft.com/cognitive-services/en-us/emotion-api
* Username, password and ID of your Photon 
* a .env file - based off the .sampleenv file that populates these variables. 
* 

This demo uses the web cam to take a picture and send it to the Cognitive Services API, analyzing for emotion. If the emotion hits a trigger of over 0.5 for happiness, it will light up the Photon. 

