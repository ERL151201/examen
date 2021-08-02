import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SeccionesService } from "../../services/secciones.service";
import { ExamenService } from 'src/app/services/examen.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Respuesta } from '../../models/respuesta.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent {

  seccion:any={};
  preguntas:any=[];
  p:number=1;
  exam:string = '';
  user:string = ''
  @ViewChild('id_pregunta') id_pregunta: any;

  constructor( private activatedRoute: ActivatedRoute,
                private _seccionesService: SeccionesService,
                public eS: ExamenService,
                private router:Router,
                public auth: AuthService     
    ) {
      this.enviarRespuestas = this.createFormGroup();
    }
  ngOnInit(){
    this.user = this.auth.getUsuario().usuario;
    var id = this.activatedRoute.snapshot.params.id;
    switch (id) {
      case "0":
          this.eS.getPreguntasMate().subscribe(preguntas => {
            this.preguntas = preguntas;
            this.exam = 'pensamientoMate'
          });
        break;
      case "1":
          this.eS.getPreguntasAnalitico().subscribe(preguntas => {
            this.preguntas = preguntas;
            this.exam = 'pensamientoAnalitico'
          });
        break;
      case "2":
          this.eS.getPreguntasLenguaje().subscribe(preguntas => {
            this.preguntas = preguntas;
            this.exam = 'lenguaje'
          });
        break;
      case "3":
          this.eS.getPreguntasComprension().subscribe(preguntas => {
            this.preguntas = preguntas;
            this.exam = 'comprensionLectura'
          });
        break;
      default:
        console.log('Algo salio mal :(');
        this.exam = ''
        break;
    }
    this.activatedRoute.params.subscribe(params =>{
      this.seccion = this._seccionesService.getSeccion(params['id']);
    });
  } 

  createFormGroup(){
    return new FormGroup({
      correcta: new FormControl(''),
    });
  }
  enviarRespuestas: FormGroup;

  enviarPregunta(data: Respuesta){
    Swal.showLoading();
    let id = this.id_pregunta.nativeElement.defaultValue;
    data.id_pregunta = id;
    this.eS.guardarRespuestas(id, data, this.exam, this.user);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Respuesta Guardada',
      showConfirmButton: false,
      timer: 1500
    })
    this.enviarRespuestas.reset();
  }

  calif(){
    this.eS.calificaExamen(this.user, this.exam);
    Swal.fire({
      position: 'center',
      showDenyButton: true,
      icon: 'info',
      title: '¿Estas Seguro?',
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.eS.calificaExamen(this.user, this.exam);
        this.router.navigate(['/secciones']);
      } else if (result.isDenied) {
        Swal.close()
      }
    })
  }
}
