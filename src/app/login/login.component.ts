import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  waitingForResponse = false

  constructor(private api: ApiHelperService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.waitingForResponse = true;
    this.api.post({endpoint: '/auth/login', data: { username, password },})
      .catch(e => alert(e.message))
      .then(response => this.tokenStorageService.save(response.access_token, username))
      .then(() => {
        if (this.tokenStorageService.isLogged()) {
          this.router.navigateByUrl('/users')
        } else {

        }
      })
      .finally(() => this.waitingForResponse = false)
  }

}
