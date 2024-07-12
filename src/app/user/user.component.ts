import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {
  authorizedUser$: Observable<User> = new Observable<User>()
  user: User;
  allUsers: (User)[];
  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.authorizedUser$ = this.userService.authorizedUser$;
    // @ts-ignore
    // this.user = JSON.parse(localStorage.getItem("loginedUser"))

    this.authorizedUser$.subscribe(user => {
      this.user = user;
    })
  }

  deleteAvatar(){
    if (!this.user) return;

    const serverUrl = 'http://localhost:3000';

    this.httpClient.delete(`${serverUrl}/api/user/${this.user.id}/delete-avatar`).subscribe(val => {
      console.log(val, 1234)
    })

    this.userService.updateAuthorizedUser()
    this.router.navigate(['/user'])
  }

  selectedFile: string;
  loading = false;
  editAvatar(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    const serverUrl = 'http://localhost:3000';

    reader.addEventListener('load', (event: any) => {
      this.loading = true;
      this.httpClient.post(`${serverUrl}/api/image-upload/${this.user.id}`, {image: event.target.result})
          .subscribe(_ => {
            this.userService.updateAuthorizedUser()
            this.loading = false;
          })
    });

    reader.readAsDataURL(file);
  }
}
