import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../../models/settings.model';
import { Dictionary } from 'src/app/features/dictionary/models/dictionary.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Prompt } from '../../models/prompt.model';
import { firstValueFrom } from 'rxjs';
import { Stats } from '../../models/stats.model';

@Component({
  selector: 'vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent {

  dictionary?: Dictionary;
  stats: Stats = this.defaultStatsModel();

  @Input() settings: Settings = {
    wordsAmount: 0,
    exerciseType: '1',
    categories: []
  }

  translatedWord: string = '';
  options: { option: string, correct: boolean, wrong: boolean }[] = []
  selectedOption: string = '';
  availableWords: { english: string, spanish: string, category: string }[] = [];
  wordsToGuess: number = 0;
  prompt?: Prompt;


  constructor(private dataService: DataService) { }

  async ngOnInit() {
    const data = await firstValueFrom(this.dataService.getJSON('assets/input_files/data.json'));
    this.dictionary = data;
    this.prepareWords();
    this.stats.totalWords = this.settings.wordsAmount;
    if (this.stats.totalWords > this.availableWords.length)
      this.stats.totalWords = this.availableWords.length;
    this.setGuessedWord();
    console.log(this.options);
  }

  defaultStatsModel() : Stats {
    return {
      totalWords: 0,
      guessedWords: 0,
      correctGuesses: 0,
      wrongGuesses: 0,
      message: ''
    }
  }

  setGuessedWord() {
    if (this.stats.guessedWords >= this.settings.wordsAmount) {
      this.stats.message = 'Game over';
      return;
    }
    const word = this.selectWord();
    this.prompt = word;
    let options: string[] = [];
    options = options.concat(word.wrongAnswers);
    options.push(word.english);
    options.sort(() => (Math.random() > .5) ? 1 : -1);
    this.translatedWord = word.spanish;
    this.options = options.map(x => {
      return {
        option: x,
        correct: false,
        wrong: false
      }
    });
  }

  guesss() {
    if (this.selectedOption == '') {
      this.stats.message = 'Select option';
      return;
    }
    this.stats.guessedWords++;
    const correct = this.prompt!.english;
    let option = this.options.filter(x => x.option == this.selectedOption)[0];
    if (this.selectedOption == correct) {
      this.stats.correctGuesses++;
      option.correct = true;
      this.stats.message = 'Correct!';
    } else {
      this.stats.wrongGuesses++;
      option.wrong = true;
      let correctOption = this.options.filter(x => x.option == correct)[0];
      correctOption.correct = true;
      this.stats.message = 'Incorrect!';
    }
    this.availableWords = this.availableWords.filter(x => x.spanish != this.prompt!.spanish);
    setTimeout(() => {
      this.selectedOption = '';
      this.stats.message = '';
      this.setGuessedWord();
    }, 1000);
  }

  private prepareWords() {
    if (this.settings.categories.filter(x => x == 'Verbs').length > 0) {
      let verbs = this.dictionary?.verbs.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(verbs!);
    }
    if (this.settings.categories.filter(x => x == 'Nouns').length > 0) {
      let nouns = this.dictionary?.nouns.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(nouns!);
    }
    if (this.settings.categories.filter(x => x == 'Adjectives').length > 0) {
      let adjectives = this.dictionary?.adjectives.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(adjectives!);
    }
    if (this.settings.categories.filter(x => x == 'Others').length > 0) {
      let others = this.dictionary?.other.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: ''
        }
      })
      this.availableWords = this.availableWords.concat(others!);
    }
  }

  selectWord(): Prompt {
    const i = Math.ceil(Math.random() * this.availableWords.length) - 1;
    let badWords: string[] = [];
    const word = this.availableWords[i];
    let sameCategoryWords = this.availableWords.filter(x => x.category == word.category);
    if (sameCategoryWords.length < 4)
      sameCategoryWords = this.availableWords;
    if (sameCategoryWords.length == 4) {
      badWords = badWords.concat(sameCategoryWords.filter(x => x.spanish != word.spanish).map(x => x.english))
    }
    while (badWords.length < 3) {
      let otherI = Math.ceil(Math.random() * sameCategoryWords.length) - 1;
      console.log('Other I: ' + otherI);
      let badWord = sameCategoryWords[otherI];
      if (badWord.english != word.english && !badWords.includes(badWord.english)) {
        badWords.push(badWord.english);
      }
    }


    const finalWord: Prompt = {
      spanish: word.spanish,
      english: word.english,
      wrongAnswers: badWords
    }
    return finalWord;
  }

}
