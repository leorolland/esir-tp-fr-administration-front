import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../types/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: Observable<User> | undefined

  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( res => {
      const id = + (res.get('id') || 0)
      this.user = this.usersService.getById(id)
    }) 
  }

}
