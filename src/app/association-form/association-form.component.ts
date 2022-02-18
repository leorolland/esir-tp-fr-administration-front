import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { AssociationsService } from '../services/associations.service';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { Association } from '../types/Association';
import { MembersControlService } from './elements/members-control-service';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss']
})
export class AssociationFormComponent implements OnInit {

  associationObservable: Observable<Association> | undefined
  association: Association | undefined
  form!: FormGroup;

  constructor(private associationsService: AssociationsService, 
    private route: ActivatedRoute,
    private mqs: MembersControlService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private snackbarService: MatSnackBar, 
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( res => {
      const name = res.get('name') || ''
      this.updateAssoObservable(name)
    })
    this.associationObservable?.subscribe(a => {
      this.association = a
      this.form = this.mqs.toFormGroup(a.members);
    })
  }

  updateAssoObservable(name: string) {
    this.associationObservable = this.associationsService.getByName(name)
  }

  save() {
    // For each member currently referenced
    // console.log(this.form.controls)
    console.log(this.form.value)
    if (!this.association || !this.association.name) return
    // Get the list of users
    let updateCount = 0
    this.usersService.getUsers().subscribe(users => {
      const observables: Observable<any>[] = this.association?.members.map(m => {
        // find the corresponding form control
        let newRole = this.form.value[m.firstname+m.lastname]
        if (newRole != m.role) {
          // find the user ID        
          const filteredUsers = users.filter(u => u.firstname == m.firstname && u.lastname == m.lastname)
          if (filteredUsers.length == 0) alert("No users found !")
          if (filteredUsers.length > 1) alert("Impossible to update, there are more than one user with this firstname and lastname and backend is incompatible with this feature")
          const id = filteredUsers[0].id
          if (!id || !this.association) return of(null)
          // Update the role
          console.log("updating role of current", m.role)
          updateCount++;
          return this.rolesService.updateRole(id, this.association?.name, newRole)
        } else return of(null)
      }) || []
      if (!observables.length) return
      forkJoin(observables).subscribe(() => { 
        this.updateAssoObservable(this.association?.name || '')
        this.snackbarService.open(`${updateCount} roles have been updated`) 
      })
    })
  }

}
