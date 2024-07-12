import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})

export class AuthComponent  {
    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService
        ){}

    loginIn: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
    });

    hide = true;

    get emailInput() { return this.loginIn.get('emailInput'); }

    onSubmit() {
        if (this.loginIn.valid) {
            const { email} = this.loginIn.value;

            this.authService.login(email).subscribe((user) => {
                if (user) {
                    this.userService.setAuthorizedUser(user); // Установка authorizedUser через UserService
                    this.router.navigate(['/user']);
                }
            });
        }
    }
}
