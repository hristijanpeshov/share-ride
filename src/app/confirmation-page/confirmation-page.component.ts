import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { ShareRideService } from '../service/share-ride.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent implements OnInit {
  id: number | undefined;
  trip: Trip | undefined;

  constructor(
    private service: ShareRideService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((paramsMap) => +paramsMap.get('id')!!))
      .subscribe((it) => {
        this.trip = this.service.findById(it);
      });
  }
}
