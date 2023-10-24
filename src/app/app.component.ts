import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonicModule } from '@ionic/angular';
import { Colors } from 'src/theme/theme';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: Colors.scanbotRed });
  }
}
