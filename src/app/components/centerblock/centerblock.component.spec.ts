import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterblockComponent } from './centerblock.component';

describe('CenterblockComponent', () => {
  let component: CenterblockComponent;
  let fixture: ComponentFixture<CenterblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
