import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { FindRideComponent } from './find-ride/find-ride.component';
import { HomeComponent } from './home/home.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: 'confirmation/:id', component: ConfirmationPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'find', component: FindRideComponent },
  { path: 'offer', component: OfferRideComponent },
  { path: 'trips', component: TripsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
