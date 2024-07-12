import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient, private userService: UserService) {}

    login(email: string): Observable<any> {
        const serverUrl = 'http://localhost:3000'; // Используйте правильный URL вашего сервера

        const loginData = {email};

        return this.httpClient.post(`${serverUrl}/api/auth/login`, loginData).pipe(
            tap((response: any) => {
                if (response) {
                    const authenticatedUser = response;

                    this.userService.setAuthorizedUser(authenticatedUser);
                    return authenticatedUser;
                } else {
                    throw new Error('Ошибка аутентификации');
                }
            })
        );
    }
}
