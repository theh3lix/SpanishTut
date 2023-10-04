import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vocabulary-exercise-options',
  templateUrl: './vocabulary-exercise-options.component.html',
  styleUrls: ['./vocabulary-exercise-options.component.scss']
})
export class VocabularyExerciseOptionsComponent {
  @Input() translatedWord: string = '';
  @Input() message: string = '';
  @Input() options: { option: string, correct: boolean }[] = []
  selectedOption: string = '';
  @Output() onGuess = new EventEmitter<string>();

  guess() {
    this.onGuess.emit(this.selectedOption);
  }
}
