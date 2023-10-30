import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuDocumentScannerWithFinderFeature } from './rtu-document-scanner-with-finder-feature.component';

describe('RtuDocumentScannerWithFinderFeature', () => {
    let component: RtuDocumentScannerWithFinderFeature;
    let fixture: ComponentFixture<RtuDocumentScannerWithFinderFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuDocumentScannerWithFinderFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuDocumentScannerWithFinderFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
