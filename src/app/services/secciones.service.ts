import { Injectable } from '@angular/core';
import { ExamenService } from './examen.service';

@Injectable()
export class SeccionesService {

    //public id: number = 5;
    
    private secciones:Seccion[] = [
        {
          nombre: "Ciencias Básicas Aplicadas",
          des: "Utilizaras el conocimiento científico de una o varias ramas de la ciencia para resolver problemas prácticos.",
          img: "assets/img/ciencias-aplicadas.png",
          idx: 0,
        },
        {
            nombre: "Formación Tecnológica",
            des: "Pondras a prueba tus competencias de apropiación y aplicación de conocimientos tendientes a la transformación, innovación, implementación y operación de objetos tecnológicos",
            img: "assets/img/formacion.jpg",
            idx: 1,
        },
        {
            nombre: "Lenguas y Métodos",
            des: "Deberas reconocer y diferenciar los métodos de la lengua",
            img: "assets/img/lenguamet.jpg",
            idx: 2
        },
        {
            nombre: "Habilidades Gerenciales",
            des: "Identificaras las habilidades que un individuo posee para llevar a cabo tareas de liderazgo en una empresa de manera eficaz.",
            img: "assets/img/habilidades-gerenciales.png",
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
    
}

export interface Seccion{
    nombre:string;
    des:string;
    img:string;
    idx?: number;
}