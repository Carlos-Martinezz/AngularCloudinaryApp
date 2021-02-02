import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen.model';
import { Alerts } from '../utils/alert.utils';


@Injectable({
	providedIn: 'root'
})
export class ImagenService {

	private URL: string = 'http://localhost:8080/cloudinary/';

	constructor( private http: HttpClient,
				 private alerts: Alerts ) { 

	}

	public list(): Observable<Imagen[]> {
		return this.http.get<Imagen[]>(`${ this.URL }list`);
	}

	public miList( idUsuario: string ): Observable<Imagen[]> {
		return this.http.get<Imagen[]>(`${ this.URL }myList/${ idUsuario }`);
	}

	public upload( imagen: File, idUsuario: string ): Observable<any> {
		
		const formData = new FormData();
		formData.append('multipartFile', imagen);
		formData.append('idUsuario', idUsuario);
		
		return this.http.post<any>(`${ this.URL }upload`, formData);
	}

	public delete( id: number ): Observable<any> {
		return this.http.delete<any>(`${ this.URL }delete/${ id }`);
	}

}
