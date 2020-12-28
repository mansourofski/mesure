import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {BookListComponent} from './book-list/book-list.component';
import {SingleBookComponent} from './book-list/single-book/single-book.component';
import {BookFormComponent} from './book-list/book-form/book-form.component';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './service/auth.service';
import {BooksService} from './service/books.service';
import {AuthGuardService} from './service/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { ClientFormComponent } from './list-clients/client-form/client-form.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { SingleClientComponent } from './list-clients/single-client/single-client.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'books', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
  {path: 'clients', canActivate: [AuthGuardService], component: ListClientsComponent},
  {path: 'clients/new', canActivate: [AuthGuardService], component: ClientFormComponent},
  {path: 'clients/view/:id', canActivate: [AuthGuardService], component: SingleClientComponent},
  {path: '', redirectTo: 'clients', pathMatch: 'full'},
  {path: '**', redirectTo: 'books'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    ClientFormComponent,
    ListClientsComponent,
    SingleClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
