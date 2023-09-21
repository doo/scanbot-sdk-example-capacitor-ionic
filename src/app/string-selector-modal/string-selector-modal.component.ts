import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-string-selector-modal',
  templateUrl: './string-selector-modal.component.html',
  styleUrls: ['./string-selector-modal.component.scss']
})
export class StringSelectorModalComponent implements OnInit {

  @Input() stringValues: string[] = []; // List of strings from outside
  selectedString: string = '';

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {}

  selectString(selectedString: string) {
    this.modalController.dismiss(selectedString, 'selected');
  }

  dismissModal() {
    this.modalController.dismiss(); // Corrected method name
  }
}