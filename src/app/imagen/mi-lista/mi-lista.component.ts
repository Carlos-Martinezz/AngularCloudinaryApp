import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen.model';
import { ImagenService } from 'src/app/services/imagen.service';
import { LoginService } from 'src/app/services/login.service';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
	selector: 'app-mi-lista',
	templateUrl: './mi-lista.component.html',
	styleUrls: ['./mi-lista.component.css']
})
export class MiListaComponent implements OnInit {

	public imagenes: Imagen[] = [];

	constructor( private imagenService: ImagenService,
				 private spinner: NgxSpinnerService,
				 private modalService: NgbModal,
				 private loginService: LoginService ) { 
				
	}

	ngOnInit(): void {
		this.cargarImagenes();
	}

	cargarImagenes() {
		this.imagenService.miList( this.loginService.getIdUsuario() ).subscribe(
			data => {
				this.imagenes = data;
			}
		);
	}

	borrar( id: number ): void {
		this.spinner.show();
		this.imagenService.delete( id ).subscribe(
			data => {
				this.spinner.hide();
				this.cargarImagenes();
			}, 
			err => {
				this.spinner.hide();
				console.log( err );
			}
		)
	}

	abrirModal( i: number ): void {
		const modalRef = this.modalService.open( DetalleComponent );
		modalRef.componentInstance.index = i;
	}

}
