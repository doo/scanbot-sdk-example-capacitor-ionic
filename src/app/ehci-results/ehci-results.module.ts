import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EhciResultsPageRoutingModule } from './ehci-results-routing.module';

import { EhciResultsPage } from './ehci-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EhciResultsPageRoutingModule
  ],
  declarations: [EhciResultsPage]
})
export class EhciResultsPageModule {}
