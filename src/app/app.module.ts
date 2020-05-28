import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { PagoModule } from "./pagos/pago.module";


import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { environment } from "../environments/environment";
import { AgmCoreModule } from "@agm/core";

import { CompareValidatorDirective } from './directives/validator.directive';
import { PwdToggleDirective } from './directives/pwd-toggle.directive';
import { LocalStorageModule } from 'angular-2-local-storage-encrypt';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';

import { InicioComponent } from './components/public/inicio/inicio.component';
import { HeroformComponent } from './components/public/inicio/heroform/heroform.component';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { MainMenuComponent } from './components/public/navbar/main-menu/main-menu.component';
import { CotizacionComponent } from './components/public/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent, AlertLoginComponent } from './components/public/inicio/login-user/login-user.component';
import { LoadingComponent } from './components/public/inicio/loading/loading.component';
import { LoadingInsetComponent } from './components/public/inicio/loading-inset/loading-inset.component';
import { CrearEventoComponent } from './components/public/inicio/crear-evento/crear-evento.component';
import { NuevoEventoComponent } from './components/public/user/nuevo-evento/nuevo-evento.component';

import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';

import { TusEventosComponent } from './components/public/user/tus-eventos/tus-eventos.component';
import { UsuarioComponent } from './components/public/user/user.component';
import { EventoComponent } from './components/public/user/tus-eventos/evento/evento.component';
import { DatosComponent } from "./components/public/user/tus-eventos/datos/datos.component";
import { DetallesComponent } from './components/public/user/tus-eventos/detalles/detalles.component';
import { PersonalComponent } from './components/public/user/tus-eventos/personal/personal.component';

import { PerfilComponent } from './components/public/user/perfil/perfil.component';

import { DirectorioComponent } from './components/public/directorio/directorio.component';
import { CategoriasComponent } from './components/public/directorio/all-catego/categorias.component';
import { NegBienvenidaComponent } from './components/public/directorio/neg-bienvenida/neg-bienvenida.component';
import { CategoriaComponent } from './components/public/directorio/categoria/categoria.component';
import { SuscribirComponent } from './components/public/directorio/suscribir/suscribir.component';
import { PagarPlanComponent } from './components/pasarela/pagar-plan/pagar-plan.component';
import { ListaPlanesComponent } from './components/public/directorio/lista-planes/lista-planes.component';
import { FormNegocioComponent } from './components/public/negocio/form-negocio/form-negocio.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';

import { NegocioComponent } from './components/public/negocio/negocio.component';
import { ConocenosComponent } from './components/public/docs/conocenos/conocenos.component';
import { PreciosComponent } from './components/public/docs/precios/precios.component';
import { TycComponent } from './components/public/docs/tyc/tyc.component';
import { PdpComponent } from './components/public/docs/pdp/pdp.component';
import { DocPanelComponent } from './components/public/docs/doc-panel/doc-panel.component';
import { DocsMenuComponent } from './components/public/docs/docs-menu/docs-menu.component';
import { AyudaComponent } from './components/public/docs/ayuda/ayuda.component';
import { WhatsappFormComponent } from './components/public/docs/ayuda/whatsapp-form/whatsapp-form.component';

import { ColaboradoresComponent } from './components/public/colaboradores/colaboradores.component';
import { CoLoginComponent, SolicitudDialog, InactivoDialog } from './components/public/colaboradores/co-login/co-login.component';
import { CoRegistroComponent, CotycDialogComponent } from './components/public/colaboradores/co-registro/co-registro.component';
import { CoDatosComponent } from './components/public/colaboradores/co-registro/co-datos/co-datos.component';
import { CoExpLaboralComponent } from './components/public/colaboradores/co-registro/co-exp-laboral/co-exp-laboral.component';
import { CoExpLugaresComponent } from './components/public/colaboradores/co-registro/co-exp-lugares/co-exp-lugares.component';
import { CoExpLugaresDisplayComponent } from './components/public/colaboradores/co-registro/co-exp-lugares-display/co-exp-lugares-display.component';
import { ColaboradorGuardadoComponent } from './components/notificaciones/colaborador-guardado/colaborador-guardado.component';
import { CoPerfilComponent } from './components/public/colaboradores/co-perfil/co-perfil.component';
import { CoEventosComponent } from './components/public/colaboradores/co-eventos/co-eventos.component';
import { CoTusEventosComponent } from './components/public/colaboradores/co-tus-eventos/co-tus-eventos.component';
import { CoAddImagenComponent } from './components/public/colaboradores/co-add-imagen/co-add-imagen.component';
import { CoEventoComponent } from './components/public/colaboradores/co-eventos/co-evento/co-evento.component';
import { VerVacantesComponent } from './components/public/colaboradores/co-eventos/ver-vacantes/ver-vacantes.component';
import { PostularComponent } from './components/public/colaboradores/co-eventos/co-evento/postular/postular.component';
import { PostulacionExitosaComponent } from './components/notificaciones/postulacion-exitosa/postulacion-exitosa.component';
import { VerEquipoComponent } from './components/public/user/tus-eventos/ver-equipo/ver-equipo.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { VerColaboradorComponent } from './components/public/colaboradores/ver-colaborador/ver-colaborador.component';
import { VerUsuarioComponent } from './components/public/user/ver-usuario/ver-usuario.component'
import { EditNegocioComponent } from './components/public/negocio/edit-negocio/edit-negocio.component';
import { AgregarTarjetaComponent } from './components/pago-form/agregar-tarjeta/agregar-tarjeta.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminAlertaComponent } from "./components/admin/admin-alerta/admin-alerta.component";
import { AdminSidenavComponent } from './components/admin/admin-sidenav/admin-sidenav.component';
import { AdminAdministradoresComponent } from './components/admin/admin-administradores/admin-administradores.component';
import { AdminColaboradoresComponent } from './components/admin/admin-colaboradores/admin-colaboradores.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminTabsComponent } from './components/admin/admin-tabs/admin-tabs.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CoInfoComponent } from './components/admin/admin-colaboradores/co-info/co-info.component';
import { AdminCapitanesComponent } from './components/admin/admin-capitanes/admin-capitanes.component';
import { AdminBartendersComponent } from './components/admin/admin-capitanes copy/admin-bartenders.component';
import { AdminEventoComponent } from './components/admin/admin-evento/admin-evento.component';
import { AdminEventosComponent } from './components/admin/admin-eventos/admin-eventos.component';
import { AdminNegociosComponent } from './components/admin/admin-negocios/admin-negocios.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AdminConfiguracionComponent } from './components/admin/admin-configuracion/admin-configuracion.component';
import { FormDatosNegocioComponent } from './components/public/negocio/form-datos-negocio/form-datos-negocio.component';
import { FormExtrasNegocioComponent } from './components/public/negocio/form-extras-negocio/form-extras-negocio.component';
import { NegocioInfoComponent } from './components/admin/admin-negocios/negocio-info/negocio-info.component';
import { AddCategoriaComponent } from './components/admin/admin-categorias/add-categoria/add-categoria.component';
import { TablaCategoriasComponent } from './components/admin/admin-categorias/tabla-categorias/tabla-categorias.component';
import { EditCategoriaComponent } from './components/admin/admin-categorias/edit-categoria/edit-categoria.component';
import { PagarEventoComponent } from './components/pasarela/pagar-evento/pagar-evento.component';
import { AdminTrasnferenciasComponent } from './components/admin/admin-trasnferencias/admin-trasnferencias.component';
import { AdminFacturasComponent } from './components/admin/admin-facturas/admin-facturas.component';
import { TransferenciaComponent } from './components/admin/admin-trasnferencias/transferencia/transferencia.component';

