import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {User} from "../models/user"
import { UserService } from "../services/user.service";
import { MatDialog } from '@angular/material/dialog';
// import { NewsDialogComponent } from "../news-dialog/news-dialog.component";

@Component({
  selector: 'app-add-news',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublcationComponent implements OnInit {
  user: User;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.userService.getAuthorizedUser();
  }

  addNews: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });

  get textInput() { return this.addNews.get('textInput'); }

  onSubmit() {
    if (this.addNews.valid) {
      const userId = this.user?.id;
      const serverUrl = 'http://localhost:3000';
      const news = this.addNews.value;


      if (this.user && news) {
        this.user.news?.push(news.text)
        this.userService.setAuthorizedUser(this.user)
        this.httpClient.post(`${serverUrl}/api/post-news/${userId}`, news).subscribe();
        this.router.navigate(['/user'])
      }
    }
  }
}
