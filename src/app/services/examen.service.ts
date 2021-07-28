import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pregunta } from '../models/pregunta.interface';
import { Respuesta } from '../models/respuesta.interface';

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
      },
      console.log(this.correctasExam)
      )
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
      },
      console.log(this.respUser)
      )
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
    //console.log(total);
    let incorrectas = total-iguales;
    calificacion = iguales/total*10
    this.afs.collection('calificaciones').doc(exam).collection(user).doc('datos').set({
      respuestasincorrectas: incorrectas,
      respuestasCorrectas: iguales,
      calificacionSeccion: calificacion
    })
  }
}