import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpletabComponent } from './simpletab.component';

describe('SimpletabComponent', () => {
  let component: SimpletabComponent;
  let fixture: ComponentFixture<SimpletabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpletabComponent]
    });
    fixture = TestBed.createComponent(SimpletabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
