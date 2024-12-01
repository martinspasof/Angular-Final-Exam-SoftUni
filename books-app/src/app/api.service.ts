import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Like } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBooks(limit?: number){

    let url = `/api/books`;
    if(limit){
      url += `?limit=${limit}`;
    }
    return this.http.get<Book[]>(url);
  }

  getSingleBook(id:string){

    return this.http.get<Book>(`/api/books/${id}`);
  }

  createBook(bookName: string, image: string, description: string){
   
    const payload = { bookName, image, description };
    return this.http.post<Book>(`/api/books`, payload);
  }

  updateBook(bookId: string, bookName: string, image: string, description: string) {
    const payload = { bookName, image, description };
    return this.http.put<Book>(`/api/books/${bookId}`, payload);
  }

  // delete -> http.delete theme ID
  deleteBook(bookId: string) {
    return this.http.delete(`/api/books/${bookId}`);
  }

  isLiked(bookId: string) {
    const payload = { bookId };
    return this.http.put<Like>(`/api/likes/${bookId}`, payload);
  }

}
