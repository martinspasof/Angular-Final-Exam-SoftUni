import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  constructor(private apiService: ApiService, private router: Router){}

  createBook(form: NgForm){ 

    if(form.invalid){      
      
      return;
    }

    const { bookName, image, description } = form.value;

    this.apiService.createBook(bookName, image, description).subscribe(() => {
      
      this.router.navigate(['/books']);
    });

  }

}