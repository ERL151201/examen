import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pregunta } from '../models/pregunta.interface';
import { Respuesta } from '../models/respuesta.interface';
import { Calificacion } from '../models/calificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private afs: AngularFirestore) {
    this.preguntasCollectionMate = this.afs.collection<Pregunta>('preguntas').doc('pensamientoMate').collection('preguntas');
    this.preguntasCollectionAnalit = this.afs.collection<Pregunta>('preguntas').doc('pensamientoAnalitico').collection('preguntas');
    this.preguntasCollectionLenguaje = this.afs.collection<Pregunta>('preguntas').doc('lenguaje').collection('preguntas');
    this.preguntasCollectionComprension = this.afs.collection<Pregunta>('preguntas').doc('comprensionLectura').collection('preguntas');
    
    this.respuestas = afs.collection('respuestas');

    this.preguntas = this.preguntasCollectionMate.valueChanges();
    this.preguntas = this.preguntasCollectionAnalit.valueChanges();
    this.preguntas = this.preguntasCollectionLenguaje.valueChanges();
    this.preguntas = this.preguntasCollectionComprension.valueChanges();
   }

  private preguntasCollectionMate: AngularFirestoreCollection<Pregunta>;
  private preguntasCollectionAnalit: AngularFirestoreCollection<Pregunta>;
  private preguntasCollectionLenguaje: AngularFirestoreCollection<Pregunta>;
  private preguntasCollectionComprension: AngularFirestoreCollection<Pregunta>;

  private respuestas: AngularFirestoreCollection;
  private preguntas: Observable<Pregunta[]>;
  
  public correctasExam: any = [];
  public respUser: any = [];

  public getPreguntasMate(){
    return this.preguntas = this.preguntasCollectionMate.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Pregunta;
          
          return data;
        });
      }));
  }

  public getPreguntasAnalitico(){
    return this.preguntas = this.preguntasCollectionAnalit.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Pregunta;
          return data;
        });
      }));
  }

  public getPreguntasLenguaje(){
    return this.preguntas = this.preguntasCollectionLenguaje.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Pregunta;
          return data;
        });
      }));
  }

  public getPreguntasComprension(){
    return this.preguntas = this.preguntasCollectionComprension.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Pregunta;
          return data;
        });
      }));
  }

  guardarRespuestas(id: any, data: Respuesta, exam:any, user:any){
    this.respuestas.doc(exam).collection(user).doc(`pregunta:${id}`).set({
      id_pregunta: data.id_pregunta,
      respuesta: data.correcta
    });
  }

  getCorrectas(exam:any){
    let respuestasCorrec:any = []
    return this.afs.collection('preguntas').doc(exam).collection('respuestas').get()
    .subscribe(doc=>{
      return doc.docs.map(doc=>{
        const data = doc.data()
        respuestasCorrec.push(data.correcta)
        this.correctasExam = respuestasCorrec;
      })
    })
  }

  calificaExamen(user: any, exam:any){
    let respuestasUser:any = []    
    this.getCorrectas(exam);
    console.log(this.correctasExam);
    this.afs.collection('respuestas').doc(exam).collection(user).get()
    .subscribe(doc=>{
      doc.docs.map(doc=>{
        const data = doc.data();
        respuestasUser.push(data.respuesta) 
        this.respUser = respuestasUser;
      })
    });
    let iguales=0;
    let total:number = this.correctasExam.length;
    let calificacion;
    for(var i=0;i<this.correctasExam.length; i++){
      for(var j=0;j<this.respUser.length;j++){
    		if(this.correctasExam[i]==this.respUser[j]){
    			iguales++;
        }
      }
    }
    let incorrectas = total-iguales;
    calificacion = iguales/total*10
    switch (exam) {
      case "pensamientoMate":
        let califSeccion1 = {
            seccionExamen: exam,
            respuestasIncorrectas: incorrectas,
            respuestasCorrectas: iguales,
            calificacionSeccion: calificacion
        }
        this.afs.collection('calificaciones').doc(user).set({
          alumno: user,
          seccion1: califSeccion1
        }, { merge: true })
        break;
      case "pensamientoAnalitico":
        let califSeccion2 = {
          seccionExamen: exam,
          respuestasIncorrectas: incorrectas,
          respuestasCorrectas: iguales,
          calificacionSeccion: calificacion
        }
        this.afs.collection('calificaciones').doc(user).set({
          alumno: user,
          seccion2: califSeccion2
        }, { merge: true })
        break;
      case "lenguaje":
        let califSeccion3 = {
          seccionExamen: exam,
          respuestasIncorrectas: incorrectas,
          respuestasCorrectas: iguales,
          calificacionSeccion: calificacion
        }
        this.afs.collection('calificaciones').doc(user).set({
          alumno: user,
          seccion3: califSeccion3
        }, { merge: true })
        break;
      case "comprensionLectura":
        let califSeccion4 = {
          seccionExamen: exam,
          respuestasIncorrectas: incorrectas,
          respuestasCorrectas: iguales,
          calificacionSeccion: calificacion
        }
        this.afs.collection('calificaciones').doc(user).set({
          alumno: user,
          seccion4: califSeccion4
        }, { merge: true })
        break;
      default:
        console.log('Algo salio mal :(');
        break;
    }
  }

  calificacionFinal(user: string, id_user:string){
    this.afs.collection('calificaciones').doc(user).get()
    .subscribe(doc => {
      let datos = doc.data() as Calificacion
      let calif1 = datos.seccion1.calificacionSeccion;
      let calif2 = datos.seccion2.calificacionSeccion;
      let calif3 = datos.seccion3.calificacionSeccion;
      let calif4 = datos.seccion4.calificacionSeccion;
      
      let calificacionFinal = (calif1+calif2+calif3+calif4)/4
      console.log(calificacionFinal);
      this.afs.collection('calificaciones').doc(user).set({
        calificacionFinal: calificacionFinal,
        id_usuario: id_user
      }, { merge: true })
    })
  }
}