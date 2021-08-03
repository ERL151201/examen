import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AdminGuard } from '../../guards/admin.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private auth:AuthService,
              private router: Router,
              private admin: AdminGuard) { }
  
  usuario: UsuarioModel = {
    email: '',
    nombre: '',
    password: ''
  }
  recordarme = false;


  ngOnInit() {

    /*if (localStorage.getItem('email')) {
        this.usuario.email = JSON.parse(localStorage.getItem('email') || '{}');
        this.recordarme = true;
    }*/

  }

  login(form: NgForm){
    if( form.invalid){return;}
    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      text: 'Espere por favor...'
    });
  Swal.showLoading();
    this.auth.login(this.usuario)
    .subscribe( resp =>{
      console.log(resp);
      Swal.close();
    /*if (this.recordarme) {
      localStorage.setItem('email', this.usuario.email);
    }*/
      if(this.auth.esAdmin()){
        this.router.navigateByUrl('/admin/capturarpreguntas');
        
      }else{
        this.router.navigateByUrl('/home');
        
      }
    }, (err) =>{        
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
    
  }

}
