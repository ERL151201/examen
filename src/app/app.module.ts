import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from '../environments/environment';

//Rutas
import { APP_ROUTING } from "./app.routes";

//Servicios
import { SeccionesService } from './services/secciones.service';
import { ExamenService } from './services/examen.service';

// Componentes 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { SeccionTarjetaComponent } from './components/seccion-tarjeta/seccion-tarjeta.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SeccionesComponent,
    SeccionComponent,
    BuscadorComponent,
    SeccionTarjetaComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    
  ],
  providers: [
    SeccionesService,
    ExamenService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
