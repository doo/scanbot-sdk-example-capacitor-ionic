import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureDocumentScannerComponent } from './scanbotsdk-feature-document-scanner.component';

describe('ScanbotsdkFeatureDocumentScannerComponent', () => {
    let component: ScanbotsdkFeatureDocumentScannerComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureDocumentScannerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureDocumentScannerComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureDocumentScannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
