import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../../models/settings.model';
import { Dictionary } from 'src/app/features/dictionary/models/dictionary.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Prompt } from '../../models/prompt.model';
import { firstValueFrom } from 'rxjs';
import { Stats } from '../../models/stats.model';
import { DefaultModelsService } from 'src/app/shared/services/default-models.service';
import { Helpers } from 'src/app/shared/services/helper.service';
import { Word } from '../../models/word.model';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  selector: 'vocabulary-main',
  templateUrl: './vocabulary-main.component.html',
  styleUrls: ['./vocabulary-main.component.scss']
})
export class VocabularyMainComponent {
  dictionary?: Dictionary;
  stats: Stats = this.defaultModels.defaultStatsModel();
  @Input() settings: Settings = this.defaultModels.defaultSettingsModel();

  translatedWord: string = '';
  correctTranslation: string = '';
  options: { option: string, correct: boolean}[] = []
  availableWords: Word[] = [];
  wordsToGuess: number = 0;
  prompt?: Prompt;

  constructor(private dataService: DataService, 
    private defaultModels: DefaultModelsService,
    private vocabularyService: VocabularyService,
    private helper: Helpers) { }

  async ngOnInit() {
    const data = await firstValueFrom(this.dataService.getJSON('assets/input_files/data.json'));
    this.dictionary = data;
    this.availableWords = this.vocabularyService.prepareWords(this.settings, this.dictionary!);
    this.stats.totalWords = this.settings.wordsAmount;
    if (this.stats.totalWords > this.availableWords.length)
      this.stats.totalWords = this.availableWords.length;
    this.setExerciseView();
  }

  setExerciseView() {
    switch(this.settings.exerciseType){
      case '1': //spanish -> english (options)
        this.startExercise1();
        break;
      case '2': //spanish -> english (typing)
      this.startExercise2();
        break;
      case '3': //english -> spanish (options)
        this.startExercise3();
        break;
      case '4': //english -> spanish (typing)
      this.startExercise4();
        break;
      default:
        break;
    }
  }

  gameOverCheck() : boolean {
    const cond = this.stats.guessedWords >= this.settings.wordsAmount;
    if(cond)
      this.stats.message = 'Game over';
    return cond;
  }

  startExercise1() {
    this.setWordForOptionExercise('es');
  }

  startExercise3() {
    this.setWordForOptionExercise('en');
  }

  startExercise2() {
    this.setWordForTypingExercise('es');
  }

  startExercise4() {
    this.setWordForTypingExercise('en');
  }

  guessTypingExercise(typedAnswer: string) {
    const eng_to_esp: boolean = this.settings.exerciseType == '4';
    if (typedAnswer == '') {
      this.stats.message = 'Answer cannot be empty';
      return;
    }
    this.stats.guessedWords++;
    this.checkTypedAnswer(typedAnswer);
    this.availableWords = this.availableWords.filter(x => this.translatedWord != (eng_to_esp ? x.english : x.spanish));
    setTimeout(() => {
      this.stats.message = '';
      this.setExerciseView();
    }, 1000);
  }

  guessOptionExercise(selectedOption: string) {
    const eng_to_esp: boolean = this.settings.exerciseType == '3';
    if (selectedOption == '') {
      this.stats.message = 'Select option';
      return;
    }
    this.stats.guessedWords++;
    this.markCorrectOption(selectedOption, eng_to_esp);
    this.availableWords = this.availableWords.filter(x => x.spanish != (eng_to_esp ? this.prompt!.english : this.prompt!.spanish));
    setTimeout(() => {
      this.stats.message = '';
      this.setExerciseView();
    }, 1000);
  }

  selectWord(language: string): Prompt {
    let wrongWords: string[] = [];
    console.log(this.availableWords);
    const word = this.helper.selectRandomWord(this.availableWords);
    let sameCategoryWords = this.helper.getSameCategoryWords(this.availableWords, word.category)
    if (sameCategoryWords.length == 4) {
      switch(language) {
        case 'es':
          wrongWords = wrongWords.concat(sameCategoryWords.filter(x => x.spanish != word.spanish).map(x => x.english));
          break;
        case 'en':
          wrongWords = wrongWords.concat(sameCategoryWords.filter(x => x.english != word.english).map(x => x.spanish));
          break;
      }
    } 
    else 
      wrongWords = this.vocabularyService.generateWrongOptions(this.availableWords, word, language);

    const finalWord: Prompt = {
      spanish: word.spanish,
      english: word.english,
      wrongAnswers: wrongWords
    }
    return finalWord;
  }

  setWordForTypingExercise(lang: string) {
    const word = this.helper.selectRandomWord(this.availableWords);
    switch(lang){
      case 'es':
        this.translatedWord = word.spanish;
        this.correctTranslation = word.english;
        break;
      case 'en':
        this.translatedWord = word.english;
        this.correctTranslation = word.spanish;
        break;
    }
  }

  
  setWordForOptionExercise(lang: string) {
    if(this.gameOverCheck()) return; //stop playing after set amount of words
    const word = this.selectWord(lang);
    this.prompt = word;
    let options: string[] = this.helper.getOptions(word, lang); //get mixed options
    this.translatedWord = this.vocabularyService.setTranslatedWord(word, lang);
    this.options = options.map(x => {
      return {
        option: x,
        correct: false,
        wrong: false
      }
    });
  }

  markCorrectOption(selectedOption: string, eng_to_esp: boolean) {
    let correctOption = this.options.filter(x=>x.option == (eng_to_esp ? this.prompt?.spanish : this.prompt?.english))[0];
    correctOption.correct = true;
    if (correctOption.option == selectedOption) {
      this.stats.correctGuesses++;
      this.stats.message = 'Correct!';
    } else {
      this.stats.wrongGuesses++;
      this.stats.message = 'Incorrect!';
    }
  }

  checkTypedAnswer(typedAnswer: string) {
    if (typedAnswer == this.correctTranslation) {
      this.stats.correctGuesses++;
      this.stats.message = 'Correct!';
    } else {
      this.stats.wrongGuesses++;
      this.stats.message = `Incorrect! (${this.correctTranslation})`;
    }
  }
}
