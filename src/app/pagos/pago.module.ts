import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoRoutingModule } from './pago-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { PagoTarjetaComponent } from './components/pago-tarjeta/pago-tarjeta.component';



@NgModule({
  declarations: [
    // PagoTarjetaComponent
  ],
  imports: [
    CommonModule,
    PagoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PagoModule { }
