import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user"

@Component({
  selector: 'app-user-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})

export class FriendsComponent implements OnInit {
  authorizedUser$: Observable<User> = new Observable<User>()
  user: User;
  allUsers: (User)[];
  friends: (User)[];
  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.authorizedUser$ = this.userService.authorizedUser$;
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("loginedUser"))

    this.authorizedUser$.subscribe(user => {
      this.user = user;

      this.userService.getAllUsers().subscribe(users => {
        this.allUsers = users as (User)[];

        this.friends = this.allUsers.filter(user => {
          return this.user.friends.includes(user.id);
        });
        this.allUsers = this.allUsers.filter(user => {
          return user.name !== this.user.name && !this.user.friends.includes(user.id);
          console.log
        });
      })
    })
  }

  onFriendDeleteButton(friend: number) {
    this.userService.deleteFriend(friend)
    this.router.navigate(['/friends'])
  }

  onFriendAddButton(friend: number) {
    this.userService.addFriend(friend)
    this.router.navigate(['/friends'])
  }
}
