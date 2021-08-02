import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { SeccionComponent } from "./components/seccion/seccion.component";
import { BuscadorComponent } from "./components/buscador/buscador.component";
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth-guard.guard'

const APP_ROUTES: Routes = [
    {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
    {path:'about', component: AboutComponent, canActivate:[AuthGuard]},
    {path:'secciones', component: SeccionesComponent, canActivate:[AuthGuard]},
    {path:'seccion/:id', component: SeccionComponent, canActivate:[AuthGuard]},
    {path:'buscar/:termino', component: BuscadorComponent, canActivate:[AuthGuard]},
    {path:'login', component: LoginComponent},
    {path:'registro', component: RegistroComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ],
})

export class APP_ROUTING{}
//export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);