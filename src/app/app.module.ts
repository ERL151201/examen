import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Rutas
import { APP_ROUTING } from "./app.routes";

//Servicios
import { SeccionesService } from './servicios/secciones.service';

// Componentes 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { FormsModule } from '@angular/forms';
import { SeccionComponent } from './components/seccion/seccion.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { SeccionTarjetaComponent } from './components/seccion-tarjeta/seccion-tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SeccionesComponent,
    SeccionComponent,
    BuscadorComponent,
    SeccionTarjetaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
    SeccionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
