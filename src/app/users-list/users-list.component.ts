import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../types/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age', 'delete'];
 
  dataSource = new MatTableDataSource();

  constructor(private usersService: UsersService, public dialog: MatDialog, public snackbarService: MatSnackBar) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(u => this.dataSource.data = u)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteUser(event:MouseEvent, user:User){
    event.stopPropagation();
    this.dialog.open(DeleteDialog, {data : {firstname:user.firstname, lastname:user.lastname}}).afterClosed().subscribe(s => {
      if(s){
        this.usersService.deleteUser(user.id).subscribe(() => this.usersService.getUsers().subscribe(u => {
          this.dataSource.data = u; 
          this.snackbarService.open("Suppression effectuée", undefined, {verticalPosition: 'bottom', duration: 2000})}))
      }
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DeleteDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {firstname:string, lastname:string}){}
}
