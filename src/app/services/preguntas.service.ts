import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Calificacion } from "../models/calificacion.interface";
import { FileI } from "../models/file.interface";
import { Pregunta } from "../models/pregunta.interface";

@Injectable()
export class PreguntasService {
  //public userData$: Observable<firebase.default.User>;

  private preguntas: AngularFirestoreCollection<Pregunta>;
  private filePath: any;
  private downloadURL: Observable<string> | undefined;
  private noImage: any;
  private respuestas: Observable<Calificacion[]>;
  private respuestasCollection: AngularFirestoreCollection<Calificacion>;

  constructor(public afAuth: AngularFireAuth, public firestor: FirebaseApp, private afs: AngularFirestore, private storage: AngularFireStorage) { 
    this.preguntas = afs.collection<Pregunta>('preguntas');
    this.respuestasCollection = this.afs.collection<Calificacion>('calificaciones');

    this.respuestas = this.respuestasCollection.valueChanges();
    //this.userData$ = afAuth.authState;
  }
  
  public preAddAndUpdatePregunta(pregunta: Pregunta, image: FileI): void {
    if(image){
      this.subirImagen(pregunta, image);
    }
    else{
      this.noImage = '';
      this.downloadURL = this.noImage;
      this.guardarPregunta(pregunta);
    }
  }

  guardarPregunta(newPregunta: Pregunta){
    const nuevaPregunta={
      id_examen: newPregunta.id_examen,
      id_pregunta: newPregunta.id_pregunta,
      pregunta_txt: newPregunta.pregunta_txt,
      pregunta_url: this.downloadURL,
      respuesta1: newPregunta.respuesta1,
      respuesta2: newPregunta.respuesta2,
      respuesta3: newPregunta.respuesta3,
      respuesta4: newPregunta.respuesta4,
      correcta: newPregunta.correcta,
    };

    var descExam = '';
    var descCorrec = '';
    switch(newPregunta.id_examen){
        case "1":
            descExam = 'pensamientoMate';
            descCorrec = 'correctasMate';
            break;
        case "2":
            descExam = 'pensamientoAnalitico';
            descCorrec = 'correctasAnalitico';
            break;
        case "3":
            descExam = 'lenguaje';
            descCorrec = 'correctasLenguaje';
            break;
        case "4":
            descExam = 'comprensionLectura';
            descCorrec = 'correctasLectura';
            break;
        default:
            descExam = '';
            descCorrec = '';
            break;
    }

    try {
      //this.preguntas.add(nuevaPregunta);
      this.preguntas.doc(descExam).collection('preguntas').doc(`pregunta:${newPregunta.id_pregunta}`).set(nuevaPregunta);
      this.preguntas.doc(descExam).collection('respuestas').doc(`pregunta:${newPregunta.id_pregunta}`).set({
        id_pregunta: newPregunta.id_pregunta,
        correcta: newPregunta.correcta,
      });
      this.preguntaGuardada();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  }

  subirImagen(pregunta: Pregunta, image: FileI) {
    this.filePath = `imagenes/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.guardarPregunta(pregunta);
          });
        })
      ).subscribe();
  }

  preguntaGuardada(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pregunta Guardada',
      showConfirmButton: false,
      timer: 1500
    })  
  }

  obtenerResultados(){
    return this.respuestas = this.respuestasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Calificacion;
          return data;
        });
      }));
  }
}