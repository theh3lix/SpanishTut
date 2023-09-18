import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFiller = false;
  navbarElements: {label: string, route: string, icon: string}[] = [
    { 
      label: 'Dictionary', 
      route: 'dictionary', 
      icon: 'list'
    },
    {
      label: 'Vocabulary', 
      route: '', 
      icon: 'language'
    },
    {
      label: 'More Vocabulary', 
      route: '', 
      icon: 'assignment'
    },
    {
      label: 'Even More Vocabulary', 
      route: '', 
      icon: 'book'
    },
    {
      label: 'Contact', 
      route: '', 
      icon: 'alternate_email'
    }
  ]
  highlightedEntry: number | null = null;

  highlightEntry(entryNumber: number): void {
    this.highlightedEntry = entryNumber;
  }

  unhighlightEntry(): void {
    this.highlightedEntry = null;
  }
}
