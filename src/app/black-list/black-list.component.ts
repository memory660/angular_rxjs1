import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.scss'],
})
export class BlackListComponent implements OnInit {
  users = [
    { name: 'John', id: 1 },
    { name: 'Andrew', id: 2 },
    { name: 'Anna', id: 3 },
    { name: 'Iris', id: 4 },
  ];

  blackListedUsers = new FormControl([]);
  selectedUserId = new FormControl(null);
  allowBlackListedUsers = new FormControl(false);
  isDisabled$ = combineLatest([
    this.allowBlackListedUsers.valueChanges.pipe(startWith(false)),
    this.blackListedUsers.valueChanges.pipe(startWith([])),
    this.selectedUserId.valueChanges.pipe(
      startWith(null),
      map((id) => +id)
    ),
  ]).pipe(
    map(
      ([allowBlackListed, blackList, selected]) =>
        !allowBlackListed && blackList.includes(selected)
    )
  );

  constructor() {}

  ngOnInit(): void {}
}
