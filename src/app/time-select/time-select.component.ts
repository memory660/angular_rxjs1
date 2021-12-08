import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss'],
})
export class TimeSelectComponent implements OnInit {
  format = new FormControl('24h');
  formattedTime$ = combineLatest(
    interval(900).pipe(map(() => new Date())),
    this.format.valueChanges.pipe(startWith('24h'))
  ).pipe(map(([dateTime, format]) => this.formatTime(dateTime, format)));

  ngOnInit() {}

  constructor() {}

  formatTime(dateTime: Date, format: string) {
    return dateTime.toDateString() + format;
  }
}
