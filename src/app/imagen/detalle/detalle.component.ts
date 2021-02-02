import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Imagen } from 'src/app/models/imagen.model';
import { ImagenService } from 'src/app/services/imagen.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

	@Input() index: number;
	@Input() miLista: boolean;
	public imagenes: Imagen[];
	
	public config: SwiperConfigInterface = {
		direction: 'horizontal',
		slidesPerView: 1,
		keyboard: true,
		mousewheel: true,
		scrollbar: true,
		navigation: true,
		pagination: false
	};

	constructor( public activeModal: NgbActiveModal,
				 private imagenService: ImagenService,
				 private loginService: LoginService ) { 

	}

	ngOnInit(): void {
		
		this.config.initialSlide = this.index;

		if( this.miLista ) {
			this.imagenService.list().subscribe(
				data => this.imagenes = data,
				err => console.log( err )
			)
		} else {
			this.imagenService.miList( this.loginService.getIdUsuario() ).subscribe(
				data => this.imagenes = data,
				err => console.log( err )
			)
		}

		

	}

}
