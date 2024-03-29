import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder,
		private loginService: LoginService,
		private router: Router) {

		/* Validamos que no haya un sesión iniciada */
		if (this.loginService.validarSesion()) {
			this.router.navigate(['lista']);
			this.loginService.show = true;
		}

	}

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {

		this.formGroup = this.formBuilder.group({
			usuario: ["", Validators.required],
			contrasena: ["", Validators.required]
		});

	}

	public enviar() {

		const usuario: string = this.formGroup.value.usuario;
		const contrasena: string = this.formGroup.value.contrasena;

		if (usuario === '' || contrasena === '') {
			return;
		}

		const enviarUsuario: Usuario = {
			id: 2,
			nombre: usuario,
			contrasena: contrasena,
			token: "d"
		}

		this.loginService.login( enviarUsuario );

	}

}
