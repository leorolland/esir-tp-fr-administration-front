import { Component, Inject, OnInit } from '@angular/core';
import { AssociationsService } from '../services/associations.service';
import { MatTableDataSource } from '@angular/material/table';
import { Association } from '../types/Association';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})

export class AssociationsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dateOfCreation', 'members', 'delete'];  
  
  dataSource = new MatTableDataSource();

  constructor(private associationsService: AssociationsService, public dialog: MatDialog, public snackbarService: MatSnackBar) { }

  ngOnInit(): void {
    this.associationsService.getAll().subscribe(a => this.dataSource.data = a)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteAssociation(event:MouseEvent, assoc:Association){
    event.stopPropagation();
    this.dialog.open(DeleteAssociationDialog, {data : {firstname:assoc.name}}).afterClosed().subscribe(s => {
      if(s){
        this.associationsService.deleteAssociation(assoc.name).subscribe(() => this.associationsService.getAll().subscribe(u => {
          this.dataSource.data = u; 
          this.snackbarService.open("🗑️ Suppression effectuée", undefined, {verticalPosition: 'bottom', duration: 2000})}))
      }
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-association-dialog.html',
})
export class DeleteAssociationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name:string}){}
}