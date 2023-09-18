import { Component, Input } from '@angular/core';

@Component({
  selector: 'vocabulary-categories',
  templateUrl: './vocabulary-categories.component.html',
  styleUrls: ['./vocabulary-categories.component.scss']
})
export class VocabularyCategoriesComponent {
  allChecked: boolean = false;

  @Input() categories: {category: string, checked: boolean}[] = [];

  checkAll() {
    for(let i=0;i<this.categories.length;i++) {
      this.categories[i].checked = this.allChecked;
    }
   }

}