import { PagoTarjetaPagosComponent } from './pagos/components/pago-tarjeta/pago-tarjeta.component';
import { DatosFacturacionPagosComponent } from "./pagos/components/datos-facturacion/datos-facturacion.component";
import { CalculosFacturacionPagosComponent } from "./pagos/components/calculos-facturacion/calculos-facturacion.component";
import { PagarPlanPagosComponent } from "./pagos/components/pagar-plan/pagar-plan.component";

import { DatosFacturacionComponent } from './components/pasarela/datos-facturacion/datos-facturacion.component';
import { CalculosFacturacionComponent } from './components/pasarela/calculos-facturacion/calculos-facturacion.component';
import { PagoTransferenciaPagosComponent } from './pagos/components/pago-transferencia/pago-transferencia.component';
import { FacturaAdminComponent } from './components/admin/admin-facturas/factura-admin/factura-admin.component';
import { PublicComponent } from './components/public/public.component';
import { CoTycComponent } from './components/public/docs/co-tyc/co-tyc.component';
import { CotycContentComponent } from './components/public/docs/co-tyc/cotyc-content/cotyc-content.component';
import { CoContratoEventoComponent } from './components/public/docs/co-contrato-evento/co-contrato-evento.component';
import { DesPostularComponent } from './components/public/colaboradores/co-eventos/co-evento/des-postular/des-postular.component';
import { GetDatosClienteComponent } from './components/public/inicio/crear-evento/get-datos-cliente/get-datos-cliente.component';
import { DeleteEventoComponent } from './components/public/user/tus-eventos/evento/delete-evento/delete-evento.component';

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
    LoadingInsetComponent,
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
    EditNegocioComponent,
    AgregarTarjetaComponent,
    AdminComponent,
    AdminAlertaComponent,
    AdminSidenavComponent,
    AdminAdministradoresComponent,
    AdminColaboradoresComponent,
    AdminUsuariosComponent,
    AdminTabsComponent,
    AdminDashboardComponent,
    CoInfoComponent,
    AdminCapitanesComponent,
    AdminBartendersComponent,
    AdminEventoComponent,
    AdminEventosComponent,
    AdminNegociosComponent,
    AdminCategoriasComponent,
    AdminConfiguracionComponent,
    FormDatosNegocioComponent,
    FormExtrasNegocioComponent,
    NegocioInfoComponent,
    AddCategoriaComponent,
    TablaCategoriasComponent,
    EditCategoriaComponent,
    PagarEventoComponent,
    AdminTrasnferenciasComponent,
    AdminFacturasComponent,
    TransferenciaComponent,
    DocPanelComponent,
    DocsMenuComponent,
    AyudaComponent,
    WhatsappFormComponent,
    PagoTarjetaPagosComponent,
    PagoTransferenciaPagosComponent,
    DatosFacturacionComponent,
    CalculosFacturacionComponent,
    FacturaAdminComponent,
    DatosFacturacionPagosComponent,
    CalculosFacturacionPagosComponent,
    PagarPlanPagosComponent,
    PublicComponent,
    CoTycComponent,
    CotycContentComponent,
    CotycDialogComponent,
    AlertLoginComponent,
    SolicitudDialog,
    InactivoDialog,
    CoContratoEventoComponent,
    DesPostularComponent,
    GetDatosClienteComponent,
    DeleteEventoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'need' }),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5qs1RP5Hm53w19CXYG_5VGm7zi0O4Vns"
    }),
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
    }),
    PagoModule
  ],
  entryComponents: [
    CotycContentComponent,
    CotycDialogComponent,
    AlertLoginComponent,
    SolicitudDialog,
    InactivoDialog,
    PostularComponent,
    DesPostularComponent,
    GetDatosClienteComponent,
    DeleteEventoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
