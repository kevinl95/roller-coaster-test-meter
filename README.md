# Roller Coaster Test Meter

## Roller Coaster Tycoon ride ratings IRL

Are you obsessed with roller coasters? Do you love building the rides of your dreams in Roller Coaster Tycoon? What if you could see how your favorite rides rate using the intensity, excitement, and nausea formulas used in the original Roller Coaster Tycoon? This Ionic and Cordova app for Android and iOS lets you use the accelerometer in your phone to extract lateral and vertical G's from your ride, plot them, and then convert these into a score you can share to social media and with your friends!


# Download

**Links to app stores pending!**

# Setting up the Project

The Roller Coaster Test Meter uses Ionic v1. To set up the latest version of the Ionic CLI type the following:

    npm install -g ionic@latest
 Install the Cordova Device Motion plugin so that we can use the accelerometer:

   ```
ionic cordova plugin add cordova-plugin-device-motion
npm install --save @ionic-native/device-motion
```
We also need the Cordova Social Message plugin. Using the Cordova CLI:

   ```
cordova plugin add cordova-plugin-social-message
```

[Now follow the Ionic v1 setup steps here to get this project set up](https://docs.usecreator.com/docs/zip-export-an-ionic-project). It will be easier if you download the ZIP archive from Github.
