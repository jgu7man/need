import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "../environments/environment";

import { CompareValidatorDirective } from './directives/validator.directive';
import { PwdToggleDirective } from './directives/pwd-toggle.directive';

import { AppComponent } from './app.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { HeroformComponent } from './components/inicio/heroform/heroform.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/navbar/main-menu/main-menu.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/inicio/login-user/login-user.component';
import { LoadingComponent } from './components/inicio/loading/loading.component';
import { CrearEventoComponent } from './components/inicio/crear-evento/crear-evento.component';
import { NuevoEventoComponent } from './components/user/nuevo-evento/nuevo-evento.component';

import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';

import { TusEventosComponent } from './components/user/tus-eventos/tus-eventos.component';
import { UsuarioComponent } from './components/user/user.component';
import { EventoComponent } from './components/user/tus-eventos/evento/evento.component';
import { DatosComponent } from "./components/user/tus-eventos/datos/datos.component";
import { DetallesComponent } from './components/user/tus-eventos/detalles/detalles.component';
import { PersonalComponent } from './components/user/tus-eventos/personal/personal.component';

import { PerfilComponent } from './components/user/perfil/perfil.component';

import { DirectorioComponent } from './components/directorio/directorio.component';
import { CategoriasComponent } from './components/directorio/all-catego/categorias.component';
import { NegBienvenidaComponent } from './components/directorio/neg-bienvenida/neg-bienvenida.component';
import { CategoriaComponent } from './components/directorio/categoria/categoria.component';
import { SuscribirComponent } from './components/directorio/suscribir/suscribir.component';
import { PagarPlanComponent } from './components/directorio/pagar-plan/pagar-plan.component';
import { ListaPlanesComponent } from './components/directorio/lista-planes/lista-planes.component';
import { FormNegocioComponent } from './components/negocio/form-negocio/form-negocio.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';

  import { NegocioComponent } from './components/negocio/negocio.component';
import { ConocenosComponent } from './components/externos/conocenos/conocenos.component';
import { PreciosComponent } from './components/externos/precios/precios.component';
import { TycComponent } from './components/externos/tyc/tyc.component';
import { PdpComponent } from './components/externos/pdp/pdp.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';

@NgModule({
  declarations: [
    CompareValidatorDirective,
    PwdToggleDirective,
    AppComponent,
    InicioComponent,
    HeroformComponent,
    NavbarComponent,
    FooterComponent,
    MainMenuComponent,
    CotizacionComponent,
    LoginUserComponent,
    LoadingComponent,
    CrearEventoComponent,
    EventoCreadoComponent,
    UsuarioComponent,
    TusEventosComponent,
    EventoComponent,
    DatosComponent,
    DetallesComponent,
    PersonalComponent,
    PerfilComponent,
    NuevoEventoComponent,
    DirectorioComponent,
    CategoriasComponent,
    NegBienvenidaComponent,
    CategoriaComponent,
    SuscribirComponent,
    PagarPlanComponent,
    ListaPlanesComponent,
    FormNegocioComponent,
    PagoFormComponent,
    NegocioComponent,
    NegocioComponent,
    ConocenosComponent,
    PreciosComponent,
    TycComponent,
    PdpComponent,
    ColaboradoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
