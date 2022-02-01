import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private tokenStorage: TokenStorageService, private route: Router) {  }

  ngOnInit(): void {
    this.isLogged = this.tokenStorage.isLogged()
  }

  logout(): void {
    this.tokenStorage.clear();
    this.route.navigateByUrl("/login");
  }
}
