import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenericDocumentField, GenericDocumentRecognizerResult, MrzDocumentResult } from 'capacitor-plugin-scanbot-sdk';
import { ScanResultFieldsSection, ScanResultFieldsPage, ScanResultField } from '../scan-result-fields.page';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-generic-document-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class GenericDocumentResultFieldsPage extends ScanResultFieldsPage {

    override pageTitle: string = 'Generic Document'

    private genDocumentResult!: GenericDocumentRecognizerResult

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.genDocumentResult = JSON.parse(this.activatedRoute.snapshot.paramMap.get('result') as string);

        super.ngOnInit();
    }

    override loadResultFields(): ScanResultFieldsSection[] {
        if (this.genDocumentResult.fields) {
            let resultImageField: ScanResultField = { key: 'photoImageUri', showPhotoOnly: true };
            let resultFields: ScanResultField[] = [];

            Object.entries(this.genDocumentResult.fields).forEach(([_key, _value]) => {
                if (_key === 'mrz') {
                    if (_value)
                        resultFields.push(...this.getMRZFields(_value as MrzDocumentResult));
                } else {
                    let field: ScanResultField = { key: _key };

                    if (_key.endsWith('Uri')) {
                        if (_value) {
                            field.value = _value;

                            if (_key === resultImageField.key)
                                resultImageField.fieldPhotoPreviewWebViewPath = Capacitor.convertFileSrc(_value);
                        }
                    } else if (_value) {
                        const genDocField = _value as GenericDocumentField;
                        field.value = `${genDocField.text} ${genDocField.confidence ? '(confidence: ' + genDocField.confidence.toFixed(2) + ')' : ''}`;
                    }

                    resultFields.unshift(field);
                }
            });

            return [{ title: 'Snapped image', fields: [resultImageField] }, { title: 'Fields', fields: resultFields }];
        }
        else
            return super.loadResultFields();
    }

    private getMRZFields(mrzValue: MrzDocumentResult): ScanResultField[] {
        let genDocMRZFields: ScanResultField[] = [];

        Object.entries(mrzValue).forEach(([_key, _value]) => {
            let field: ScanResultField = { key: `MRZ.${_key}` };

            if (_value) {
                if (Array.isArray(_value))
                    field.value = JSON.stringify(_value);
                else {
                    const genDocField = _value as GenericDocumentField;
                    field.value = `${genDocField.text} ${genDocField.confidence ? '(confidence: ' + genDocField.confidence.toFixed(2) + ')' : ''}`;
                }
            }

            genDocMRZFields.push(field);
        });

        return genDocMRZFields;
    }
}
