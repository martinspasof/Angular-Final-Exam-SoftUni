import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Book } from '../../types/book';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService){}

  ngOnInit(){

    this.apiService.getBooks().subscribe(books=> {
      this.books = books;

      this.isLoading = false;      
    });
  }

}
