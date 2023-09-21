import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { CheckRecognizerResult, CheckRecognizerResultField, RecognizeCheckResult } from 'capacitor-plugin-scanbot-sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-results',
  templateUrl: './check-results.page.html',
  styleUrls: ['./check-results.page.scss'],
})
export class CheckResultsPage implements OnInit {

  isRtu: boolean = true;
  isResultModalOpen: boolean = false;

  checkResult: CheckRecognizerResult | undefined;

  fields: {
    /** The name of the field. */
    name: string;
    /** The value of the field. */
    value: string;
  }[] = [];

  constructor(private ScanbotSdk: ScanbotService, private router: Router) { }

  ngOnInit() {
    const result = this.router.getCurrentNavigation()?.extras?.state?.['result']
    if (result !== undefined) {
      this.parseResult(result as CheckRecognizerResult);
      this.isRtu = false
      this.setOpen(true)
    }
  }

  setOpen(isOpen: boolean) {
    this.isResultModalOpen = isOpen;
  }

  async openCheckRecognizer() {
    const result = await this.ScanbotSdk.showCheckRecognizer()
    if (result.status == "CANCELED") {
      return;
    }
    this.checkResult = result;
    this.isResultModalOpen = true;

    this.parseResult(result);
  }

  parseResult(result: CheckRecognizerResult) {
    const newFields: {name: string, value: string}[] = []
    Object.keys(result.fields).forEach((field) => {
      const checkField = (result.fields as any)[field] as CheckRecognizerResultField;
      const value = checkField.value?.text;
      if (value) {
        newFields.push({
          name: field,
          value: value
        })
      }
    })
    this.fields = newFields
  }
}