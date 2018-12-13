import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ImageResultsPage } from '../pages/image-results/image-results';
import { ImageResultsProvider } from '../providers/image-results-provider';
import { ScanbotSdkProvider } from '../providers/scanbot-sdk-provider';
import { UiService } from '../providers/ui-service';
import { ImageViewPage } from "../pages/image-view/image-view";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImageResultsPage,
    ImageViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ImageResultsPage,
    ImageViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScanbotSdkProvider,
    ImageResultsProvider,
    UiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
