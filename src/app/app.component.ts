import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Client';
  constructor(
    private router: Router,
    private userService: UserService,
    private httpClient: HttpClient,
  ) {}

  authorizedUser$: Observable<User> = new Observable<User>()

  ngOnInit() {
    this.authorizedUser$ = this.userService.authorizedUser$;
    const user: string | null = localStorage.getItem('loginedUser');

    if (user) {
      const parsedUser = JSON.parse(user) as User;
      const serverUrl = 'http://localhost:3000';

      this.httpClient.get(`${serverUrl}/api/user/${parsedUser.id}`).subscribe(user => {
        console.log(user as User)
        this.userService.setAuthorizedUser(user as User);
      })

      this.router.navigate(['/user']);
    }
  }
}
