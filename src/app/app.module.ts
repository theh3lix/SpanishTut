import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './shared/components/card/card.component';
import { ToBeComponent } from './features/home/components/to-be/to-be.component';
import { SimpleTabComponent } from './shared/components/simple-tab/simpletab.component';
import { ConjugationComponent } from './features/home/components/conjugation/conjugation.component';
import { DictionaryComponent } from './features/dictionary/pages/dictionary/dictionary.component';
import { DictionaryEntryComponent } from './features/dictionary/components/dictionary-entry/dictionary-entry.component';
import { DataService } from './shared/services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VocabularyComponent } from './features/vocabulary/pages/vocabulary/vocabulary.component';
import { VocabularyCategoriesComponent } from './features/vocabulary/components/vocabulary-categories/vocabulary-categories.component';
import { VocabularyExercisesComponent } from './features/vocabulary/components/vocabulary-exercises/vocabulary-exercises.component';
import { VocabularySettingsComponent } from './features/vocabulary/components/vocabulary-settings/vocabulary-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CardComponent,
    ToBeComponent,
    SimpleTabComponent,
    ConjugationComponent,
    DictionaryComponent,
    DictionaryEntryComponent,
    VocabularyComponent,
    VocabularyCategoriesComponent,
    VocabularyExercisesComponent,
    VocabularySettingsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
