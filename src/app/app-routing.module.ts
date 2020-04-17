import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { PublicComponent } from './components/public/public.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { CotizacionComponent } from './components/public/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/public/inicio/login-user/login-user.component';
import { CrearEventoComponent } from './components/public/inicio/crear-evento/crear-evento.component';

import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';
import { UsuarioComponent } from './components/public/user/user.component';
import { TusEventosComponent } from './components/public/user/tus-eventos/tus-eventos.component';
import { EventoComponent } from './components/public/user/tus-eventos/evento/evento.component';
import { DetallesComponent } from './components/public/user/tus-eventos/detalles/detalles.component';
import { DatosComponent } from './components/public/user/tus-eventos/datos/datos.component';
import { PersonalComponent } from './components/public/user/tus-eventos/personal/personal.component';
import { PerfilComponent } from './components/public/user/perfil/perfil.component';
import { NuevoEventoComponent } from './components/public/user/nuevo-evento/nuevo-evento.component';

import { DirectorioComponent } from './components/public/directorio/directorio.component';
import { CategoriasComponent } from './components/public/directorio/all-catego/categorias.component';
import { NegBienvenidaComponent } from './components/public/directorio/neg-bienvenida/neg-bienvenida.component';
import { CategoriaComponent } from './components/public/directorio/categoria/categoria.component';
import { SuscribirComponent } from './components/public/directorio/suscribir/suscribir.component';
import { PagarPlanComponent } from './components/pasarela/pagar-plan/pagar-plan.component';

import { NegocioComponent } from './components/public/negocio/negocio.component';

import { ConocenosComponent } from './components/public/docs/conocenos/conocenos.component';
import { PreciosComponent } from './components/public/docs/precios/precios.component';
import { TycComponent } from './components/public/docs/tyc/tyc.component';
import { PdpComponent } from './components/public/docs/pdp/pdp.component';
import { DocPanelComponent } from './components/public/docs/doc-panel/doc-panel.component';
import { AyudaComponent } from './components/public/docs/ayuda/ayuda.component';

import { ColaboradoresComponent } from './components/public/colaboradores/colaboradores.component';
import { CoLoginComponent } from './components/public/colaboradores/co-login/co-login.component';
import { CoRegistroComponent } from './components/public/colaboradores/co-registro/co-registro.component';
import { CoDatosComponent } from './components/public/colaboradores/co-registro/co-datos/co-datos.component';
import { CoExpLaboralComponent } from './components/public/colaboradores/co-registro/co-exp-laboral/co-exp-laboral.component';
import { ColaboradorGuardadoComponent } from './components/notificaciones/colaborador-guardado/colaborador-guardado.component';
import { CoPerfilComponent } from './components/public/colaboradores/co-perfil/co-perfil.component';
import { CoEventosComponent } from './components/public/colaboradores/co-eventos/co-eventos.component';
import { CoTusEventosComponent } from './components/public/colaboradores/co-tus-eventos/co-tus-eventos.component';
import { CoAddImagenComponent } from './components/public/colaboradores/co-add-imagen/co-add-imagen.component';
import { CoEventoComponent } from './components/public/colaboradores/co-eventos/co-evento/co-evento.component';

import { PostulacionExitosaComponent } from './components/notificaciones/postulacion-exitosa/postulacion-exitosa.component';

import { VerEquipoComponent } from './components/public/user/tus-eventos/ver-equipo/ver-equipo.component';
import { VerColaboradorComponent } from './components/public/colaboradores/ver-colaborador/ver-colaborador.component';
import { VerUsuarioComponent } from './components/public/user/ver-usuario/ver-usuario.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

import { AdminAdministradoresComponent } from './components/admin/admin-administradores/admin-administradores.component';
import { AdminColaboradoresComponent } from './components/admin/admin-colaboradores/admin-colaboradores.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminBartendersComponent } from './components/admin/admin-capitanes copy/admin-bartenders.component';
import { CoInfoComponent } from './components/admin/admin-colaboradores/co-info/co-info.component';
import { AdminCapitanesComponent } from './components/admin/admin-capitanes/admin-capitanes.component';

import { AdminEventoComponent } from './components/admin/admin-evento/admin-evento.component';
import { AdminEventosComponent } from './components/admin/admin-eventos/admin-eventos.component';

import { AdminNegociosComponent } from './components/admin/admin-negocios/admin-negocios.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { EditCategoriaComponent } from './components/admin/admin-categorias/edit-categoria/edit-categoria.component';
import { AddCategoriaComponent } from './components/admin/admin-categorias/add-categoria/add-categoria.component';
import { TablaCategoriasComponent } from './components/admin/admin-categorias/tabla-categorias/tabla-categorias.component';
import { FormNegocioComponent } from './components/public/negocio/form-negocio/form-negocio.component';
import { FormDatosNegocioComponent } from './components/public/negocio/form-datos-negocio/form-datos-negocio.component';
import { FormExtrasNegocioComponent } from './components/public/negocio/form-extras-negocio/form-extras-negocio.component';
import { NegocioInfoComponent } from './components/admin/admin-negocios/negocio-info/negocio-info.component';

import { AdminConfiguracionComponent } from './components/admin/admin-configuracion/admin-configuracion.component';

import { PagarEventoComponent } from './components/pasarela/pagar-evento/pagar-evento.component';
import { TransferenciaComponent } from './components/admin/admin-trasnferencias/transferencia/transferencia.component';

