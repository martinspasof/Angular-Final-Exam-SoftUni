# REST-api for Angular course in SoftUni

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://localhost:3000/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of Angular course workshop and final exam project in SoftUni",
    "main": "index.js",
}
```

If your response looks slightly different don't panic. This is probably because more data has been added to the API since I made this documentation.

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:3000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/users/register``` -- signing up;
* ```/users/login``` -- signing in;
* ```/users/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/users/register```

### Method --> ```POST```

### Body -->

```
{
    "name":"John Doe",
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

Not Required

```tel``` : [string] -- Optional;

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/users/login```

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/users/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: Books

* ```/books```
* ```/books/:bookId```
* ```/books/createBook```
* ```/books/latestBooks```

## Get Books
Returns all books as json.

### URL --> ```/books```

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "_id": "5f858dd2d895ad23602db9d4",
        "likedList": ['674a195e27ce7cc2a566855a'],
        "bookName": "Some Book",
        "image": "https://host/someBook.png",
        "description": "Some Book description",
        "userId": "5f8580d25d1da62568dd38fd",
        "created_at": "2020-10-13T11:21:54.863Z",
        "updatedAt": "2020-10-13T11:21:54.898Z",
        "__v": 0
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Create Book
Creates new Book with the first post of the author and returns the book as json.

### URL --> ```/books/createBook```

### Method --> ```POST```

### Body -->

```
    {
        "likedList": [],
        "bookName": "Some Book",
        "image": "https://host/someBook.png",
        "description": "Some Book description",
        "userId": "5f8580d25d1da62568dd38fd",
        "created_at": "2020-10-13T11:21:54.863Z",
        "updatedAt": "2020-10-13T11:21:54.898Z",
    }
```


### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f86c38abfa44331a0ff0093",
    "likedList": []
    "bookName": "Some Book",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Edit Book
Edit Book if the user is the author of the book and returns the changed book.

### URL --> ```/books/:bookId```

### Method --> ```PUT```

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f86c38abfa44331a0ff0093",
    "likedList": []
    "bookName": "Some Book",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Delete Book
Deletes Book if the user is the author of the book and returns the deleted book.

### URL --> ```/books/:bookId```

### Method --> ```DELETE```

### Success Response:

Code: 200

Content: 
``` 
{
    "_id": "5f86c38abfa44331a0ff0093",
    "likedList": []
    "bookName": "Some Book",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
## Like book
Adds like to the book.

### URL --> ```/likes/:bookId```

### Method --> ```PUT```

### Success Response:

Code: 200

Content: 
``` 
{
    message: "Liked successful!"
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
