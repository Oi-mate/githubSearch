import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appEffects, appReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SearchService } from './api/search.service';
import { SearchingComponent } from './features/searching/searching.component';
import { SearchingLineComponent } from './features/searching/searching-line/searching-line.component';
import { SearchResultsComponent } from './features/searching/search-results/search-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResultsRowComponent } from './features/searching/search-results/search-results-row/search-results-row.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchingComponent,
    SearchingLineComponent,
    SearchResultsComponent,
    SearchResultsRowComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
