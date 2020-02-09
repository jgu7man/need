import { Component, OnInit } from '@angular/core';
import { PreciosPersonal, ListaDePrecios, ListaPreciosModel } from '../../../models/finanzas/precios.personal';
import { AdminDataService } from '../../../services/admin/admin.data.service';
import { DocumentacionService } from '../../../services/documentacion.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  public precios: any
  
  constructor(
    private _adminData: AdminDataService,
    private _doc: DocumentacionService
  ) {
    
   }

  ngOnInit() {
    this._doc.setIndice(this.indice)
    this._adminData.getPersonalPreciosArray().then(res => {
      this.precios = res
    })
  }

  public indice = {
    page_title: 'Costos y tarifas',
    page_route: 'costos_y_tarifas',
    anclas:[
      {
        display: 'Eventos',
        ruta: 'eventos',
        childrens: [
          { display: 'Cancelación de eventos', ruta: 'cancelacion_de_eventos' },
          {display: 'Promoción de eventos', ruta: 'promocion_de_eventos'}
        ]
      },
      {
        display: 'Directorio',
        ruta: 'directorio',
      },
      {
        display: 'Colaboradores',
        ruta: 'colaboradores',
      },
      {
        display: 'Impuestos',
        ruta: 'impuestos',
      },
      {
        display: 'Costos Extras',
        ruta: 'costos_extras',
        childrens: [
          { display: 'Horas extras de servicio', ruta: 'horas_extras_servicio'},
          { display: 'Horas extras en el evento', ruta: 'horas_extras_evento'},
        ]
      },
    ]
  }

}
