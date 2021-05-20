import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipSingleComponent } from './payslip-single.component';

describe('PayslipSingleComponent', () => {
  let component: PayslipSingleComponent;
  let fixture: ComponentFixture<PayslipSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
