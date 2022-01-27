import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiHelperService) { }

  ngOnInit(): void {
  }

  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: '/auth/login', data: { username, password },}).then(response => console.log(response));
  }

}
