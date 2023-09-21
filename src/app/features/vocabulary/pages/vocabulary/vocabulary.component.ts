import { Component, OnInit } from '@angular/core';
import { Dictionary } from 'src/app/features/dictionary/models/dictionary.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Prompt } from '../../models/prompt.model';
import { Settings } from '../../models/settings.model';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {
  message: string = '';
  dictionary?: Dictionary;
  startExercise1: boolean = false;
  selectedExercise: string = '1';
  activeCategories: string[] = [];
  availableWords: { english: string, spanish: string, category: string }[] = [];
  wordsToGuess: number = 0;
  settings: Settings = {
    wordsAmount: 0,
    exerciseType: '1',
    categories: []
  }


  categories: {category: string, checked: boolean}[] = [
    { category: 'Verbs', checked: false },
    { category: 'Nouns', checked: false },
    { category: 'Adjectives', checked: false },
    { category: 'Others', checked: false }
  ];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getJSON('assets/input_files/data.json').subscribe(x => {
      this.dictionary = x;
    })
  }


  startExercise(wordAmount: number) {
    this.wordsToGuess = wordAmount;
    const categories = this.categories.filter(x=>x.checked).map(x=>x.category);
    this.settings = {
      wordsAmount: this.wordsToGuess,
      exerciseType: this.selectedExercise,
      categories: categories
    }
    this.startExercise1 = true;
  }

  tmp() {
    console.log(this.message);
  }
}
