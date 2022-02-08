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
    this.tokenStorage.isLoggedObservable.subscribe(r => this.isLogged = r)
  }

  log(): void {
    if(this.isLogged){
      this.tokenStorage.clear();
      this.route.navigateByUrl("/home");
    } else {
      this.route.navigateByUrl("/login");
      this.playAudio()
    }
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/marseillaise.wav";
    audio.load();
    audio.play();
  }
}
