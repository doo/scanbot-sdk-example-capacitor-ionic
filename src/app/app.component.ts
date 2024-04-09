import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonicModule } from '@ionic/angular';
import { Colors } from 'src/theme/theme';

import { ScanbotSDK, ScanbotSdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class AppComponent implements OnInit {

    /*
     * TODO add the license key here.
     * Please note: The Scanbot SDK will run without a license key for one minute per session!
     * After the trial period has expired, all SDK functions and UI components will stop working.
     * You can get a free "no-strings-attached" trial license.
     * Please submit the trial license form (https://scanbot.io/trial/) on our website using
     * the app identifier "io.scanbot.example.sdk.capacitor" of this example app
     * or of your app (see capacitor.config.ts).
     */
    readonly licenseKey = '';

    /*
     * !! Please read note !!
     * It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
     * However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
     *
     * For more details about the storage system of the Scanbot SDK Capacitor Module please see our docs:
     * - https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/
     *
     * For more details about the file system on Android and iOS we also recommend to check out:
     * - https://developer.android.com/training/data-storage
     * - https://developer.apple.com/documentation/foundation/filemanager
     */
    readonly storageBaseDirectoryUri = Filesystem.getUri({
        path: 'my-custom-storage',
        directory: Directory.External,
    });

    public static readonly FILE_ENCRYPTION_ENABLED: boolean = false;

    constructor() {
        StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setBackgroundColor({ color: Colors.scanbotRed });
    }

    ngOnInit(): void {
        this.initScanbotSdk();
    }

    private async initScanbotSdk() {
        const config: ScanbotSdkConfiguration = {
            licenseKey: this.licenseKey,
            loggingEnabled: true,
            storageImageFormat: 'JPG', // Format of stored images
            storageImageQuality: 80, // Quality of stored images
            documentDetectorMode: 'ML_BASED', // The engine used to detect documents,
            fileEncryptionMode: AppComponent.FILE_ENCRYPTION_ENABLED ? 'AES256' : undefined,
            fileEncryptionPassword: AppComponent.FILE_ENCRYPTION_ENABLED ? 'SomeSecretPa$$w0rdForFileEncryptio' : undefined,
            // see further config parameters
        };

        try {
            const result = await ScanbotSDK.initializeSDK(config);
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }
}
