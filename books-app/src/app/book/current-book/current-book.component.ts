import { Component } from '@angular/core';
import { Book } from '../../types/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-current-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-book.component.html',
  styleUrl: './current-book.component.css'
})
export class CurrentBookComponent {

  book = {} as Book;
  booksLikesList = 0;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId'];    

    this.apiService.getSingleBook(id).subscribe((book) => {
      this.booksLikesList = book?.likedList?.length || 0;
      this.isOwner = this.userService.user?._id.toString() === book.userId.toString();
     
      this.book = book;
    });
  }

}
