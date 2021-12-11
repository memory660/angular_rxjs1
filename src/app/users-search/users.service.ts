import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  scan,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { Post, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  //BASE USER STREAM
  private allUsers$ = this.http.get<User[]>(`${this._baseUrl}/users`).pipe(
    map((users) =>
      users.map(
        (user) =>
          ({
            ...user,
            username: `${user.username}@${user.website}`,
          } as User)
      )
    ),
    catchError((err) => {
      console.error(err);
      return throwError(err);
    }),
    shareReplay(1)
  );

  //BASE POSTS STREAM
  private allPosts$ = this.http.get<Post[]>(`${this._baseUrl}/posts`).pipe(
    catchError((err) => {
      console.error(err);
      return throwError(err);
    }),
    shareReplay(1)
  );

  //BASE USER WITH POSTS STREAMS
  private usersWithPosts$ = combineLatest([
    this.allUsers$,
    this.allPosts$,
  ]).pipe(
    map(([users, posts]) =>
      users.map(
        (user) =>
          ({
            ...user,
            post: posts.filter((p) => p.userId === user.id),
          } as User)
      )
    ),
    shareReplay(1)
  );

  //ACTION STREAM FOR EMITTING A USER TO BE ADDED
  private addUserSubject = new Subject<User>();
  addUserAction$ = this.addUserSubject.asObservable();

  addUser() {
    //TYPICALLY DONE IN  FORM BUT IM BEING LAZY
    let user: User = {
      id: Math.floor(Math.random() * 1000),
      name: 'Chandler',
      username: 'CB',
      email: 'COMBINED@april.biz',
      address: {
        street: 'dd Light',
        suite: 'Apt. 556',
        city: 'dddd',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };
    console.log('adding user', user);
    this.addUserSubject.next(user);
  }
  //Merge Emissions from both streams
  //Use SCAN to maintain a client state of added users
  cumulativeUser$ = merge(
    this.addUserAction$.pipe(
      concatMap((user) => this.http.post<User>(`${this._baseUrl}/users`, user)),
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    ),
    this.usersWithPosts$
  ).pipe(
    scan((acc: any, value) => [...acc, value]),
    shareReplay(1)
  );
  //Responding to USER action and grabbing USER they selected
  private selectedUserSubject = new BehaviorSubject<number | null>(null);
  selectedUserAction$ = this.selectedUserSubject.asObservable();
  onSelectedUser(id: number) {
    this.selectedUserSubject.next(id);
  }

  selectedUserData$: Observable<User | undefined> = combineLatest([
    this.cumulativeUser$,
    this.selectedUserAction$,
  ]).pipe(
    map(([allUsers, selectedUser]) =>
      allUsers.find((u: User) => u.id === selectedUser)
    )
  );
}
