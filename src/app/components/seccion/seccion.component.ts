import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SeccionesService } from "../../servicios/secciones.service";
@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  
})
export class SeccionComponent {

  seccion:any={};

  constructor( private activatedRoute: ActivatedRoute,
                private _seccionesService: SeccionesService            
    ) {

    
    this.activatedRoute.params.subscribe(params =>{
      this.seccion = this._seccionesService.getSeccion(params['id']);
    })

   }
  
 

}
