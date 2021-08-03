import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private auth:AuthService, private router: Router ){}
  canActivate(): boolean {
    if(this.auth.esAdmin()) {
      return true;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Necesita cuenta de administrador'
      });
      this.router.navigateByUrl('/login');
      return false;
    }        
  } 
  
}
