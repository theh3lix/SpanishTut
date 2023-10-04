import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vocabulary-exercise-typing',
  templateUrl: './vocabulary-exercise-typing.component.html',
  styleUrls: ['./vocabulary-exercise-typing.component.scss']
})
export class VocabularyTypeComponent {
  @Input() translatedWord: string = 'La camisa';
  @Input() message: string = 'Correct!';

  @Output() guess = new EventEmitter<string>();
}
