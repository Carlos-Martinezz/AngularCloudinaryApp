import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario.model';

import jwt_decode from "jwt-decode";
import { Alerts } from '../utils/alert.utils';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private URL: string = 'http://localhost:8080/cloudinary/';
	public show: boolean = false;

	private token: string;
	private idUsuario: string; 

	constructor( private http: HttpClient,
				 private alerts: Alerts,
				 private router: Router ) { 
		this.show = false;
	}

	public validarSesion(): boolean {

		const token = localStorage.getItem( "cloudinaryToken" );
		const expiracion = new Date( Date.parse(localStorage.getItem( "cloudinaryExpiracionToken" )) );
		const fechaActual = new Date();

		if( token !== null && expiracion !== null ) {

			if( fechaActual >= expiracion ) {

				this.show = false;
				localStorage.removeItem( "cloudinaryToken" );
				localStorage.removeItem( "idApiToken" );
				localStorage.removeItem( "cloudinaryExpiracionToken" );

				return false;

			} else {
				this.show = true;
				return true;
			}

		} else {
			this.show = false;
			return false;
		}

	}

	public login(usuario: Usuario): void {

		const data = JSON.stringify( usuario );
		const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

		this.http.post<Usuario>(`${ this.URL }login`, data, { headers: headers } ).subscribe( 
			data => {
			
				let token = data.token;
				let tokenDecode = jwt_decode( data.token );

				const fechaExpiracion = new Date( 0 ); 
				fechaExpiracion.setUTCSeconds( tokenDecode['exp'] );

				localStorage.setItem("cloudinaryToken", token );
				localStorage.setItem("idApiToken", data.id.toString() );
				localStorage.setItem("cloudinaryExpiracionToken", fechaExpiracion.toString() );

				this.show = true;
				this.alerts.alerta("Hecho!", "Se inició la sesión.", 'success', 2000);
				this.router.navigate([ 'lista' ]); 
			},
			err => this.alerts.alerta("Error!", err.error.mensaje, 'error')
		);
	}

	public signin(usuario: Usuario): void {

		const data = JSON.stringify( usuario );
		const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

		this.http.post<Usuario>(`${ this.URL }signin`, data, { headers: headers } ).subscribe( 
			data => {
				this.alerts.alerta("Hecho!", `Se creó el usuario: ${ data.nombre }`, 'success');
				this.router.navigate([ 'login' ]); 
			},
			err => this.alerts.alerta("Error!", err.error.mensaje, 'error')
		);
	}

	public logout(): void {
		localStorage.removeItem( "cloudinaryToken" );
		localStorage.removeItem( "idApiToken" );
		localStorage.removeItem( "cloudinaryExpiracionToken" );
		this.alerts.alerta("Hecho!", "Se cerró la sesión.", 'success', 2000);
		this.router.navigate([ 'login' ]);
	}

	public getToken(): string {
		this.token = localStorage.getItem( "cloudinaryToken" );
		return this.token;
	}

	public getIdUsuario(): string {
		this.idUsuario = localStorage.getItem( "idApiToken" );
		return this.idUsuario;
	}

}
