import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timeLeft: number = 600;
  interval: any;
  interval2: any;
  horas: any;
  minutos: any;
  segundos: any;

  constructor(public router: Router) {  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        
        //this.segundos = (Math.round(this.timeLeft % 0x3C)).toString();
        this.horas    = (Math.floor(this.timeLeft / 0xE10)).toString();
        this.minutos  = (Math.floor(this.timeLeft / 0x3C ) % 0x3C).toString();
        
      } else {
        this.router.navigate(['/home']);
        this.pauseTimer()
      }
    },1000);
    this.interval2 = setInterval(()=>{
        Swal.fire({
          text: 'Tiempo Restante: '+this.horas+'h:'+this.minutos+'m',
          toast: true,
          position: 'bottom-end',
          width: 250,
          showConfirmButton: false,
        })
      }, 10000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    clearInterval(this.interval2)
  }

}
