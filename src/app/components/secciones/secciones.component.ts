import { Component, OnInit } from '@angular/core';
import { SeccionesService, Seccion } from '../../services/secciones.service';
import { Router } from '@angular/router';
import { ExamenService } from '../../services/examen.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
 
})
export class SeccionesComponent implements OnInit {

  secciones:Seccion[] = [];
  user:string = '';
  id_user:string = '';

  constructor(private _seccionesService: SeccionesService,
              private router:Router,  
              private eS: ExamenService,
              private auth: AuthService,
              private timer: TimerService
    ) {  }

  ngOnInit() {
    this.secciones = this._seccionesService.getSecciones();
    this.user = this.auth.getUsuario().usuario;
    this.id_user = this.auth.getUsuario().id_usuario;
  }

  verSeccion(idx:number){
      this.timer.pauseTimer();
      this.router.navigate(['/seccion',idx]);
      this.timer.startTimer();
  }

  terminar(){
    Swal.fire({
      position: 'center',
      showDenyButton: true,
      icon: 'info',
      title: '¿Estas Seguro?',
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Bien Hecho!',
          text: 'Sabemos lo mucho que te preparaste para este examen, no hace falta que te lo digamos pero te deseamos mucha suerte y espero que obtengas una excelente nota'
        });
        this.eS.calificacionFinal(this.user, this.id_user);
        this.router.navigate(['/home']);
      } else if (result.isDenied) {
        Swal.close()
      }
    })
    
  }

}
