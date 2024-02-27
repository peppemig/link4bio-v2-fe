import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GlobalHttpErrorHandler } from './shared/interceptors/global-http-error-handler.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { JwtAuth } from './shared/interceptors/jwt-auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'link4bio',
        appId: '1:733529052059:web:c5bfc9c9ddbd0abc92873e',
        storageBucket: 'link4bio.appspot.com',
        apiKey: 'AIzaSyCrVQa5ekvbvVlacAINqhyjAWVrlps1Y5Q',
        authDomain: 'link4bio.firebaseapp.com',
        messagingSenderId: '733529052059',
      })
    ),
    provideAuth(() => getAuth()),
  ],
  exports: [],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtAuth,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
