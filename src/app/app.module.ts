import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './imagen/lista/lista.component';
import { NuevaComponent } from './imagen/nueva/nueva.component';
import { DetalleComponent } from './imagen/detalle/detalle.component';

/* NGBootstrap and External Components*/
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './auth/login.guard';
import { AuthorizationInterceptor } from './auth/authorization.interceptor';
import { SigninComponent } from './auth/signin/signin.component';
import { MiListaComponent } from './imagen/mi-lista/mi-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    NuevaComponent,
    DetalleComponent,
    LoginComponent,
    SigninComponent,
    MiListaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModalModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  entryComponents: [ DetalleComponent ],
  providers: [
    LoginGuard,
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthorizationInterceptor,
			multi: true
		},
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
