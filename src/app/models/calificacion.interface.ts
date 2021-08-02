export interface Calificacion{
    alummo: string,
    seccion1: {
        calificacionSeccion: number
        respuestasCorrectas: number
        respuestasIncorrectas: number
        seccionExamen: string
    },
    seccion2: {
        calificacionSeccion: number
        respuestasCorrectas: number
        respuestasIncorrectas: number
        seccionExamen: string
    },
    seccion3: {
        calificacionSeccion: number
        respuestasCorrectas: number
        respuestasIncorrectas: number
        seccionExamen: string
    },
    seccion4: {
        calificacionSeccion: number
        respuestasCorrectas: number
        respuestasIncorrectas: number
        seccionExamen: string
    }
}