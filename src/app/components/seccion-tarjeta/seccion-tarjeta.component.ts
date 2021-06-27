import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seccion-tarjeta',
  templateUrl: './seccion-tarjeta.component.html',
  styleUrls: ['./seccion-tarjeta.component.css']
})
export class SeccionTarjetaComponent implements OnInit {
  
  @Input() seccion: any={};
  @Input()index!: number;
  i: any={};


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verSeccion(){
  console.log(this.index);
  this.router.navigate(['/seccion',this.index]);
  }

}
