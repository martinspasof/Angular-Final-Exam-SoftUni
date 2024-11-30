import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { CurrentBookComponent } from './book/current-book/current-book.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: "", redirectTo: '/home', pathMatch: 'full' },

    // Start - User routing
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // End - User routing

    // Start - Book routing
    {
        path: 'books', children: [
            { path: '', component: MainComponent },
            {
                path: ':bookId',
                component: CurrentBookComponent,
                canActivate: [AuthGuard] 
            },

        ]
    },
    { path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard] },    
    // End - Book routing

    // Start - About routing
    { path: 'about', component: AboutComponent },
    // End

    // Start - Contact routing
    { path: 'contact', component: ContactComponent },
    // End

    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
];
