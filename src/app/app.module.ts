import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomePageComponent } from './home-page/home-page.component';
import { SellHomeComponent } from './sell-home/sell-home.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowseOfferComponent } from './browse-offer/browse-offer.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { OfferComponent } from './browse-offer/offer/offer.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ScrollDirective } from './Directives/scroll.directive';
import { VerifiedComponent } from './signup/verified/verified.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    SellHomeComponent,
    BrowseOfferComponent,
    OfferComponent,
    ScrollDirective,
    VerifiedComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    GoogleMapsModule,
    FileUploadModule,
    CardModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
