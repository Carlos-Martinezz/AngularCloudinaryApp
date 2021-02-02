import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/services/imagen.service';
import { ElementRef } from '@angular/core';
import { Alerts } from 'src/app/utils/alert.utils';

@Component({
	selector: 'app-nueva',
	templateUrl: './nueva.component.html',
	styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

	@ViewChild('imagenInputFile', { static: false }) imagenFile: ElementRef;
	public imagen: File;
	public imagenMin: File;

	constructor( private imagenService: ImagenService,
				 private spinner: NgxSpinnerService,
				 private alerts: Alerts ) { 

	}

	ngOnInit(): void {
		
	}

	onFileChange( event ) {

		this.imagen = event.target.files[0];
		const fr = new FileReader();

		fr.onload = ( evento: any ) => {
			this.imagenMin = evento.target.result;
		};

		fr.readAsDataURL( this.imagen );

	}

	onUpload(): void {

		this.spinner.show();

		const idUsuario: string = localStorage.getItem("idApiToken");

		this.imagenService.upload( this.imagen, idUsuario ).subscribe( 
			data => {
				this.spinner.hide();
				this.alerts.alerta("Hecho!", "Se subió la imagen.", 'success', 1000);
				this.reset();
			},
			err => {
				this.spinner.hide();
				this.alerts.alerta("Error!", "No se subió la imagen.", 'error');
				this.reset();
			}
		);

	}

	reset(): void {
		this.imagen = null;
		this.imagenMin = null;
		this.imagenFile.nativeElement.value = '';
	}

}
