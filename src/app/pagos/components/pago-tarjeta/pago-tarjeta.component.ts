import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { PagoTarjetaService } from '../../services/pago-tarjeta.service';
import { environment } from '../../../../environments/environment';
import { TransaccionModel } from '../../../models/finanzas/transaccion.model';
import { FacturaModel } from '../../../models/finanzas/factura.model';
import { AlertaService } from '../../../services/alerta.service';
import { Router } from '@angular/router';
declare var Stripe: any

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.css']
})
export class PagoTarjetaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', {static: true}) cardInfo: ElementRef


  @Input() amount: number
  @Input() transaccion: TransaccionModel
  factura: FacturaModel
  card: any
  cardHandler = this.onChange.bind(this)
  error: string
  loading = false
  confirmation
  stripe

  constructor(
    private _pagoEnlinea: PagoTarjetaService,
    private cd: ChangeDetectorRef,
    private _alerta: AlertaService,
    private router: Router
  ) { 
    this.stripe = Stripe(environment.stripeKey);
    this.transaccion = new TransaccionModel('','','','evento',this.factura, '',false,'en linea')
  }

  async ngOnInit() {

  }

  ngAfterViewInit() {
    var elements = this.stripe.elements();
    this.card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          color: '#c3c3c3',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '16px',
          fontWeight: 700
        }
      }
    });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(e) {

    $('app-loading').fadeToggle()

    var transaccion = {}
    await Object.keys(this.transaccion).forEach(key => { transaccion[key] = this.transaccion[key] })
    var factura = {}
    await Object.keys(this.transaccion.factura).forEach(key => { factura[key] = this.transaccion.factura[key] })
    transaccion['factura'] = ''
    var data = { ...transaccion, ...factura }

    const { source, error } = await this.stripe.createSource(this.card, {
      owner: {
        email: this.transaccion.factura.email,
        name: this.transaccion.factura.razon,
      },
      metadata: data
    });


    if (error) { this._alerta.sendAlertaCont('Algo salio mal:'+ error.message);}
    else {
      this._pagoEnlinea.pagarHttpRoute(source).subscribe( res => {

        $('app-loading').fadeToggle()
        this._alerta.sendAlertaCont(res.message).subscribe(async ok => {
          
          
          $('app-loading').fadeToggle()
          var link = await this._pagoEnlinea.setPago(this.transaccion)
          $('app-loading').fadeToggle()
          this.router.navigate([link])
        })
        
      }, err => {
          console.log(err)
          if (err.status == 0) {
            this._alerta.sendAlertaCont('ups! algo salio mal')
            
          }
      })
    }
  }
  

}
