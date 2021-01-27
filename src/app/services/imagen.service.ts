import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen';

@Injectable({
	providedIn: 'root'
})
export class ImagenService {

	private URL: string = 'http://localhost:8080/cloudinary/';

	constructor( private http: HttpClient ) { 

	}

	public list(): Observable<Imagen[]> {
		return this.http.get<Imagen[]>(`${ this.URL }list`);
	}

	public upload( imagen: File ): Observable<any> {
		
		const formData = new FormData();
		formData.append('multipartFile', imagen);
		
		return this.http.post<any>(`${ this.URL }upload`, formData);
	}

	public delete( id: number ): Observable<any> {
		return this.http.delete<any>(`${ this.URL }delete/${ id }`);
	}

}
