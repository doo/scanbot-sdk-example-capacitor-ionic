import { ScanbotSDK, ScanbotSdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

async function initializeScanbotSDKWithCustomStorage() {
    try {
        const configuration: ScanbotSdkConfiguration = {
            storageBaseDirectory: 'file:///some/custom/storage-dir/',
            // ...
        };

        const result = await ScanbotSDK.initializeSDK(configuration);
    } catch (error: any) {
        console.error(error);
    }
}