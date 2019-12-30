import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CotizacionComponent } from './components/inicio/cotizacion/cotizacion.component';
import { LoginUserComponent } from './components/inicio/login-user/login-user.component';
import { CrearEventoComponent } from './components/inicio/crear-evento/crear-evento.component';

import { EventoCreadoComponent } from './components/notificaciones/evento-creado/evento-creado.component';
import { UsuarioComponent } from './components/user/user.component';
import { TusEventosComponent } from './components/user/tus-eventos/tus-eventos.component';
import { EventoComponent } from './components/user/tus-eventos/evento/evento.component';
import { DetallesComponent } from './components/user/tus-eventos/detalles/detalles.component';
import { DatosComponent } from './components/user/tus-eventos/datos/datos.component';
import { PersonalComponent } from './components/user/tus-eventos/personal/personal.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { NuevoEventoComponent } from './components/user/nuevo-evento/nuevo-evento.component';

import { DirectorioComponent } from './components/directorio/directorio.component';
import { CategoriasComponent } from './components/directorio/all-catego/categorias.component';
import { NegBienvenidaComponent } from './components/directorio/neg-bienvenida/neg-bienvenida.component';
import { CategoriaComponent } from './components/directorio/categoria/categoria.component';
import { SuscribirComponent } from './components/directorio/suscribir/suscribir.component';
import { PagarPlanComponent } from './components/directorio/pagar-plan/pagar-plan.component';

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
import { ColaboradorGuardadoComponent } from './components/notificaciones/colaborador-guardado/colaborador-guardado.component';
import { CoPerfilComponent } from './components/colaboradores/co-perfil/co-perfil.component';
import { CoEventosComponent } from './components/colaboradores/co-eventos/co-eventos.component';
import { CoTusEventosComponent } from './components/colaboradores/co-tus-eventos/co-tus-eventos.component';
import { CoAddImagenComponent } from './components/colaboradores/co-add-imagen/co-add-imagen.component';
import { CoEventoComponent } from './components/colaboradores/co-eventos/co-evento/co-evento.component';
import { PostulacionExitosaComponent } from './components/notificaciones/postulacion-exitosa/postulacion-exitosa.component';
import { VerEquipoComponent } from './components/user/tus-eventos/ver-equipo/ver-equipo.component';
import { VerColaboradorComponent } from './components/colaborador/ver-colaborador/ver-colaborador.component';
import { VerUsuarioComponent } from './components/user/ver-usuario/ver-usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAdministradoresComponent } from './components/admin/admin-administradores/admin-administradores.component';
import { AdminColaboradoresComponent } from './components/admin/admin-colaboradores/admin-colaboradores.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CoInfoComponent } from './components/admin/admin-colaboradores/co-info/co-info.component';
import { AdminCapitanesComponent } from './components/admin/admin-capitanes/admin-capitanes.component';
import { AdminEventoComponent } from './components/admin/admin-evento/admin-evento.component';
import { AdminEventosComponent } from './components/admin/admin-eventos/admin-eventos.component';
import { AdminNegociosComponent } from './components/admin/admin-negocios/admin-negocios.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AdminConfiguracionComponent } from './components/admin/admin-configuracion/admin-configuracion.component';
import { FormNegocioComponent } from './components/negocio/form-negocio/form-negocio.component';
import { FormDatosNegocioComponent } from './components/negocio/form-datos-negocio/form-datos-negocio.component';
import { FormExtrasNegocioComponent } from './components/negocio/form-extras-negocio/form-extras-negocio.component';
import { NegocioInfoComponent } from './components/admin/admin-negocios/negocio-info/negocio-info.component';
import { AddCategoriaComponent } from './components/admin/admin-categorias/add-categoria/add-categoria.component';
import { TablaCategoriasComponent } from './components/admin/admin-categorias/tabla-categorias/tabla-categorias.component';
import { EditCategoriaComponent } from './components/admin/admin-categorias/edit-categoria/edit-categoria.component';


const routes: Routes = [
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
  { path: 'usuario', component: UsuarioComponent, children: [
    { path: '', component: NuevoEventoComponent },
    { path: 'tus-eventos', component: TusEventosComponent, data: { nav: 2 } },
    { path: 'evento/:id', component: EventoComponent, children:[
      { path: '', redirectTo: 'detalles', pathMatch: 'full' },
      { path: 'detalles', component: DetallesComponent },
      { path: 'datos', component: DatosComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'ver-equipo', component: VerEquipoComponent },
    ]},
    { path: 'perfil', component: PerfilComponent, data: { nav: 3 } },
    { path: 'nuevo-evento', component: NuevoEventoComponent },
    { path: 'ver_colaborador/:id', component: VerColaboradorComponent}
  ] },
  
  // Directorio
  { path: 'directorio', component: DirectorioComponent, data: {nav: 4}, children: [
    { path: '', component: CategoriasComponent},
    { path: 'bienvenida', component: NegBienvenidaComponent},
    { path: 'categorias', component: CategoriasComponent},
    { path: 'categoria/:name', component: CategoriaComponent},
    { path: 'suscripcion', component: SuscribirComponent, children: [
      { path: 'add/:id', component: FormNegocioComponent, data: { nav: 1 } },
      { path: 'datos/:id', component: FormDatosNegocioComponent, data: { nav: 2 } },
      { path: 'extras', component: FormExtrasNegocioComponent, data: { nav: 3 } },
      
    ]},
    { path: 'pagarPlan/:plan', component: PagarPlanComponent},
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
  ] },
  
  // Admin
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: AdminDashboardComponent },
    { path: 'administradores', component: AdminAdministradoresComponent },
    { path: 'colaboradores', component: AdminColaboradoresComponent },
    { path: 'capitanes', component: AdminCapitanesComponent },
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
  ] },
  

  { path: 'negocio/:neg', component: NegocioComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'tyc', component: TycComponent },
  { path: 'pdp', component: PdpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
