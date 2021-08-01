import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user:any = [];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.obtenerUsuario()
  }

  obtenerUsuario(){
    this.user = this.auth.getUsuario()
  }

  cerra(){
    this.auth.logout()
  }
}
