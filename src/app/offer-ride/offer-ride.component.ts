import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';
import { TripType } from '../models/trip-type.enum';
import { ShareRideService } from '../service/share-ride.service';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
})
export class OfferRideComponent implements OnInit {
  today: string | undefined;
  timeSelected = '';
  dateSelected = '';
  startLocation = '';
  endLocation = '';
  valid = false;
  show = 0;

  constructor(private service: ShareRideService, private router: Router) {}

  ngOnInit(): void {
    this.today = this.service.getDateNow();
  }

  next() {
    this.show += 1;
    this.valid = this.checkValidation();
  }

  back() {
    this.show -= 1;
  }

  divClicked(e: any) {
    var clicked = +e.currentTarget.id;
    this.show = clicked;
  }

  saveDestination(e: any) {
    this.endLocation = e.target.value;
  }

  saveStartLocation(e: any) {
    this.startLocation = e.target.value;
  }

  saveDate(e: any) {
    this.dateSelected = e.target.value;
  }

  saveTime(e: any) {
    this.timeSelected = e.target.value;
  }

  checkValidation() {
    return (
      this.startLocation != '' &&
      this.endLocation != '' &&
      this.dateSelected != '' &&
      this.timeSelected != ''
    );
  }

  submit() {
    var tripId = this.service.saveNewTrip(
      this.startLocation,
      this.endLocation,
      this.dateSelected,
      this.timeSelected,
      TripType.DRIVER,
      ""
    );
    this.router.navigate([`confirmation/${tripId}`]);
  }

  confirmBox() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Дали сте сигурни?');
    confirmBox.setMessage('Ако притиснете "ДА", сите податоци ќе се изгубат!');
    confirmBox.setButtonLabels('ДА', 'НЕ');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.Success) this.router.navigate(['home']);
      subscription.unsubscribe();
    });
  }

  submitYes() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Дали сте сигурни?');
    confirmBox.setMessage('Со притискање на копчето "ДА", вашата понуда ќе биде зачувана!');
    confirmBox.setButtonLabels('ДА', 'НЕ');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.Success) this.submit();
      subscription.unsubscribe();
    });
  }
}
