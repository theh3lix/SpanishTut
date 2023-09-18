import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyExercisesComponent } from './vocabulary-exercises.component';

describe('VocabularyExercisesComponent', () => {
  let component: VocabularyExercisesComponent;
  let fixture: ComponentFixture<VocabularyExercisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyExercisesComponent]
    });
    fixture = TestBed.createComponent(VocabularyExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
