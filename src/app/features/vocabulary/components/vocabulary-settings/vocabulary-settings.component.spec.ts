import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularySettingsComponent } from './vocabulary-settings.component';

describe('VocabularySettingsComponent', () => {
  let component: VocabularySettingsComponent;
  let fixture: ComponentFixture<VocabularySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularySettingsComponent]
    });
    fixture = TestBed.createComponent(VocabularySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
