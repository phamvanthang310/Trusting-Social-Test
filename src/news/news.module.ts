import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent, NewsDetailComponent } from './containers';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../share/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { services } from './services';
import { components } from './components';

const newsRoutes: Routes = [
  {path: '', component: NewsComponent},
  {path: 'details/:id', component: NewsDetailComponent}
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
    NewsComponent,
    NewsDetailComponent,
    ...components,
  ],
  providers: [
    ...services
  ]
})
export class NewsModule {
}
