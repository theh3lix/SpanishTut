import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeComponent } from './to-be.component';

describe('TobeComponent', () => {
  let component: ToBeComponent;
  let fixture: ComponentFixture<ToBeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToBeComponent]
    });
    fixture = TestBed.createComponent(ToBeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
