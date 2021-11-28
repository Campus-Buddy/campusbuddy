import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConvosComponent } from './all-convos.component';

describe('AllConvosComponent', () => {
  let component: AllConvosComponent;
  let fixture: ComponentFixture<AllConvosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllConvosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllConvosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
