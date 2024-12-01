import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksListComponent } from '../book/books-list/books-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BooksListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @Input() latestBooks?: number;

}
