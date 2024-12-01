import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Book } from '../../types/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  book = {} as Book;

  form = new FormGroup({
    bookName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(    
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router){}


  ngOnInit(): void {
    
    const id = this.route.snapshot.params['bookId'];

    this.apiService.getSingleBook(id).subscribe((book) => {
      this.book = book;
      this.form.setValue({
        bookName: book.bookName,
        image: book.image,
        description: book.description,
      });
    });
  }

  updateBook(){ 

    if(this.form.invalid){
      return;
    }

    const { bookName, image, description } = this.form.value as Book;
    
    const id = this.route.snapshot.params['bookId'];   

    this.apiService.updateBook(id, bookName, image, description).subscribe((book) => {
      this.book = book;
      
      this.router.navigate([`/books/${id}`]);
    });

  }
}
