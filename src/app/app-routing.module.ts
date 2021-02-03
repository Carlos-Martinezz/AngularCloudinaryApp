import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DetalleComponent } from './imagen/detalle/detalle.component';
import { ListaComponent } from './imagen/lista/lista.component';
import { MiListaComponent } from './imagen/mi-lista/mi-lista.component';
import { NuevaComponent } from './imagen/nueva/nueva.component';

const routes: Routes = [
	{ path: 'lista', component: ListaComponent, canActivate: [ LoginGuard ] },
	{ path: 'miLista', component: MiListaComponent, canActivate: [ LoginGuard ] },
	{ path: 'nueva', component: NuevaComponent, canActivate: [ LoginGuard ] },
	{ path: 'detalle', component: DetalleComponent, canActivate: [ LoginGuard ] },
	{ path: 'login', component: LoginComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: '', component: WelcomeComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

