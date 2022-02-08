import { Component, OnInit } from '@angular/core';
import { AssociationsService } from '../services/associations.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})

export class AssociationsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dateOfCreation', 'members'];  
  
  dataSource = new MatTableDataSource();

  constructor(private associationsService: AssociationsService) { }

  ngOnInit(): void {
    this.associationsService.getAll().subscribe(a => this.dataSource.data = a)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}