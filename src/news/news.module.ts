import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../share/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { services } from './services';
import { components, NewsDetailComponent } from './components';
import { NewsComponent } from './containers/news/news.component';
import { containers } from './containers/index';

const newsRoutes: Routes = [
  {path: '', component: NewsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(newsRoutes),
    MaterialModule,
    StoreModule.forFeature('news', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...containers,
    ...components,
  ],
  providers: [
    ...services
  ],
  entryComponents: [
    NewsDetailComponent,
  ]
})
export class NewsModule {
}
