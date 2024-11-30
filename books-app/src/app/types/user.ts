export interface User {
    books: string[];
    _id: string;
    tel: string;
    email: string;
    username: string;
    password: string;
    created_at: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface UserForAuth {
    username: string;
    email: string;
    tel?: string;
    password: string;
    _id: string;
  }