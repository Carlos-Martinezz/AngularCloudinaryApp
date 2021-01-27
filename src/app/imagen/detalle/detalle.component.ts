import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Imagen } from 'src/app/models/imagen';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

	@Input() index: number;
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
				 private imagenService: ImagenService ) { 

	}

	ngOnInit(): void {
		
		this.config.initialSlide = this.index;

		this.imagenService.list().subscribe(
			data => this.imagenes = data,
			err => console.log( err )
		)

	}

}
