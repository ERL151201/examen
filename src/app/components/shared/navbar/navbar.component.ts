import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',

})
export class NavbarComponent implements OnInit {

  
  constructor(private router:Router, public afAuth: AngularFireAuth) { }
  
  ngOnInit(): void {
    
  }

  buscarSeccion(termino:string){
    //console.log(termino);
    this.router.navigate(['/buscar', termino]);
  }

  


}
