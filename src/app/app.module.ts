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
import { LocalStorageModule } from 'angular-2-local-storage-encrypt';
import { FullCalendarModule } from '@fullcalendar/angular';

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
import { CoLoginComponent } from './components/colaboradores/co-login/co-login.component';
import { CoRegistroComponent } from './components/colaboradores/co-registro/co-registro.component';
import { CoDatosComponent } from './components/colaboradores/co-registro/co-datos/co-datos.component';
import { CoExpLaboralComponent } from './components/colaboradores/co-registro/co-exp-laboral/co-exp-laboral.component';
import { CoExpLugaresComponent } from './components/colaboradores/co-registro/co-exp-lugares/co-exp-lugares.component';
import { CoExpLugaresDisplayComponent } from './components/colaboradores/co-registro/co-exp-lugares-display/co-exp-lugares-display.component';
import { ColaboradorGuardadoComponent } from './components/notificaciones/colaborador-guardado/colaborador-guardado.component';
import { CoPerfilComponent } from './components/colaboradores/co-perfil/co-perfil.component';
import { CoEventosComponent } from './components/colaboradores/co-eventos/co-eventos.component';
import { CoTusEventosComponent } from './components/colaboradores/co-tus-eventos/co-tus-eventos.component';
import { CoAddImagenComponent } from './components/colaboradores/co-add-imagen/co-add-imagen.component';
import { CoEventoComponent } from './components/colaboradores/co-eventos/co-evento/co-evento.component';
import { VerVacantesComponent } from './components/colaboradores/co-eventos/ver-vacantes/ver-vacantes.component';
import { PostularComponent } from './components/colaboradores/co-eventos/co-evento/postular/postular.component';
import { PostulacionExitosaComponent } from './components/notificaciones/postulacion-exitosa/postulacion-exitosa.component';
import { VerEquipoComponent } from './components/user/tus-eventos/ver-equipo/ver-equipo.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { VerColaboradorComponent } from './components/colaborador/ver-colaborador/ver-colaborador.component';
import { VerUsuarioComponent } from './components/user/ver-usuario/ver-usuario.component'

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
    CoLoginComponent,
    CoRegistroComponent,
    CoDatosComponent,
    CoExpLaboralComponent,
    CoExpLugaresComponent,
    CoExpLugaresDisplayComponent,
    ColaboradorGuardadoComponent,
    CoPerfilComponent,
    CoEventosComponent,
    CoTusEventosComponent,
    CoAddImagenComponent,
    CoEventoComponent,
    VerVacantesComponent,
    PostularComponent,
    PostulacionExitosaComponent,
    VerEquipoComponent,
    AlertasComponent,
    VerColaboradorComponent,
    VerUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    LocalStorageModule.forRoot({
            prefix: 'my-app',
            storageType: 'localStorage',
            encryptionActive: true,
            encryptionOptions: {
                encryptionKey: 'keyForEncriptHere',
                encryptionIv: 'iVHere',
                encryptionSalt: 'saltHere'
            }
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
