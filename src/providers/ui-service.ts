import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';


@Injectable()
export class UiService {

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController)
  { }

  public showAlert(message: string, title: string = "Info") {
    const prompt = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    return prompt.present();
  }

  public createLoading(message: string) {
    return this.loadingCtrl.create({
      content: message
    });
  }

}
