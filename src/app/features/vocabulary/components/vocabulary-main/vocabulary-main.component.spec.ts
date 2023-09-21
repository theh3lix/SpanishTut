import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyMainComponent } from './vocabulary-main.component';

describe('VocabularyMainComponent', () => {
  let component: VocabularyMainComponent;
  let fixture: ComponentFixture<VocabularyMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyMainComponent]
    });
    fixture = TestBed.createComponent(VocabularyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
