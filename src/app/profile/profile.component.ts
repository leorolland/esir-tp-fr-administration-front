import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: number | undefined

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.id = this.tokenStorageService.getUsernameKey()
  }

}
