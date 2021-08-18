import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',

})
export class NavbarComponent implements OnInit {


  constructor(private router:Router, public auth: AuthService) {

   }
  ngOnInit(): void {}

  buscarSeccion(termino:string){
    //console.log(termino);
    this.router.navigate(['/buscar', termino]);
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
