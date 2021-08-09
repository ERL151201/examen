import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import {map} from 'rxjs/operators';
import { Resp } from '../models/resp.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Administrador } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private url = ' https://identitytoolkit.googleapis.com/v1/accounts:';
    private apikey= 'AIzaSyCuS7aHEwM3YbpnzZoNTy8638-dtwTyNyI';

    userToken:string = '';
    usuarioActivo:string = '';
    idUsuario:string = '';
    email:string = '';
    password:string = '';
    admin: Administrador = new Administrador;
    //Crear usuario nuevo
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, public router: Router) { 
    this.leerToken();
  }

  logout(){
    Swal.fire({
      icon: 'info',
      title: 'Saliendo...',
      text: 'Cerrando Sesión',
      showConfirmButton: false
    });
    localStorage.removeItem('token');
    window.location.reload();
  }

  login (usuario: UsuarioModel){
    const authData={
      ...usuario,
      returnSecureToken: true
    };  
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp) =>{
        const data = resp as Resp;
        //console.log('login: ', data);
        this.guardarToken(data.idToken);
        this.usuarioActivo = data.displayName;
        this.idUsuario = data.localId;
        this.email = data.email;
        this.password = authData.password;
        this.getUsuario();
        return data;
      })
    );
  }

  getUsuario(){
    const datosUser = {
      usuario: this.usuarioActivo,
      id_usuario: this.idUsuario
    }
    return datosUser;
    
  }

  nuevoUsusario( usuario: UsuarioModel ){
    const authData={
      displayName: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };  
    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp =>{        
        const data = resp as Resp;
        this.guardarToken(data.idToken);
        return resp;
      })
    );

  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if (localStorage.getItem('token')) {
      //this.userToken = JSON.parse(localStorage.getItem('email') || '{}');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado() : boolean{ 
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number (localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date() ) {
      return true;
    }else{
      return false;
    }
  }

  esAdmin() : boolean{
    const passwordAdmin = this.admin.password;
    //console.log(passwordAdmin);
    
    //const email = this.email
    //let emailAdmin = 'admin@gmail.com'
    if(passwordAdmin == this.password){
      return true;
    }
    return false;
  }

  
}