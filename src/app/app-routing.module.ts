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
import { CoContratoEventoComponent } from './components/public/docs/co-contrato-evento/co-contrato-evento.component';

const titlePrefix = 'Need - '

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', component: InicioComponent, data: {title: titlePrefix+'Inicio'} },
      { path: 'cotizacion', component: CotizacionComponent, data: { title: titlePrefix + 'Cotizar' } },
      { path: 'cotizacion/:idEvento', component: CotizacionComponent, data: { title: titlePrefix + 'Cotizar' } },
      { path: 'login', component: LoginUserComponent, data: { title: titlePrefix + 'Login' } },
      { path: 'login/:idEvento', component: LoginUserComponent, data: { title: titlePrefix + 'Login' } },
      { path: 'login/:plan', component: LoginUserComponent, data: { title: titlePrefix + 'Login' } },
      { path: 'crear-evento/:idEvento', component: CrearEventoComponent, data: { title: titlePrefix + 'Crear evento' } },
    
      // Notificaciones
      { path: 'evento-creado/:idEvento', component: EventoCreadoComponent, data: { title: titlePrefix + 'Evento creado' } },
      { path: 'colaborador-registrado/:id', component: ColaboradorGuardadoComponent, data: { title: titlePrefix + 'Registrado' }},
      
      // Usuario
      { path: 'usuario', component: UsuarioComponent, data: {nav: 'usuario', title: titlePrefix+'Usuario'}, children: [
        { path: '', component: NuevoEventoComponent, data: { title: titlePrefix + 'Evento nuevo' } },
        { path: 'mis-eventos', component: TusEventosComponent, data: { nav: 'eventos', title: titlePrefix + 'Eventos' } },
        { path: 'evento/:id', component: EventoComponent, data: { title: titlePrefix + 'Información de evento' }, children:[
          { path: '', redirectTo: 'detalles', pathMatch: 'full' },
          { path: 'detalles', component: DetallesComponent, data: { title: titlePrefix + 'Información de evento' } },
          { path: 'datos', component: DatosComponent, data: { title: titlePrefix + 'Información de evento' }},
          { path: 'personal', component: PersonalComponent, data: { title: titlePrefix + 'Información de evento' } },
          { path: 'ver-equipo', component: VerEquipoComponent, data: { title: titlePrefix + 'Información de evento' } },
        ]},
        { path: 'perfil', component: PerfilComponent, data: { nav: 'perfil', title: titlePrefix + 'Perfil de usuario' },  },
        { path: 'nuevo-evento', component: NuevoEventoComponent, data: { nav: 'nuevo', title: titlePrefix + 'Nuevo Evento' }, },
        { path: 'ver_colaborador/:id', component: VerColaboradorComponent, data: { title: titlePrefix + 'Información de colaborador' } },
        { path: 'resumen-pago/:id', component: PagarEventoComponent, data: {title: titlePrefix + 'Resumen de pago'}}
      ] },
      
      // Directorio
      { path: 'directorio', component: DirectorioComponent, data: {nav: 'directorio'}, children: [
        { path: '', component: CategoriasComponent, data: { title: titlePrefix + 'Categorías' } },
        { path: 'planes', component: NegBienvenidaComponent, data: { title: titlePrefix + 'Planes' } },
        { path: 'categorias', component: CategoriasComponent, data: { title: titlePrefix + 'Categorías' } },
        { path: 'categoria/:name', component: CategoriaComponent},
        { path: 'suscripcion', component: SuscribirComponent, data: { title: titlePrefix + 'Suscripción' },  children: [
          { path: 'add/:id', component: FormNegocioComponent, data: { nav: 1, title: titlePrefix + 'Suscripción' } },
          { path: 'datos/:id', component: FormDatosNegocioComponent, data: { nav: 2, title: titlePrefix + 'Suscripción' } },
          { path: 'extras', component: FormExtrasNegocioComponent, data: { nav: 3, title: titlePrefix + 'Suscripción' } },
          
        ]},
        { path: 'pagarPlan/:plan', component: PagarPlanComponent, data: { title: titlePrefix + 'Planes' }  },
        { path: 'pagarPlan/', redirectTo: 'planes', pathMatch: 'full'},
      ] },
      
      // Colaborador
      { path: 'colaborador', component: ColaboradoresComponent, data: { title: titlePrefix + 'Colaborador' }, children: [
        { path: '', component: CoPerfilComponent },
        { path: 'login', component: CoLoginComponent, data: { title: titlePrefix + 'Login Colaborador' } },
        { path: 'login/estado/:estado', component: CoLoginComponent, data: { title: titlePrefix + 'Login Colaborador' } },
        { path: 'registro', component: CoRegistroComponent, data: { title: titlePrefix + 'Registro Colaborador' }  },
        { path: 'reg-datos/:id', component: CoDatosComponent, data: { title: titlePrefix + 'Registro Colaborador' }  },
        { path: 'exp_laboral/:id', component: CoExpLaboralComponent, data: { title: titlePrefix + 'Registro Colaborador' }  },
        { path: 'add_imagen/:id', component: CoAddImagenComponent, data: { title: titlePrefix + 'Registro Colaborador' }  },
        { path: 'perfil', component: CoPerfilComponent, data: { title: titlePrefix + 'Perfil Colaborador' }  },
        { path: 'eventos', component: CoEventosComponent, data: { title: titlePrefix + 'Eventos Colaborador' }  },
        {
          path: 'evento/:id', component: CoEventoComponent, data: { title: titlePrefix + 'Información de evento', userType: 'colaborador' }, children:[
          { path: '', redirectTo: 'detalles', pathMatch: 'full' },
          { path: 'detalles', component: DetallesComponent, data: { title: titlePrefix + 'Información de evento' } },
          { path: 'datos', component: DatosComponent, data: { title: titlePrefix + 'Información de evento' } },
          { path: 'personal', component: PersonalComponent, data: { title: titlePrefix + 'Información de evento' } },
          { path: 'ver-equipo', component: VerEquipoComponent, data: { title: titlePrefix + 'Información de evento' } },
        ]},
        {
          path: 'contrato_evento', component: CoContratoEventoComponent, data: {
            title: titlePrefix + 'Contrato del evento'}
        },
        { path: 'postulacion_exitosa/:id', component: PostulacionExitosaComponent, data: { title: titlePrefix + 'Postulación Exitosa' }  },
        { path: 'tus_eventos', component: CoTusEventosComponent, data: { title: titlePrefix + 'Eventos Colaborador' }  },
        { path: 'ver_usuario/:id', component: VerUsuarioComponent, data: { title: titlePrefix + 'Ver usuario' } },
        { path: 'ver_colaborador/:id', component: VerColaboradorComponent, data: { title: titlePrefix + 'Información de colaborador' } },
      ]
      },
      
      // documentos
      { path: 'docs', component: DocPanelComponent, data: { title: titlePrefix + 'Documentos' }, children:[
        { path: 'costos_y_tarifas', component: PreciosComponent, data: { title: titlePrefix + 'Costos y tarifas' }  },
        { path: 'terminos_y_condiciones', component: TycComponent, data: { title: titlePrefix + 'Términos y condiciones' }  },
        { path: 'politica_de_privacidad', component: PdpComponent, data: { title: titlePrefix + 'Políticas de privacidad' }  },
      ]},
      { path: 'ayuda', component: AyudaComponent, data: { title: titlePrefix + 'Ayuda' }  },
      { path: 'negocio/:neg', component: NegocioComponent },
    ]},
  
  // Admin
  { path: 'admin', component: AdminComponent, data: { title: titlePrefix + 'Administración' } , children: [
    { path: '', component: AdminDashboardComponent, data: { title: titlePrefix + 'Administración' }  },
    { path: 'administradores', component: AdminAdministradoresComponent, data: { title: 'Admin - Administradores' }  },
    { path: 'colaboradores', component: AdminColaboradoresComponent, data: { title: 'Admin - Colaboradores' }  },
    { path: 'capitanes', component: AdminCapitanesComponent, data: { title: 'Admin - Capitanes' }   },
    { path: 'bartenders', component: AdminBartendersComponent, data: { title: 'Admin - Bartenders' }   },
    { path: 'co_info/:id', component: CoInfoComponent, data: { title: 'Admin - Información de colaborador' }   },
    { path: 'usuarios', component: AdminUsuariosComponent, data: { title: 'Admin - Usuarios' }   },
    { path: 'ver_usuario/:id', component: VerUsuarioComponent },
    { path: 'eventos', component: AdminEventosComponent, data: { title: 'Admin - Eventos' } },
    { path: 'negocios', component: AdminNegociosComponent, data: { title: 'Admin - Negocios' } },
    { path: 'negocio_info/:id', component: NegocioInfoComponent, data: { title: 'Admin - Negociones' }  },
    { path: 'categorias', component: AdminCategoriasComponent, data: { title: 'Admin - Categorías' },  children: [
      { path: '', component: TablaCategoriasComponent, data: { title: 'Admin - Categorías' } },
      { path: 'agregar', component: AddCategoriaComponent, data: { title: 'Admin - Categorías' }  },
      { path: 'editar/:id', component: EditCategoriaComponent, data: { title: 'Admin - Categorías' } },
    ] },
    { path: 'configuracion', component: AdminConfiguracionComponent, data: { title: 'Admin - Configuración' }  },
    { path: 'evento/:id', component: AdminEventoComponent, data: { title: 'Admin - Evento' } , children:[
      { path: '', redirectTo: 'detalles', pathMatch: 'full' },
      { path: 'detalles', component: DetallesComponent, data: { title: 'Admin - Evento' } },
      { path: 'datos', component: DatosComponent, data: { title: 'Admin - Evento' } },
      { path: 'personal', component: PersonalComponent, data: { title: 'Admin - Evento' } },
      { path: 'ver-equipo', component: VerEquipoComponent, data: { title: 'Admin - Evento' } },
    ]},
    { path: 'facturas', component: AdminFacturasComponent, data: { title: 'Admin - Facturas' } },
    { path: 'transferencias', component: AdminTrasnferenciasComponent, data: { title: 'Admin - Transferencias' } },
    { path: 'transferencia/:id', component: TransferenciaComponent, data: { title: 'Admin - Transferencias' } },
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
