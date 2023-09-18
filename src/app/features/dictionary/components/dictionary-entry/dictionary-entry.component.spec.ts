import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryEntryComponent } from './dictionary-entry.component';

describe('DictionaryEntryComponent', () => {
  let component: DictionaryEntryComponent;
  let fixture: ComponentFixture<DictionaryEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DictionaryEntryComponent]
    });
    fixture = TestBed.createComponent(DictionaryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
