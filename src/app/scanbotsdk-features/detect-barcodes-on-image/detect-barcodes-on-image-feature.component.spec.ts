import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetectBarcodesOnImageFeature } from './detect-barcodes-on-image-feature.component';

describe('DetectBarcodesOnImageFeature', () => {
    let component: DetectBarcodesOnImageFeature;
    let fixture: ComponentFixture<DetectBarcodesOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DetectBarcodesOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(DetectBarcodesOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
