import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SeccionesService } from "../../services/secciones.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
 
})
export class BuscadorComponent implements OnInit {

  secciones:any [] = []
  termino:string [] = [];

  constructor(private activatedRoute:ActivatedRoute,
              private _seccionesService:SeccionesService,
              private router:Router ) {  

   }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params =>{
       this.termino = (params['termino']);
      this.secciones = this._seccionesService.buscarSecciones(params['termino']);
      console.log(this.secciones);
    });

    
  
  }

  verSeccion(idx:number){
    this.router.navigate(['/seccion',idx]);
  
}

}
