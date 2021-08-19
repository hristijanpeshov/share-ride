import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FindRideComponent } from './find-ride/find-ride.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { TripsComponent } from './trips/trips.component';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindRideComponent,
    OfferRideComponent,
    TripsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
