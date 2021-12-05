import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindABuddyComponent } from './find-a-buddy.component';

describe('FindABuddyComponent', () => {
  let component: FindABuddyComponent;
  let fixture: ComponentFixture<FindABuddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindABuddyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindABuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
