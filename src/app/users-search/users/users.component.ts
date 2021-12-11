import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userDetail$!: Observable<User | undefined>;
  //
  filterUserSubject = new BehaviorSubject<string>('');
  filterUserAction$ = this.filterUserSubject.asObservable();
  error!: boolean;
  users$ = combineLatest([
    this.userService.cumulativeUser$,
    this.filterUserAction$,
  ]).pipe(
    map(([users, term]) =>
      users.filter((user: User) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      )
    ),
    catchError((err) => {
      console.trace();
      this.error = true;
      return EMPTY;
    })
  );

  constructor(private userService: UsersService) {
    this.userDetail$ = this.userService.selectedUserData$;
  }

  ngOnInit() {}

  onSelected(id: number) {
    this.userService.onSelectedUser(id);
  }

  addUser() {
    this.userService.addUser();
  }

  onInput(term: string) {
    console.log(term);
    this.filterUserSubject.next(term);
  }
}
