import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellAppComponent } from './resell-app.component';

describe('ResellAppComponent', () => {
  let component: ResellAppComponent;
  let fixture: ComponentFixture<ResellAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
