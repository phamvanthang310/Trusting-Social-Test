import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../share/material.module';
import { components } from './components';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const appRoutes: Routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', loadChildren: '../news/news.module#NewsModule'},
  {path: '**', component: PageNotFoundComponent}
];

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ...components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    StoreModule.forRoot([], {metaReducers}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
