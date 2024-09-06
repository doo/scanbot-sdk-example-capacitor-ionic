import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerformOcrOnImageFeature } from './perform-ocr-on-image-feature.component';

describe('PerformOcrOnImageFeature', () => {
    let component: PerformOcrOnImageFeature;
    let fixture: ComponentFixture<PerformOcrOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PerformOcrOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(PerformOcrOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
