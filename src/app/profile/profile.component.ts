import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';
import { User } from '../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    age: new FormControl(0)
  })

  constructor(
    private usersService: UsersService, 
    private tokenStorageService: TokenStorageService,
    private snackbarService: MatSnackBar) { }

  ngOnInit(): void {
    this.usersService.getById(this.tokenStorageService.getUsernameKey()).subscribe(user => {
      this.profileGroup.get("firstname")?.setValue(user.firstname)
      this.profileGroup.get("lastname")?.setValue(user.lastname)
      this.profileGroup.get("age")?.setValue(user.age)
    })
  }

  save(): void {
    this.profileGroup.disable()
    this.usersService.save({
      id: this.tokenStorageService.getUsernameKey(),
      ...this.profileGroup.value
    }).subscribe(user => {
      this.profileGroup.enable()
      if (user) {
        this.snackbarService.open("✔️ Mise à jour effectuée", undefined, {verticalPosition: 'top', duration: 2000})
      }
    })
  }

}
