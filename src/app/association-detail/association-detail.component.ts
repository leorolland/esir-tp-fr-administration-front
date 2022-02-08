import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AssociationsService } from '../services/associations.service';
import { Association } from '../types/Association';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.scss']
})
export class AssociationDetailComponent implements OnInit {

  association: Observable<Association> | undefined

  constructor(private associationsService: AssociationsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( res => {
      const name = res.get('name') || ''
      this.association = this.associationsService.getByName(name)
    }) 
  }

}
