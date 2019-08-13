import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  nomeEscola:any;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.nomeEscola = this.authService.get_escola_nome;
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logout(){
    this.authService.SignOut();
  }

  

}
