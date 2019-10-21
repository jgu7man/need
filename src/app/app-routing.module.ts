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
  
  { path: 'usuario', component: UsuarioComponent, children: [
    { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    { path: 'tus-eventos', component: TusEventosComponent, data: { nav: 2 } },
    { path: 'evento/:id', component: EventoComponent, children:[
      {path: '', redirectTo: 'detalles', pathMatch: 'full'},
      {path: 'detalles', component: DetallesComponent},
      {path: 'datos', component: DatosComponent},
      {path: 'personal', component: PersonalComponent},
    ]},
    { path: 'perfil', component: PerfilComponent, data: { nav: 3 } },
    { path: 'nuevo-evento', component: NuevoEventoComponent},
  ] },
  { path: 'directorio', component: DirectorioComponent, data: {nav: 4}, children: [
    { path: '', component: CategoriasComponent},
    { path: 'bienvenida', component: NegBienvenidaComponent},
    { path: 'categorias', component: CategoriasComponent},
    { path: 'categoria/:name', component: CategoriaComponent},
    { path: 'suscripcion', component: SuscribirComponent},
    { path: 'pagarPlan/:plan', component: PagarPlanComponent},
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
