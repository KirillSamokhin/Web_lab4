import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component"
import {NewsComponent} from "./news/news.component";
import {PublcationComponent} from "./publication/publication.component";
import {FriendsComponent} from "./friends/friends.component";
import {MessengerComponent} from "./messenger/messenger.component";

const routes: Routes = [
    {path: '', pathMatch: "full", redirectTo: '/login'},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent},
    {path: 'news', component: NewsComponent},
    {path: 'publication', component: PublcationComponent},
    {path: 'friends', component: FriendsComponent},
    {path: 'messenger', component: MessengerComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
