import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './imagen/detalle/detalle.component';
import { ListaComponent } from './imagen/lista/lista.component';
import { NuevaComponent } from './imagen/nueva/nueva.component';

const routes: Routes = [
	{ path: '', component: ListaComponent },
	{ path: 'nueva', component: NuevaComponent },
	{ path: 'detalle', component: DetalleComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
