import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TripType } from '../models/trip-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ShareRideService {
  nextId: number = 4;

  trips: Trip[] = [
    new Trip(1, 'Скопје', 'Велес', '2021-05-30', '15:30', TripType.PASSENGER, "Кеш"),
    new Trip(2, 'Скопје', 'Берово', '2021-05-01', '11:20', TripType.PASSENGER, "Картичка"),
    new Trip(3, 'Скопје', 'Битола', '2021-10-11', '15:00', TripType.DRIVER, "")
  ];

  getTimeNow(): string {
    var timeNow = new Date();

    return (
      timeNow.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      timeNow.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  }

  getDateNow(): string {
    var tmp = new Date();
    var dd: string | number = tmp.getDate();
    var mm: string | number = tmp.getMonth() + 1;
    var yyyy = tmp.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
  }

  findById(id: number) {
    return this.trips.find((s) => s.id == id);
  }

  saveNewTrip(
    destination: string,
    startLocation: string,
    date: string,
    time: string,
    type: TripType,
    payingMethod: string
  ) {
    this.trips.push(
      new Trip(this.nextId++, destination, startLocation, date, time, type, payingMethod)
    );
    return this.nextId - 1;
  }

  deleteFromList(id: number) {
    var trip = this.trips.find((s) => s.id == id);
    var index = this.trips.indexOf(trip!, 0);
    if (index > -1) {
      this.trips.splice(index, 1);
    }
  }

  rate(id: number, stars: number) {
    this.trips.filter((s) => s.id == id).forEach((s) => (s.rated = stars));
  }
}
