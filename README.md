# Read QR codes, barcodes and MRZ. Document scanner. Text recognition

## Scanbot SDK example app for Capacitor with Ionic

This example app shows how to integrate the Scanbot SDK Cordova Plugin in a [Capacitor](https://capacitor.ionicframework.com/) App with [Ionic](https://ionicframework.com). 

The Scanbot SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).

For more details about the Cordova Plugin please see this [documentation](https://scanbotsdk.github.io/documentation/cordova/).


## What is Scanbot SDK?
The Scanbot SDK brings scanning and document creation capabilities to your mobile apps. 
It contains modules which are individually licensable as license packages. 
For more details visit our website https://scanbot.io


## How to run this app

#### Requirements

- [Node v8.6.0](https://nodejs.org) or higher, with NPM v5.6.0 or higher
- For Android Apps: 
  * Latest [Android Studio](https://developer.android.com/studio/) with Android SDK installed
- For iOS Apps: 
  * Mac with latest version of [Xcode](https://developer.apple.com/xcode/)
  * [CocoaPods](https://cocoapods.org) 

Please check the full [requirements for Capacitor](https://capacitor.ionicframework.com/docs/getting-started/dependencies).


Install [Ionic](https://ionicframework.com):

```
npm install -g ionic
``` 


Install the node modules of this project:

```
cd scanbot-sdk-example-capacitor-ionic/
npm install
```

#### Build

Build the web assets and sync with the Capacitor native projects:

```
npm run build
npx cap sync
```


Open the native projects in corresponding IDEs (Android Studio or Xcode):

```
npx cap open android
npx cap open ios
```

Connect an Android or iOS device via USB and run the app from IDE.


When making changes to the web code, you have to rebuild the web project by `npm run build` and then update the 
Capacitor native projects with the transpiled JS code and web assets by `npx cap copy`:

```
npm run build
npx cap copy
```


## Please note

The Scanbot SDK will run without a license for one minute per session!

After the trial period is over all Scanbot SDK functions as well as the UI components (like Document Scanner UI) will stop working or may be terminated.
You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the [Trial License Form](https://scanbot.io/en/sdk/demo/trial) on our website 
by using the App Identifier `io.scanbot.example.sdk.capacitor.ionic` of this example app or of your app.
