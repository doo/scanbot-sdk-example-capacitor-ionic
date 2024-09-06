import { ScanbotSDK, ScanbotSdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initializeScanbotSDKWithEncryption() {
    try {
        const configuration: ScanbotSdkConfiguration = {
            fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
            fileEncryptionMode: 'AES256'
            // ...
        };

        const result = await ScanbotSDK.initializeSDK(configuration);
    } catch (error: any) {
        console.error(error);
    }
}