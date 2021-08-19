import { Injectable } from '@angular/core';
import { ExamenService } from './examen.service';

@Injectable()
export class SeccionesService {

    //public id: number = 5;
    
    private secciones:Seccion[] = [
        {
          nombre: "Pensamiento Matematico",
          des: "Resolveras distintos problemas matematicos en base a tus conocimientos",
          img: "assets/img/mat.png",
          idx: 0,
        },
        {
            nombre: "Pensamiento Analítico",
            des: "Resolveras distintos problemas analiticos en base a tus conocimientos",
            img: "assets/img/analitico.png",
            idx: 1,
        },
        {
            nombre: "Estructura del lenguaje",
            des: "Escribiras la correcta escritura de las palabras, sus funciones y concordancia",
            img: "assets/img/lengua.jpg",
            idx: 2
        },
        {
            nombre: "Comprensión lectora",
            des: "Identificaras las ideas relevantes de un texto",
            img: "assets/img/lect.jpg",
            idx: 3
        },
    ];

    constructor(public eS:ExamenService) {
        console.log("Servicio listo para usar");
        
    }

    getSecciones():Seccion[]{
        return this.secciones;
    }

    getSeccion(idx:number){
        return this.secciones[idx];
    }

    buscarSecciones(termino:string){
        
        let seccionesArr:Seccion[]=[];
        termino = termino.toLocaleLowerCase();

        for(let i=0; i < this.secciones.length; i++){
                let seccion = this.secciones[i];
            let nombre = seccion.nombre.toLocaleLowerCase();
            if (nombre.indexOf(termino)  >= 0  ) {
                seccion.idx = i;
                seccionesArr.push(seccion)
            }
        }
        return seccionesArr;

    }

    /*terminoSeccion(){
        if (this.eS.termino == true) {
            switch (this.eS.seccion) {
                case 'pensamientoMate':
                    this.id = 0;
                break;
                case 'pensamientoAnalitico':
                    this.id = 1;
                break;
                case 'lenguaje':
                    this.id = 2;
                break;
                case 'comprensionLectura':
                    this.id = 3;
                break;
                default:
                    break;
            }
            return true
        }
        return false
    }*/
    
}

export interface Seccion{
    nombre:string;
    des:string;
    img:string;
    idx?: number;
}