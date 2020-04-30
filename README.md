Infinity-scroll
-------------

To start project:

```
cd server
npm install && node index.js
cd .. 

cd client
npm i
```
Browser:
```
cordova platform add browser
cordova build browser
cordova run browser
```
Android:

NOTE: If you test android on device you should update server url in 'www/js/constants.js' that will referenced to server that will accessible via internet.

```
cordova platform add android
cordova build android
cordova run android
```