import { Component } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent {
  allChecked: boolean = false;

  categories: {category: string, checked: boolean}[] = [
    { category: 'Verbs', checked: false },
    { category: 'Nouns', checked: false },
    { category: 'Adjectives', checked: false },
    { category: 'Others', checked: false }
  ];

  constructor() {
  }

   checkAll() {
    for(let i=0;i<this.categories.length;i++) {
      this.categories[i].checked = this.allChecked;
    }
   }
}
