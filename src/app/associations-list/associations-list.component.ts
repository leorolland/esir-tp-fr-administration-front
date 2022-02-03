import { Component, OnInit } from '@angular/core';
import { Association } from '../types/Association'
import { Observable } from 'rxjs';
import { AssociationsService } from '../services/associations.service';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})

export class AssociationsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'members'];  
  
  associations: Observable<Association[]> | undefined

  constructor(private associationsService: AssociationsService) { }

  ngOnInit(): void {
    this.associations = this.associationsService.getUsers();
  }
}