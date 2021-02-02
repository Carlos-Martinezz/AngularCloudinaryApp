import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Alerts } from '../utils/alert.utils';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor( private loginService: LoginService,
		private router: Router,
		private alerts: Alerts ) {

	}

	canActivate() {

		const token = localStorage.getItem("cloudinaryToken");
		const expiracion = new Date(Date.parse(localStorage.getItem("cloudinaryExpiracionToken")));
		const fechaActual = new Date();

		if (token !== null && expiracion !== null) {

			if (fechaActual >= expiracion) {

				this.alerts.alerta("Error!", "La sesión expiró. Por favor, inicia sesión de nuevo.", 'error');

				localStorage.removeItem("cloudinaryToken");
				localStorage.removeItem( "idApiToken" );
				localStorage.removeItem("cloudinaryExpiracionToken");

				this.loginService.show = false;
				this.router.navigate(['login']);

				return false;
			} else {
				this.loginService.show = true;
				return true;
			}

		} else {

			this.alerts.alerta("Error!", "Debes iniciar sesión.", 'error');

			this.loginService.show = false;
			this.router.navigate(['login']);

			return false;
		}

	}

}
