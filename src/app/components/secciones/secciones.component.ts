import { Component, OnInit } from '@angular/core';
import { SeccionesService, Seccion } from '../../servicios/secciones.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
 
})
export class SeccionesComponent implements OnInit {

  secciones:Seccion[] = [];
  constructor(private _seccionesService: SeccionesService) {

  console.log("constructor");
  
   }

  ngOnInit() {
    
    this.secciones = this._seccionesService.getSecciones();

    console.log(this.secciones);
    
    
  }

}
