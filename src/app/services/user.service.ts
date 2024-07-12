import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient:HttpClient) {
    }
    serverUrl = 'http://localhost:3000'
    private plug: User = {
        id: -1,
        name: "name",
        date: "01/01/2000",
        email: "ex@ex.com",
        role: "active",
        status: "user",
        friends: [],
        news: [],
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAmgToSdzCG_-nvJwY2XmapBUFVlyQ6vBb99JNWEf7Xg&s"
    }

    private authorizedUserSubject = new BehaviorSubject<User>(this.plug);
    authorizedUser$: Observable<User> = this.authorizedUserSubject.asObservable();

    setAuthorizedUser(user: User) {
        this.authorizedUserSubject.next(user);
        localStorage.setItem('loginedUser', JSON.stringify(user));
    }

    getAllUsers() {
      return this.httpClient.get(`${this.serverUrl}/api/allNames`)
    }

    updateAuthorizedUser() {
        this.httpClient.get(`${this.serverUrl}/api/user/${this.authorizedUserSubject.value?.id}`).subscribe(user => {
            this.setAuthorizedUser(user as User)
        })
    }

  deleteFriend(friend: number) {
    this.httpClient.delete(`${this.serverUrl}/api/deleteFriend/${this.authorizedUserSubject.value?.id}/${friend}`).subscribe(val => {
      this.updateAuthorizedUser()
    })
  }

  addFriend(friend: number) {
    this.httpClient.post(`${this.serverUrl}/api/addFriend/${this.authorizedUserSubject.value?.id}`, {friend}).subscribe(val => {
      this.updateAuthorizedUser()
    })
  }

    getFriends(){
        return this.httpClient.get(`${this.serverUrl}/api/friends/${this.authorizedUserSubject.value?.id}`)
    }

    getAuthorizedUser(): User{
        return this.authorizedUserSubject.value;
    }
}
