import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentResultsPageRoutingModule } from './document-results-routing.module';

import { DocumentResultsPage } from './document-results.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		DocumentResultsPageRoutingModule
	],
	declarations: [DocumentResultsPage]
})
export class DocumentResultsPageModule { }
