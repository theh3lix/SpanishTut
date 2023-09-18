import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Dictionary } from '../../models/dictionary.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent {
  dictionaryLoaded: boolean = false;

  nouns: {prompt: string, translation: string}[] = [];
  verbs: {prompt: string, translation: string}[] = [];
  adjectives: {prompt: string, translation: string}[] = [];
  
  verbPrompt: string = '';
  nounPrompt: string = '';
  adjectivePrompt: string = '';

  verbsAsc: boolean = false;


  constructor(private dataService: DataService) {
    this.dataService.getJSON('assets/input_files/data.json').subscribe(x => {
      const dictionary: Dictionary = x;
      this.nouns = dictionary.nouns.map(x=> {
        return {
          prompt: x.spanish,
          translation: x.english
        }
      });
      this.verbs = dictionary.verbs.map(x=> {
        return {
          prompt: x.spanish,
          translation: x.english
        }
      });
      this.adjectives = dictionary.adjectives.map(x=> {
        return {
          prompt: x.spanish,
          translation: x.english
        }
      });
      let categories = dictionary.nouns.map(x=>x.category);
      categories = categories.concat(dictionary.verbs.map(x=>x.category));
      categories = categories.concat(dictionary.adjectives.map(x=>x.category));
      categories = categories.map(item => item)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.dictionaryLoaded = true;
    })
  }
}
