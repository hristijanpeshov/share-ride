import { Component, OnInit } from '@angular/core';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';
import { Trip } from '../models/trip';
import { TripType } from '../models/trip-type.enum';
import { ShareRideService } from '../service/share-ride.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] | undefined;
  Arr = Array;
  constructor(private service: ShareRideService) {}

  ngOnInit(): void {
    this.trips = this.service.trips;
  }

  passed(trip: Trip) {
    var timeNow = new Date();

    var timeTrip = new Date(trip.date);

    timeTrip.setHours(timeNow.getHours() + 24);

    return timeNow.getTime()  > timeTrip.getTime();
  }

  cancel(e: any) {
    this.confirmBox(+e.currentTarget.id); 
  }

  deleteTrip(id: number) {
    this.service.deleteFromList(id);
  }

  rate(e: any, tripId: number) {
    var number = +e.currentTarget.id;
    this.service.rate(tripId, number);
  }

  confirmBox(id: number) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Дали сте сигурни?');
    confirmBox.setMessage('Потврдете доколку сакате да го избришете патувањето!');
    confirmBox.setButtonLabels('ДА', 'НЕ');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER,
    });

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.Success) this.deleteTrip(id);
      subscription.unsubscribe();
    });
  }
}
