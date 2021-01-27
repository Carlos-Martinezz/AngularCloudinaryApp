import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from 'src/app/services/imagen.service';
import { ElementRef } from '@angular/core';

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
				 private router: Router,
				 private spinner: NgxSpinnerService ) { 

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

		this.imagenService.upload( this.imagen ).subscribe( 
			data => {
				this.spinner.hide();
				alert( data.mensaje );
				this.reset();
			},
			err => {
				this.spinner.hide();
				alert( err.error.mensaje || "Ha ocurrido un error" );
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
