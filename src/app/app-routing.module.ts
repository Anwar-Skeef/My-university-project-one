import { VerifiedComponent } from './signup/verified/verified.component';
import { OfferComponent } from './browse-offer/offer/offer.component';
import { BrowseOfferComponent } from './browse-offer/browse-offer.component';
import { SellHomeComponent } from './sell-home/sell-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sellHome', component: SellHomeComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'browseOffer', component: BrowseOfferComponent },
  { path: 'offer/:id', component: OfferComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
