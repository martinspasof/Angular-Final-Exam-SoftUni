import { Component } from '@angular/core';
import { BooksListComponent } from '../book/books-list/books-list.component';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BooksListComponent, HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService){}

}
