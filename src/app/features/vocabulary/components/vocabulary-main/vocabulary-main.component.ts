import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../../models/settings.model';
import { Dictionary } from 'src/app/features/dictionary/models/dictionary.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Prompt } from '../../models/prompt.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent {

  dictionary?: Dictionary;

  totalWords: number = 0;
  guessedWords: number = 0;
  correctGuesses: number = 0;
  wrongGuesses: number = 0;

  @Input() settings: Settings = {
    wordsAmount: 0,
    exerciseType: '1',
    categories: []
  }

  translatedWord: string = 'la camisa';
  options: {option: string, correct: boolean, wrong: boolean}[] = [
    {option: 'shirt', correct: false, wrong: false},
    {option: 'pants', correct: false, wrong: false},
    {option: 'tie', correct: false, wrong: false},
    {option: 'hat', correct: false, wrong: false},
  ]
  selectedOption: string = '';
  availableWords: { english: string, spanish: string, category: string }[] = [];
  wordsToGuess: number = 0;
  prompt?: Prompt;


  @Output() guess = new EventEmitter<string>();

  @Input() result: string = '';
  @Output() resultChange = new EventEmitter<string>();

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    const data = await firstValueFrom(this.dataService.getJSON('assets/input_files/data.json'));
    this.dictionary = data;
    this.prepareWords();
    this.totalWords = this.settings.wordsAmount;
    if(this.totalWords > this.availableWords.length)
      this.totalWords = this.availableWords.length;
    this.setGuessedWord();
    console.log(this.options);
  }

  setGuessedWord() {
    if(this.guessedWords >= this.settings.wordsAmount) {
      this.result = 'Game over';
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
    if(this.selectedOption == ''){
      this.result = 'Select option';
      return;
    }
    this.guessedWords++;
    const correct = this.prompt!.english;
    let option = this.options.filter(x=>x.option==this.selectedOption)[0];
    if(this.selectedOption == correct) {
      this.correctGuesses++;
      option.correct = true;
      this.result = 'Correct!';
    } else {
      this.wrongGuesses++;
      option.wrong = true;
      let correctOption = this.options.filter(x=>x.option == correct)[0];
      correctOption.correct = true;
      this.result = 'Incorrect!';
    }
    setTimeout(() => {
      this.selectedOption = '';
      this.result = ''; 
      this.setGuessedWord();
    }, 1000);
  }

  sendGuess() {
    if(this.selectedOption == '') {
      this.result = 'Select option!'
      this.resultChange.emit(this.result);
    } else {
      this.guess.emit(this.selectedOption);
    }
  }

  sendResult() {
    //send -1 or 1
  }

  private prepareWords() {
    if(this.settings.categories.filter(x=>x == 'Verbs')) {
      let verbs = this.dictionary?.verbs.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(verbs!);
    }
    if(this.settings.categories.filter(x=>x == 'Nouns')) {
      let nouns = this.dictionary?.nouns.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(nouns!);
    }
    if(this.settings.categories.filter(x=>x == 'Adjectives')) {
      let adjectives = this.dictionary?.adjectives.map(x => {
        return {
          english: x.english,
          spanish: x.spanish,
          category: x.category
        }
      })
      this.availableWords = this.availableWords.concat(adjectives!);
    }
    if(this.settings.categories.filter(x=>x == 'Others')) {
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
    console.log(this.availableWords);
    const i = Math.floor(Math.random()*this.availableWords.length)-1;
    let badWords: string[] = [];
    const word = this.availableWords[i];
    const sameCategoryWords = this.availableWords.filter(x=>x.category == word.category);
    console.log(sameCategoryWords);
    while(badWords.length < 3) {
      let otherI = Math.ceil(Math.random()*sameCategoryWords.length)-1;
      console.log('Other I: ' + otherI);
      let badWord = sameCategoryWords[otherI];
      if(badWord.english != word.english && !badWords.includes(badWord.english)) {
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
