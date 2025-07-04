<p align="left">
  <img src=".images/ScanbotSDKLogo.png#gh-light-mode-only" width="15%" />
</p>
<p align="left">
  <img src=".images/ScanbotSDKLogo_darkmode.png#gh-dark-mode-only" width="15%" />
</p>

# Example app for the Scanbot Capacitor Document Scanner SDK and Data Capture Modules with Angular

This example app shows how to integrate the [Scanbot Document Scanner SDK](https://scanbot.io/document-scanner-sdk/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) and [Scanbot Data Capture Modules](https://scanbot.io/data-capture-software/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) for Capacitor using the Angular framework. 

## What is the Scanbot SDK?

The Scanbot SDK is a set of high-level APIs that lets you integrate document scanning and intelligent data extraction capabilities into your mobile apps and websites. It runs on all common mobile devices and operates entirely offline. No data is transmitted to our or third-party servers, ensuring maximum data safety.

With our Ready-To-Use UI (RTU UI) components, you can integrate the Scanbot SDK into your app in less than an hour.

💡 For more details about the Scanbot Document Scanner SDK and Data Capture Modules, please check out our [documentation.](https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) 

## How to run this example app?

### Requirements

* NodeJS 20+ & npm
* [Capacitor CLI](https://www.npmjs.com/package/@capacitor/cli) 7+
* For Android apps:
	* Android Studio 2024.2.1+
	* Android SDK (API Level 23+), Platforms and Developer Tools
	* Android Gradle Plugin 8.4.0+ or Kotlin Plugin applied

* For iOS apps:
	* iOS 14+
	* macOS with Xcode 16+
	* Xcode Command Line Tools
	* Homebrew
	* Cocoapods

Please check the full [requirements for Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).

>💡 For a full overview of our SDK's requirements, please refer to our [documentation](https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/#requirements).

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

## Overview of the Scanbot SDK

### Document Scanner SDK

The Scanbot Capacitor Document Scanner SDK offers the following features:

* **User guidance**: Ease of use is crucial for large user bases. Our on-screen user guidance helps even non-tech-savvy users create perfect scans under any conditions.

* **Automatic document scanning**: The SDK automatically captures the document when the device is optimally positioned over the document. This reduces the risk of blurry or incomplete document scans compared to manually-triggered capture. 

* **Automatic cropping**: Our document scanning SDK automatically straightens and crops scanned documents, ensuring high-quality document scan results.

* **Custom filters:** Every use case has specific image requirements. With the SDK’s custom filters, you can turn the captured document image into optimal input for your backend systems, ensuring smooth image processing. They include grayscale, several binarization options, and more.

* **Document Quality Analyzer:** This feature automatically rates the quality of the scanned pages from “very poor” to “excellent.” If the quality is below a specified threshold, the SDK prompts the user to rescan.

* **Export formats:** The Scanbot Document Scanner SDK supports several output formats (JPG, PDF, TIFF, and PNG). This ensures your downstream solutions receive the best format to store, print, or share the digitized document – or to process it further.

| ![User guidance](.images/user-guidance.png) | ![Automatic capture](.images/auto-capture.png) | ![Automatic cropping](.images/auto-crop.png) |
| :-- | :-- | :-- |

### Data Capture Modules

The Scanbot SDK Data Capture Modules allow you to extract data from a wide range of structured documents and to integrate OCR text recognition capabilities. They include:

#### [MRZ Scanner](https://scanbot.io/data-capture-software/mrz-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) 
This module allows quick and accurate data extraction from the machine-readable zones on identity documents. It captures all important MRZ data from IDs and passports and returns it in the form of simple key-value pairs. This is much simpler, faster, and less mistake-prone than manual data entry.

#### [Check Scanner (MICR)](https://scanbot.io/data-capture-software/check-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites)
The MICR Scanner offers reliable data extraction from international paper checks, capturing check numbers, routing numbers, and account numbers from MICR codes. This simplifies workflows and reduces errors that frustrate customers and employees.

#### [Text Pattern Scanner](https://scanbot.io/data-capture-software/data-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites)
Our Text Pattern Scanner allows quick and accurate extraction of single-line data. It captures information based on customizable patterns tailored to your specific use case. This replaces error-prone manual data entry with automatic capture.

#### [VIN Scanner](https://scanbot.io/data-capture-software/vin-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites)
The VIN scanner enables instant capture of vehicle identification numbers (VINs) from trucks or car doors. It uses OCR to convert the image of the VIN code into structured data for backend processing. This module integrates into mobile or web-based fleet management applications, enabling you to replace error-prone manual entry with fast, reliable data extraction.

#### Document Data Extractor
Through this feature, our SDK offers document detection and data capture capabilities for a wider range of documents. It accurately identifies and crops various standardized document types, including [German ID cards](https://scanbot.io/data-capture-software/id-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), passports, [driver's licenses](https://scanbot.io/data-capture-software/german-drivers-license-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), [residence permits](https://scanbot.io/data-capture-software/residence-permit-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites), and the [EHIC](https://scanbot.io/data-capture-software/ehic-scanner/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites). It uses the Scanbot OCR engine for accurate data field recognition without requiring additional OCR language files.

| ![MRZ Scanner](.images/mrz-scanner.png) | ![VIN Scanner](.images/vin-scanner.png) | ![Check Scanner](.images/check-scanner.png) |
| :-- | :-- | :-- |

## Additional information

### Free integration support

Need help integrating or testing our Document Scanner SDK? We offer [free developer support](https://docs.scanbot.io/support/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) via Slack, MS Teams, or email.

As a customer, you also get access to a dedicated support Slack or Microsoft Teams channel to talk directly to your Customer Success Manager and our engineers.

### Trial license and pricing 

The Scanbot SDK examples will run for one minute per session without a license. After that, all functionalities and UI components will stop working.

To try the Scanbot Capacitor SDK without the one-minute limit, you can request a free, no-strings-attached [7-day](https://scanbot.io/trial/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) trial license for your example project.

Alternatively, check out our [demo apps](https://scanbot.io/demo-apps/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) to test the SDK.

Our pricing model is simple: Unlimited scanning for a flat annual license fee, full support included. There are no tiers, usage charges, or extra fees. [Contact](https://scanbot.io/contact-sales/?utm_source=github.com&utm_medium=referral&utm_campaign=dev_sites) our team to receive your quote and a paid license.

### Other supported platforms

Besides Capacitor, the Scanbot SDK is also available on:

* [Android](https://github.com/doo/scanbot-sdk-example-android) (native)
* [iOS](https://github.com/doo/scanbot-sdk-example-ios) (native)
* [Flutter](https://github.com/doo/scanbot-sdk-example-flutter)
* [Capacitor & Ionic (React)](https://github.com/doo/scanbot-sdk-example-ionic-react)
* [Capacitor & Ionic (Vue.js)](https://github.com/doo/scanbot-sdk-example-ionic-vuejs)
* [Cordova & Ionic](https://github.com/doo/scanbot-sdk-example-ionic) 
* [.NET MAUI](https://github.com/doo/scanbot-sdk-maui-example)
* [JavaScript](https://github.com/doo/scanbot-sdk-example-web)
* [React Native](https://github.com/doo/scanbot-sdk-example-react-native)
* [Xamarin](https://github.com/doo/scanbot-sdk-example-xamarin) & [Xamarin.Forms](https://github.com/doo/scanbot-sdk-example-xamarin-forms)

Our Barcode Scanner SDK additionally also supports [Compose Multiplatform / KMP](https://github.com/doo/scanbot-barcode-scanner-sdk-example-kmp), [UWP](https://github.com/doo/scanbot-barcode-scanner-sdk-example-windows) (Windows), and [Linux](https://github.com/doo/scanbot-sdk-example-linux).