import { AdminFacturasComponent } from './components/admin/admin-facturas/admin-facturas.component';
import { AdminTrasnferenciasComponent } from './components/admin/admin-trasnferencias/admin-trasnferencias.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'cotizacion/:idEvento', component: CotizacionComponent },
      { path: 'login', component: LoginUserComponent },
      { path: 'login/:idEvento', component: LoginUserComponent },
      { path: 'login/:plan', component: LoginUserComponent },
      { path: 'crear-evento/:idEvento', component: CrearEventoComponent },
    
      // Notificaciones
      { path: 'evento-creado/:idEvento', component: EventoCreadoComponent },
      { path: 'colaborador-registrado/:id', component: ColaboradorGuardadoComponent},
      
      // Usuario
      { path: 'usuario', component: UsuarioComponent, data: {nav: 'usuario'}, children: [
        { path: '', component: NuevoEventoComponent },
        { path: 'mis-eventos', component: TusEventosComponent, data: { nav: 'eventos' } },
        { path: 'evento/:id', component: EventoComponent, children:[
          { path: '', redirectTo: 'detalles', pathMatch: 'full' },
          { path: 'detalles', component: DetallesComponent },
          { path: 'datos', component: DatosComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'ver-equipo', component: VerEquipoComponent },
        ]},
        { path: 'perfil', component: PerfilComponent, data: { nav: 'perfil' } },
        { path: 'nuevo-evento', component: NuevoEventoComponent, data: {nav: 'nuevo'} },
        { path: 'ver_colaborador/:id', component: VerColaboradorComponent },
        { path: 'resumen-pago/:id', component: PagarEventoComponent}
      ] },
      
      // Directorio
      { path: 'directorio', component: DirectorioComponent, data: {nav: 'directorio'}, children: [
        { path: '', component: CategoriasComponent},
        { path: 'planes', component: NegBienvenidaComponent},
        { path: 'categorias', component: CategoriasComponent},
        { path: 'categoria/:name', component: CategoriaComponent},
        { path: 'suscripcion', component: SuscribirComponent, children: [
          { path: 'add/:id', component: FormNegocioComponent, data: { nav: 1 } },
          { path: 'datos/:id', component: FormDatosNegocioComponent, data: { nav: 2 } },
          { path: 'extras', component: FormExtrasNegocioComponent, data: { nav: 3 } },
          
        ]},
        { path: 'pagarPlan/:plan', component: PagarPlanComponent },
        { path: 'pagarPlan/', redirectTo: 'planes', pathMatch: 'full'},
      ] },
      
      // Colaborador
      { path: 'colaborador', component: ColaboradoresComponent, children: [
        { path: '', component: CoPerfilComponent },
        { path: 'login', component: CoLoginComponent },
        { path: 'registro', component: CoRegistroComponent },
        { path: 'reg-datos/:id', component: CoDatosComponent },
        { path: 'exp_laboral/:id', component: CoExpLaboralComponent },
        { path: 'add_imagen/:id', component: CoAddImagenComponent },
        { path: 'perfil', component: CoPerfilComponent },
        { path: 'eventos', component: CoEventosComponent },
        { path: 'evento/:id', component: CoEventoComponent, children:[
          { path: '', redirectTo: 'detalles', pathMatch: 'full' },
          { path: 'detalles', component: DetallesComponent },
          { path: 'datos', component: DatosComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'ver-equipo', component: VerEquipoComponent },
        ]},
        { path: 'postulacion_exitosa/:id', component: PostulacionExitosaComponent },
        { path: 'tus_eventos', component: CoTusEventosComponent },
        { path: 'ver_usuario/:id', component: VerUsuarioComponent}
      ]
      },
      
      // documentos
      { path: 'docs', component: DocPanelComponent, children:[
        { path: 'costos_y_tarifas', component: PreciosComponent },
        { path: 'terminos_y_condiciones', component: TycComponent },
        { path: 'politica_de_privacidad', component: PdpComponent },
      ]},
      { path: 'ayuda', component: AyudaComponent },
      { path: 'negocio/:neg', component: NegocioComponent },
    ]},
  
  // Admin
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: AdminDashboardComponent },
    { path: 'administradores', component: AdminAdministradoresComponent },
    { path: 'colaboradores', component: AdminColaboradoresComponent },
    { path: 'capitanes', component: AdminCapitanesComponent },
    { path: 'bartenders', component: AdminBartendersComponent },
    { path: 'co_info/:id', component: CoInfoComponent },
    { path: 'usuarios', component: AdminUsuariosComponent },
    { path: 'ver_usuario/:id', component: VerUsuarioComponent },
    { path: 'eventos', component: AdminEventosComponent },
    { path: 'negocios', component: AdminNegociosComponent },
    { path: 'negocio_info/:id', component: NegocioInfoComponent },
    { path: 'categorias', component: AdminCategoriasComponent, children: [
      { path: '', component: TablaCategoriasComponent},
      { path: 'agregar', component: AddCategoriaComponent },
      { path: 'editar/:id', component: EditCategoriaComponent},
    ] },
    { path: 'configuracion', component: AdminConfiguracionComponent },
    { path: 'evento/:id', component: AdminEventoComponent, children:[
      { path: '', redirectTo: 'detalles', pathMatch: 'full' },
      { path: 'detalles', component: DetallesComponent },
      { path: 'datos', component: DatosComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'ver-equipo', component: VerEquipoComponent },
    ]},
    { path: 'facturas', component: AdminFacturasComponent },
    { path: 'transferencias', component: AdminTrasnferenciasComponent },
    { path: 'transferencia/:id', component: TransferenciaComponent },
  ] },
  
  
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

export const appRountingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
