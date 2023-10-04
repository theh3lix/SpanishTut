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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VocabularyComponent } from './features/vocabulary/pages/vocabulary/vocabulary.component';
import { VocabularyCategoriesComponent } from './features/vocabulary/components/vocabulary-categories/vocabulary-categories.component';
import { VocabularyExercisesComponent } from './features/vocabulary/components/vocabulary-exercises/vocabulary-exercises.component';
import { VocabularySettingsComponent } from './features/vocabulary/components/vocabulary-settings/vocabulary-settings.component';
import { VocabularyMainComponent } from './features/vocabulary/components/vocabulary-main/vocabulary-main.component';
import { DefaultModelsService } from './shared/services/default-models.service';
import { VocabularyTypeComponent } from './features/vocabulary/components/exercises/vocabulary-exercise-typing/vocabulary-exercise-typing.component';
import { VocabularyExerciseOptionsComponent } from './features/vocabulary/components/exercises/vocabulary-exercise-options/vocabulary-exercise-options.component';
import { Helpers } from './shared/services/helper.service';
import { VocabularyService } from './features/vocabulary/services/vocabulary.service';

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
    VocabularySettingsComponent,
    VocabularyMainComponent,
    VocabularyTypeComponent,
    VocabularyExerciseOptionsComponent
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
    DataService,
    DefaultModelsService,
    Helpers,
    VocabularyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
