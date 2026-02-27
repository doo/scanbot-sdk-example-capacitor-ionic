import { ScanbotSDK, SdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initialize() {
  try {
    const configuration = new SdkConfiguration({
      licenseKey: '<YOUR_LICENSE_KEY_HERE>',
      fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
      fileEncryptionMode: 'AES256',
    });

    const result = await ScanbotSDK.initialize(configuration);
  } catch (error: any) {
    console.error(error);
  }
}
