import { Injectable } from '@angular/core';

@Injectable()
export class SeccionesService {
    
    private secciones:Seccion[] = [
        {
          nombre: "Pensamiento Matematico",
          des: "Resolveras distintos problemas matematicos en base a tus conocimientos",
          img: "assets/img/mat.png"
        },
        {
            nombre: "Pensamiento Analítico",
            des: "Resolveras distintos problemas analiticos en base a tus conocimientos",
            img: "assets/img/analitico.png"
        },
        {
            nombre: "Estructura del lenguaje",
            des: "Escribiras la correcta escritura de las palabras, sus funciones y concordancia",
            img: "assets/img/lengua.jpg"
        },
        {
            nombre: "Comprensión lectora",
            des: "Identificaras las ideas relevantes de un texto",
            img: "assets/img/lect.jpg"
        },
    ];

    constructor() {
        console.log("Servicio listo para usar");
        
    }

    getSecciones(){
        return this.secciones;
    }
    
}

export interface Seccion{
    nombre:string;
    des:string;
    img:string;
}