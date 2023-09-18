import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyCategoriesComponent } from './vocabulary-categories.component';

describe('VocabularyCategoriesComponent', () => {
  let component: VocabularyCategoriesComponent;
  let fixture: ComponentFixture<VocabularyCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyCategoriesComponent]
    });
    fixture = TestBed.createComponent(VocabularyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
