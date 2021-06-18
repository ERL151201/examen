import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { SeccionComponent } from "./components/seccion/seccion.component";

const APP_ROUTES: Routes = [
    {path:'home', component: HomeComponent},
    {path:'about', component: AboutComponent},
    {path:'secciones', component: SeccionesComponent},
    {path:'seccion/:id', component: SeccionComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);