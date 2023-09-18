import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { DictionaryComponent } from './features/dictionary/pages/dictionary/dictionary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dictionary', component: DictionaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
