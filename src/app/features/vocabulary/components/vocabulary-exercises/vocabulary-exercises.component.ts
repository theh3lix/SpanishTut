import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vocabulary-exercises',
  templateUrl: './vocabulary-exercises.component.html',
  styleUrls: ['./vocabulary-exercises.component.scss']
})
export class VocabularyExercisesComponent {

  availableExercises: {label: string, value: string}[] = [
    {label: 'Spanish -> English (options)', value: '1'},
    {label: 'Spanish -> English (typing)', value: '2'},
    {label: 'English -> Spanish (options)', value: '3'},
    {label: 'English -> Spanish (typing)', value: '4'},
  ]

  @Input() selectedExercise: string = '1';
  @Output() selectedExerciseChange = new EventEmitter<string>();

  changeExercise() {
    this.selectedExerciseChange.emit(this.selectedExercise);
  }
}
