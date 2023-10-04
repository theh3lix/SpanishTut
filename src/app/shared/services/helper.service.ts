import { Injectable } from "@angular/core";
import { Prompt } from "src/app/features/vocabulary/models/prompt.model";
import { Word } from "src/app/features/vocabulary/models/word.model";

@Injectable()
export class Helpers {

    getOptions(word: Prompt, lang: string): string[] {
        let option: string = '';
        switch(lang){
            case 'es':
                option = word.english;
                break;
            case 'en':
                option = word.spanish;
                break;
        }
        const options: string[] = [option].concat(word.wrongAnswers);
        this.mixWords(options);
        return options;
    }

    selectRandomWord(availableWords: Word[]) {
        const i = Math.ceil(Math.random() * availableWords.length) - 1;
        const word = availableWords[i];
        return word;
    }

    getSameCategoryWords(availableWords: Word[], category: string): Word[] {
        let sameCategoryWords = availableWords.filter(x => x.category == category);
        if (sameCategoryWords.length < 4)
            sameCategoryWords = availableWords;
        return sameCategoryWords;
    }
    

    mixWords(words: string[]) {
        words.sort(() => (Math.random() > .5) ? 1 : -1);
    }
}