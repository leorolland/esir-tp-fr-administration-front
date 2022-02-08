import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() id: number | undefined;

  profileGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    age: new FormControl(0)
  })

  constructor(
    private usersService: UsersService, 
    private tokenStorageService: TokenStorageService,
    private snackbarService: MatSnackBar, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // If no input is passed, check in route
    if (!this.id) {
      this.route.paramMap.subscribe( res => {
        this.id = + (res.get('id') || -1)
        if (this.id >= 0) this.load(this.id)
      }) 
    } else {
      this.load(this.id)
    }
  }

  load(id: number) {
    this.usersService.getById(id).subscribe(user => {
      this.profileGroup.get("firstname")?.setValue(user.firstname)
      this.profileGroup.get("lastname")?.setValue(user.lastname)
      this.profileGroup.get("age")?.setValue(user.age)
    })
  }

  save(): void {
    this.profileGroup.disable()
    this.usersService.save({
      id: this.id,
      ...this.profileGroup.value
    }).subscribe(user => {
      this.profileGroup.enable()
      if (user) {
        this.snackbarService.open("✔️ Mise à jour effectuée", undefined, {verticalPosition: 'top', duration: 2000})
      }
    })
  }

}
