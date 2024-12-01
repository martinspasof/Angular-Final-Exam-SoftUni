import { User } from './user';

export interface Book {
  // subscribers: string[];
  _id: string;
  bookName: string;
  image: string;
  description: string;
  userId: User;
  likedList: User[];
  owner: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface Like {
  _id: string;
}