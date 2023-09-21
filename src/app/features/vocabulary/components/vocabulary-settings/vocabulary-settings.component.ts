import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vocabulary-settings',
  templateUrl: './vocabulary-settings.component.html',
  styleUrls: ['./vocabulary-settings.component.scss']
})
export class VocabularySettingsComponent {
  wordsCount: number = 0;

  @Output() startExercise = new EventEmitter<number>();

  start() {
    this.startExercise.emit(this.wordsCount);
  }
}
