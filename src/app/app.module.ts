import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteDialog, UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { AssociationsListComponent, DeleteAssociationDialog } from './associations-list/associations-list.component';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete/";
import { MatSnackBarModule } from "@angular/material/snack-bar/";
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card/";
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    DeleteDialog,
    DeleteAssociationDialog,
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    AssociationsListComponent,
    ProfileComponent,
    UserDetailComponent,
    HomeComponent,
    AssociationDetailComponent,
    UserFormComponent,
  ],
  imports: [
    MatDialogModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
