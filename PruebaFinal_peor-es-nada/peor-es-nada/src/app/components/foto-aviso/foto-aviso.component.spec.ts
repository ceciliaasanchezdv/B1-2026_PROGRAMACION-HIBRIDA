import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FotoAvisoComponent } from './foto-aviso.component';

describe('FotoAvisoComponent', () => {
  let component: FotoAvisoComponent;
  let fixture: ComponentFixture<FotoAvisoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FotoAvisoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FotoAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
