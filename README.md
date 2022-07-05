# Scanbot SDK Example App for Capacitor with Ionic

This example app shows how to integrate the **[Scanbot SDK Cordova Plugin](https://scanbot.io/developer/cordova-document-scanner/)** in a [Capacitor](https://capacitorjs.com) app with [Ionic](https://ionicframework.com).
The Scanbot SDK Cordova Plugin is available as an [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).
For more details about the Scanbot SDK Cordova Plugin please refer to the [documentation](https://docs.scanbot.io/document-scanner-sdk/cordova/).


## What is Scanbot SDK?

The Scanbot SDK for Cordova brings [document scanning](https://scanbot.io/developer/cordova-document-scanner/) and [barcode scanning](https://scanbot.io/developer/cordova-barcode-scanner-plugin/) features to your mobile Android and iOS apps. 
It contains various modules that are part of different license packages. For more details visit our [website](https://scanbot.io).


## How to run this app

### Requirements

- [Node.js v12](https://nodejs.org) or higher, with NPM v6.9 or higher
- For Android Apps:
  * Latest [Android Studio](https://developer.android.com/studio/) with Android SDK installed
- For iOS Apps:
  * Mac with latest version of [Xcode](https://developer.apple.com/xcode/)
  * [CocoaPods](https://cocoapods.org)

Please check the full [requirements for Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).


### Install

Install [Ionic](https://ionicframework.com):

```
npm install -g ionic
```

Install the node modules of this project:

```
cd scanbot-sdk-example-capacitor-ionic/
npm install
```

### Build

Build the web assets and sync with the Capacitor native projects:

```
npm run build
npx cap sync
```

### Run

Connect an Android or iOS device via USB and run the app from IDE or Command Line Interface (CLI).


#### IDE
Open the native projects in corresponding IDEs (Android Studio or Xcode) and hit the "Run" button:

```
ionic capacitor open android
ionic capacitor open ios
```

#### CLI
Or alternatively run the projects via CLI (Android or iOS):

```
ionic capacitor run android
ionic capacitor run ios
```


## License Key

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired all Scanbot SDK functions as well as the UI components (like Document Scanner UI) 
will stop working or may be terminated. You have to restart the app to get another trial period.

To get a free "no-strings-attached" trial license, please submit the 
[Trial License Form](https://scanbot.io/trial/) on our website.
