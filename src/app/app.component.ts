import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spanish Learning';
  loaded: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 300);
  }
}
