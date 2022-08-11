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
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ContentContainerComponent } from './features/searching/content-container/content-container.component';
import { RepoDetailsComponent } from './features/details/repo-details/repo-details.component';
import { FetchPipe } from '../utils/fetch.pipe';
import { FetchService } from './api/fetch.service';
import { RepoDetailsDumbComponent } from './features/details/repo-details/repo-details-dumb/repo-details-dumb.component';
import { OwnerDetailsComponent } from './features/details/repo-details/owner-details/owner-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchingComponent,
    SearchingLineComponent,
    SearchResultsComponent,
    SearchResultsRowComponent,
    SpinnerComponent,
    ContentContainerComponent,
    RepoDetailsComponent,
    FetchPipe,
    RepoDetailsDumbComponent,
    OwnerDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // not quite angular-material component. but since material uses angular-cdk under the hood I decided why not
    ScrollingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [SearchService, FetchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
