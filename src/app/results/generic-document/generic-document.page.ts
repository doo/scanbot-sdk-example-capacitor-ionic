import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonUtils } from 'src/app/utils/common-utils';
import { GenericDocumentField, GenericDocumentRecognizerResult, MrzDocumentResult } from 'capacitor-plugin-scanbot-sdk';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';

interface DocumentField {
  key: string,
  value?: string | undefined
}

@Component({
  selector: 'app-generic-document',
  templateUrl: './generic-document.page.html',
  styleUrls: ['./generic-document.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GenericDocumentPage implements OnInit {

  private documentResult!: GenericDocumentRecognizerResult
  photoPreviewWebViewPath: string = '';
  documentFields: DocumentField[] = [];

  private activatedRoute = inject(ActivatedRoute);
  private utils = inject(CommonUtils);

  constructor() { }

  async ngOnInit() {
    this.documentResult = JSON.parse(this.activatedRoute.snapshot.paramMap.get('documentResult') as string);

    if (this.documentResult.fields.photoImageUri)
      this.photoPreviewWebViewPath = Capacitor.convertFileSrc(this.documentResult.fields.photoImageUri);

    this.loadDocumentFields();
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  private loadDocumentFields() {
    if (this.documentResult.fields) {
      Object.entries(this.documentResult.fields).forEach(([key, value]) => {
        if (key === 'mrz') {
          this.loadMRZFields(value as MrzDocumentResult);
        } else {
          let field: DocumentField = { key: key };

          if (key.endsWith('Uri'))
            field.value = value;
          else {
            const genDocField = value as GenericDocumentField;
            field.value = `${genDocField.text} ${genDocField.confidence ? '(confidence: ' + genDocField.confidence.toFixed(2) + ')' : ''}`;
          }

          this.documentFields.unshift(field);
        }
      });
    }
  }

  private loadMRZFields(mrzValue: MrzDocumentResult) {
    Object.entries(mrzValue).forEach(([key, value]) => {
      let field: DocumentField = { key: `MRZ.${key}` };

      if (Array.isArray(value))
        field.value = JSON.stringify(value);
      else {
        const genDocField = value as GenericDocumentField;
        field.value = `${genDocField.text} ${genDocField.confidence ? '(confidence: ' + genDocField.confidence.toFixed(2) + ')' : ''}`;
      }

      this.documentFields.push(field);
    });
  }
}