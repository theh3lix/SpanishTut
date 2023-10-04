import { Injectable } from "@angular/core";
import { Settings } from "../models/settings.model";
import { Dictionary } from "../../dictionary/models/dictionary.model";
import { Word } from "../models/word.model";
import { Helpers } from "src/app/shared/services/helper.service";
import { Prompt } from "../models/prompt.model";

@Injectable()
export class VocabularyService {

    constructor(private helper: Helpers) { }

    prepareWords(settings: Settings, dictionary: Dictionary) : Word[] {
        let availableWords: Word[] = [];
        if (settings.categories.filter(x => x == 'Verbs').length > 0) {
          let verbs = dictionary.verbs.map(x => {
            return {
              english: x.english,
              spanish: x.spanish,
              category: x.category
            }
          })
          availableWords = availableWords.concat(verbs!);
        }
        if (settings.categories.filter(x => x == 'Nouns').length > 0) {
          let nouns = dictionary.nouns.map(x => {
            return {
              english: x.english,
              spanish: x.spanish,
              category: x.category
            }
          })
          availableWords = availableWords.concat(nouns!);
        }
        if (settings.categories.filter(x => x == 'Adjectives').length > 0) {
          let adjectives = dictionary.adjectives.map(x => {
            return {
              english: x.english,
              spanish: x.spanish,
              category: x.category
            }
          })
          availableWords = availableWords.concat(adjectives!);
        }
        if (settings.categories.filter(x => x == 'Others').length > 0) {
          let others = dictionary.other.map(x => {
            return {
              english: x.english,
              spanish: x.spanish,
              category: ''
            }
          })
          availableWords = availableWords.concat(others!);
        }

        return availableWords;
    }

    generateWrongOptions(availableWords: Word[], word: Word, lang: string) : string[] {
        let wrongWords: string[] = [];
        let sameCategoryWords = this.helper.getSameCategoryWords(availableWords, word.category);
        if(sameCategoryWords.length < 4) sameCategoryWords = availableWords;
        while (wrongWords.length < 3) {
          let otherI = Math.ceil(Math.random() * sameCategoryWords.length) - 1;
          console.log('Other I: ' + otherI);
          let wrongWord = sameCategoryWords[otherI];
          switch(lang){
            case 'es':
                if (wrongWord.english != word.english && !wrongWords.includes(wrongWord.english)) {
                    wrongWords.push(wrongWord.english);
                }
                break;
            case 'en':
                if (wrongWord.spanish != word.spanish && !wrongWords.includes(wrongWord.spanish)) {
                    wrongWords.push(wrongWord.spanish);
                }
                break;
          }
        }
        return wrongWords;
      }

      setTranslatedWord(word: Prompt, lang: string) {
        let translatedWord = '';
        switch(lang){
          case 'en':
            translatedWord = word.english;
            break;
          case 'es':
            translatedWord = word.spanish;
            break;
        }
        return translatedWord;
      }
}