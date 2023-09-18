import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'dictionary-entry',
  templateUrl: './dictionary-entry.component.html',
  styleUrls: ['./dictionary-entry.component.scss']
})
export class DictionaryEntryComponent implements OnInit {
  sortAsc: boolean = false;
  searchPrompt: string = '';

  dictionary: {prompt: string, translation: string }[] = [];
  duplicateDictionary: {prompt: string, translation: string }[] = [];
  
  @Input() entries: {prompt: string, translation: string }[] = []

  ngOnInit() {
    const json = JSON.stringify(this.entries);
    this.dictionary = JSON.parse(json);
    this.duplicateDictionary = JSON.parse(json);
  }

  sort() {
    this.sortAsc = !this.sortAsc;
    if(this.sortAsc)
      this.dictionary.sort((a,b)=> {
        if(a.prompt > b.prompt) {
          return -1;
        } else {
          return 1;
        }
      });
    else {
      this.dictionary.sort((a,b)=> {
        if(a.prompt <= b.prompt) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }

  filter(event: KeyboardEvent) {
    const prompt = this.searchPrompt.toLowerCase();
    this.dictionary = this.duplicateDictionary.filter(x=>x.prompt.toLowerCase().includes(prompt) || x.translation.toLowerCase().includes(prompt));
  }
}
