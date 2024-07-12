import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class RequestsService {
  constructor(private http: HttpClient) {}

  getUser(email: string){
    return this.http.post("https://localhost:3000/api/auth/login", {email: email})
  }

  addUser(user: User){
    return this.http.post("https://localhost:3000/api/auth/register", user)
  };
}
