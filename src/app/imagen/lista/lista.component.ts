import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { ImagenService } from 'src/app/services/imagen.service';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	public imagenes: Imagen[] = [];

	constructor( private imagenService: ImagenService,
				 private spinner: NgxSpinnerService,
				 private modalService: NgbModal ) { }

	ngOnInit(): void {
		this.cargarImagenes();
	}

	cargarImagenes() {
		this.imagenService.list().subscribe(
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
