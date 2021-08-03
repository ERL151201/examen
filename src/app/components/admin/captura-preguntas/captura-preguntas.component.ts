import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/pregunta.interface';
import { PreguntasService } from 'src/app/services/preguntas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captura-preguntas',
  templateUrl: './captura-preguntas.component.html',
  styleUrls: ['./captura-preguntas.component.css']
})
export class CapturaPreguntasComponent implements OnInit {

  createFormGroup(){
    return new FormGroup({
        id_examen: new FormControl('', Validators.required),
        id_pregunta: new FormControl('', Validators.required),
        pregunta_txt: new FormControl('', Validators.required),
        pregunta_url: new FormControl(''),
        respuesta1: new FormControl('', Validators.required),
        respuesta2: new FormControl('', Validators.required),
        respuesta3: new FormControl(''),
        respuesta4: new FormControl(''),
        correcta: new FormControl('', Validators.required),
      });
  }

  crearPregunta: FormGroup;
  private image: any;

  constructor(private auS: PreguntasService, private router: Router) {
    this.crearPregunta = this.createFormGroup(); 
  }
  
  ngOnInit(): void {
  }
    
  enviarPregunta(data: Pregunta){
    this.auS.preAddAndUpdatePregunta(data, this.image);  
  }

  limpiar(){
    Swal.showLoading();
    this.crearPregunta.reset();
    this.image = '';
    Swal.close();
  }

  subirImage(e: any): void{
    this.image = e.target.files[0];
  }

  resultados(){
    this.router.navigate(['/admin/resultados']);
  }

  get id_examen(){return this.crearPregunta.get('id_examen')}
  get id_pregunta(){return this.crearPregunta.get('id_pregunta')}
  get pregunta_txt(){return this.crearPregunta.get('pregunta_txt')}
  get respuesta1(){return this.crearPregunta.get('respuesta1')}
  get respuesta2(){return this.crearPregunta.get('respuesta2')}
  get respuesta3(){return this.crearPregunta.get('respuesta3')}
  get respuesta4(){return this.crearPregunta.get('respuesta4')}
  get correcta(){return this.crearPregunta.get('correcta')}

}
