import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user:any = [];

  constructor(public auth: AuthService, private router: Router) { }

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
