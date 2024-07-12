import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user"

interface INews {
    name: string,
    news: string[]
}

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
})

export class NewsComponent implements OnInit {
    constructor(
        private userService: UserService) {}
    news: INews[] = [];

    authorizedUser$: Observable<User> = new Observable<User>()

    ngOnInit() {
        this.authorizedUser$ = this.userService.authorizedUser$;

        this.authorizedUser$.subscribe((user) => {
            if (user) {
                this.userService.getFriends().subscribe(val => {
                    let friends = val as (User)[]
                    friends.forEach(friend => {
                        this.news.push(<INews>{
                            name: friend.name,
                            news: friend.news
                        })
                    })
                })
            }
        })
    }
}
