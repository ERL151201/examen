import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  resultados:any = []; 

  constructor(public preS: PreguntasService, private router: Router) { }

  ngOnInit(): void {
    this.preS.obtenerResultados().subscribe(preguntas => {
      this.resultados = preguntas
    });  
  }

  registropreg(){
    this.router.navigate(['/admin/capturarpreguntas']);
  }

}
