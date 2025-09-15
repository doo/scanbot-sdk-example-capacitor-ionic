import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

import { ScanbotSDK, ScanbotSdkConfiguration } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  /*
   * TODO add the license key here.
   * Please note: The Scanbot SDK will run without a license key for one minute per session!
   * After the trial period has expired, all SDK functions and UI components will stop working.
   * You can get a free "no-strings-attached" trial license.
   * Please submit the trial license form (https://docs.scanbot.io/trial/) on our website using
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
   * - https://docs.scanbot.io/capacitor/document-scanner-sdk/introduction/
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

  constructor() {}

  ngOnInit(): void {
    this.initScanbotSdk();
  }

  private async initScanbotSdk() {
    const configuration: ScanbotSdkConfiguration = {
      licenseKey: this.licenseKey,
      loggingEnabled: !environment.production,
      storageImageFormat: 'JPG', // Format of stored images
      storageImageQuality: 80, // Quality of stored images
      // storageBaseDirectory: (await this.storageBaseDirectoryUri).uri, // Custom storage path
      documentScannerEngineMode: 'ML', // The engine used to detect documents,
      fileEncryptionMode: AppComponent.FILE_ENCRYPTION_ENABLED ? 'AES256' : undefined,
      fileEncryptionPassword: AppComponent.FILE_ENCRYPTION_ENABLED
        ? 'SomeSecretPa$$w0rdForFileEncryption'
        : undefined,
      // see further config parameters
    };

    try {
      const result = await ScanbotSDK.initializeSDK(configuration);
      console.log(result);
    } catch (error: any) {
      console.error(error);
    }
  }
}
