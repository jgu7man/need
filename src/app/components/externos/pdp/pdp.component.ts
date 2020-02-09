import { Component, OnInit } from '@angular/core';
import { PreciosPersonal } from '../../../models/finanzas/precios.personal';
import { DocumentacionService } from '../../../services/documentacion.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent implements OnInit {

  public precios = PreciosPersonal

  constructor(private _doc: DocumentacionService) {}
    
  ngOnInit() {
    this._doc.setIndice(this.indice)
  }

  public indice = {
    page_title: 'Política de privacidad',
    page_route: 'politica_de_privacidad',
    anclas:[
      {
        display: 'Nuestras obligaciones de privacidad',
        ruta: 'nuestras_obligaciones',
      },
      {
        display: 'Los tipos de información personal que recopilamos y guardamos',
        ruta: 'tipos_de_informacion',
      },
      {
        display: 'Cómo recopilamos información personal',
        ruta: 'como_recopilamos',
        childrens: [
          { display: 'Información que nos proporciona específicamente', ruta: 'informacion_especifica'},
          { display: 'Información que recopilamos de otros', ruta: 'inforacion_de_otros'},
          { display: 'Información que recopilamos a medida que utiliza nuestro servicio', ruta: 'informacion_de_nuestro_servicio'},
          { display: 'Enlaces a otros sitios', ruta: 'enlaces_de_otros_sitios'},
        ]
      },
      {
        display: 'Cómo usamos la información personal',
        ruta: 'como_usamos_la_informacion_personal',
      },
      {
        display: 'Cuando divulgamos información personal',
        ruta: 'divulgacion',
        childrens: [
          { display: 'Nuestros proveedores de servicios externos', ruta: 'nuestros_proveedores'},
          { display: 'Aplicaciones de terceros', ruta: 'aplicaciones_terceros'},
          { display: 'Otras divulgaciones y transferencias', ruta: 'otras_divulgaciones'}
        ]
      },
      {
        display: 'Acceder, corregir o descargar su información personal',
        ruta: 'informacion_personal',
      },
      {
        display: 'Para contactarnos',
        ruta: 'contacto',
      },
    ]
  }

}
