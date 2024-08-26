# Scanbot Capacitor Document Scanner SDK Example App with Angular

This example app shows how to integrate the [Scanbot Capacitor Document Scanner SDK](https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/).

The Scanbot SDK Capacitor Plugin is available as an [npm package](https://www.npmjs.com/package/capacitor-plugin-scanbot-sdk).

For more details about the Scanbot SDK Capacitor Plugin, please refer to the [documentation](https://docs.scanbot.io/document-scanner-sdk/capacitor/).

## What is the Scanbot SDK?

The Scanbot SDK lets you integrate barcode & document scanning, as well as data extraction functionalities, into your mobile apps and website. It contains different modules that are licensable for an annual fixed price. For more details, visit our website https://scanbot.io.


## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To try the Scanbot SDK without a one-minute limit, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).

## Documentation
👉 [Scanbot SDK documentation](https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/)

## How to run this app

### Requirements

- NodeJS 18+ & npm
- [Capacitor CLI](https://www.npmjs.com/package/@capacitor/cli) 6+
- For Android apps:
    * Android Studio Hedgehog | 2023.1.1+
    * Android SDK (API Level 22+), Platforms and Developer Tools
- For iOS apps: 
    * iOS 13+
    * macOS with Xcode 15+
    * Xcode Command Line Tools
    * Homebrew
    * Cocoapods

Please check the full [requirements for Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).

### Install

Install the node modules of this project:

```
npm install
```

### Build

Build the web assets and sync with the Capacitor native projects:

```
npm run build
npm run sync
```

### Run

Connect an Android or iOS device via USB and run the app by opening the respective projects, or via terminal with these commands:

```
npm run android
```

```
npm run ios
```

You can read more about the Capacitor CLI commands at this [link](https://capacitorjs.com/docs/cli).

If you want to develop without Capacitor CLI commands, you can use [VS Code](https://code.visualstudio.com/) together with the [Ionic VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ionic.ionic). Read more about this [here](https://capacitorjs.com/docs/vscode/getting-started).