import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-registration',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
    constructor(private httpClient: HttpClient, private router: Router) {
    }

    signIn: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required])
    });

    hide = true;
    isRegisteredOver = false;

    get nameInput() {return this.signIn.get('nameInput');}
    get birthdateInput() {return this.signIn.get('birthdateInput');}
    get emailInput() {return this.signIn.get('emailInput');}

    onSubmit() {
        if (this.signIn.valid) {
            const serverUrl = 'http://localhost:3000';
            const newUser = this.signIn.value;

            const originalDate = new Date(newUser.date);
            const day = originalDate.getDate().toString().padStart(2, '0');
            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
            const year = originalDate.getFullYear();
            newUser.date = `${day}.${month}.${year}`;

            newUser.photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAmgToSdzCG_-nvJwY2XmapBUFVlyQ6vBb99JNWEf7Xg&s'; // default vk img
            newUser.role = "user";
            newUser.status = "active";
            newUser.friends = [];
            newUser.news = [];

            this.httpClient.post(`${serverUrl}/api/auth/register`, newUser).subscribe();
            this.isRegisteredOver = true;

            setTimeout(() => {
                this.isRegisteredOver = false;
                this.router.navigate(['/login'])
            }, 500)
        }
    }
}
