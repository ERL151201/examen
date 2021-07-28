export interface Pregunta{
    id_examen: string;
    id_pregunta: string;
    pregunta_txt: string;
    pregunta_url?: any;
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
    respuesta4: string;
    correcta: string;
}