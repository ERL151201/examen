import { Component, OnInit } from '@angular/core';
import { SeccionesService, Seccion } from '../../services/secciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
 
})
export class SeccionesComponent implements OnInit {

  secciones:Seccion[] = [];
  constructor(private _seccionesService: SeccionesService,
              private router:Router          
    ) {

  
  
   }

  ngOnInit() {
    
    this.secciones = this._seccionesService.getSecciones();
  
    
    
  }

  verSeccion(idx:number){
      this.router.navigate(['/seccion',idx]);
  }

}
