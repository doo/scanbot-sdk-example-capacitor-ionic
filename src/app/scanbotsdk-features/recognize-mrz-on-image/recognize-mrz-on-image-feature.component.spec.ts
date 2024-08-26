import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecognizeMrzOnImageFeature } from './recognize-mrz-on-image-feature.component';

describe('RecognizeMrzOnImageFeature', () => {
    let component: RecognizeMrzOnImageFeature;
    let fixture: ComponentFixture<RecognizeMrzOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecognizeMrzOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecognizeMrzOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
