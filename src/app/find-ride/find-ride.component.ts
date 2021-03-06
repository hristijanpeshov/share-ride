import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { TripType } from '../models/trip-type.enum';
import { ShareRideService } from '../service/share-ride.service';

@Component({
  selector: 'app-find-ride',
  templateUrl: './find-ride.component.html',
  styleUrls: ['./find-ride.component.css'],
})
export class FindRideComponent implements OnInit {
  today: string | undefined;
  timeSelected = '';
  dateSelected = '';
  startLocation = '';
  endLocation = '';
  payingMethod = '';
  valid = false;
  validPaying = false;
  show = 0;

  constructor(
    private service: ShareRideService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

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

  payingNext() {
    this.show = -1;
  }

  backToInfo() {
    this.show = 4;
  }

  savePayingMethod(e: any) {
    this.payingMethod = e.target.id;
    this.validPaying = this.checkValidationOnceAgain();
  }

  checkValidation() {
    return (
      this.startLocation != '' &&
      this.endLocation != '' &&
      this.dateSelected != '' &&
      this.timeSelected != ''
    );
  }

  checkValidationOnceAgain() {
    return (
      this.startLocation != '' &&
      this.endLocation != '' &&
      this.dateSelected != '' &&
      this.timeSelected != '' &&
      this.payingMethod != ''
    );
  }

  submit() {
    var tripId = this.service.saveNewTrip(
      this.startLocation,
      this.endLocation,
      this.dateSelected,
      this.timeSelected,
      TripType.PASSENGER,
      this.payingMethod
    );
    this.router.navigate([`confirmation/${tripId}`]);
  }

  confirmBox() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('???????? ?????? ???????????????');
    confirmBox.setMessage('?????? ???????????????????? "????", ???????? ???????????????? ???? ???? ??????????????!');
    confirmBox.setButtonLabels('????', '????');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.Success) {this.router.navigate(['home'])};
      subscription.unsubscribe();
    });
  }

  submitYes() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('???????? ?????? ???????????????');
    confirmBox.setMessage('???? ???????????????????? ???? ?????????????? "????", ???????????? ???????????? ???? ???????? ????????????????!');
    confirmBox.setButtonLabels('????', '????');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.Success) this.submit();
      subscription.unsubscribe();
    });
  }
}
