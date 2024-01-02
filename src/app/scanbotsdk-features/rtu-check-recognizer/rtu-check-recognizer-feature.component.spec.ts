import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuCheckRecognizerFeature } from './rtu-check-recognizer-feature.component';

describe('RtuCheckRecognizerFeature', () => {
    let component: RtuCheckRecognizerFeature;
    let fixture: ComponentFixture<RtuCheckRecognizerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuCheckRecognizerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuCheckRecognizerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
