import { Component, OnInit } from '@angular/core';
import { DocumentacionService } from 'src/app/services/documentacion.service';

@Component({
  selector: 'app-tyc',
  templateUrl: './tyc.component.html',
  styleUrls: ['./tyc.component.css']
})
export class TycComponent implements OnInit {

  
  
  constructor(private _documentacion: DocumentacionService) {
  }
  
  ngOnInit() {
    this._documentacion.setIndice(this.indice)
  }

  public direccion_fiscal = 'Pinos #40, Colonia El tecuán, Encarnación de Díaz, Jalisco, México'

  public indice = {
    page_title: 'Terminos y condiciones',
    page_route: 'terminos_y_condiciones',
    anclas:[
      {
        display: 'Relación contractual',
        ruta: 'relacion_contractual',
      },
      {
        display: 'Los Servicios',
        ruta: 'servicios',
        childrens: [
          { display: 'Licencia', ruta: 'licencia' },
          { display: 'Restricciones', ruta: 'resticciones' },
          { display: 'Prestación de los Servicios', ruta: 'prestacion_de_los_servicios' },
          { display: 'Servicios y contenido de Terceros', ruta: 'servicios_y_contenido_de_terceros' },
          { display: 'Titularidad', ruta: 'titularidad' },
        ]
      },
      {
        display: 'Su uso de los Servicios',
        ruta: 'uso_de_servicios',
        childrens: [
          { display: 'Cuentas de usuario', ruta: 'cuentas_de_usuario' },
          { display: 'Requisitos y conducta del usuario', ruta: 'requisitos_y_conducta_del_usuario' },
          { display: 'Mensajes de texto', ruta: 'mensajes_de_texto' },
          { display: 'Códigos promocionales', ruta: 'codigos_promocionales' },
          { display: 'Contenido proporcionado por el Usuario', ruta: 'contenido_proporcionado_por_el_usuario' },
          { display: 'Acceso a la red y dispositivos', ruta: 'acceso_a_la_red_y_dispositivos' },
        ]
      },
      {
        display: 'Pago',
        ruta: 'pago',
        childrens: [
          { display: 'Tarifa de reparación, limpieza o cargos por objetos olvidados', ruta: 'tarifas_extras' }
        ]
      },
      {
        display: 'Soporte; Renuncias; Limitación de responsabilidad; Indemnidad',
        ruta: 'soporte_renuncias_limitacion_de_responsabilidad_indemnidad',
        childrens: [
          { display: 'Soporte', ruta: 'soporte' },
          { display: 'Renuncia', ruta: 'renuncia' },
          { display: 'Limitación de la responsabilidad', ruta: 'limitacion' },
          { display: 'Indemidad', ruta: 'indemidad' }
        ]
      },
      {
        display: 'Legislación aplicable; Resolución Directa y Arbitraje',
        ruta: 'legislacion',
        childrens: [
          { display: 'Resolución directa de Conflictos', ruta: 'resolucion_de_conflictos' },
          { display: 'Mediación y Arbitraje', ruta: 'mediacion_y_arbitraje' },
        ]
      },
      {
        display: 'Otras disposiciones',
        ruta: 'otras_disposiciones',
        childrens: [
          { display: ' Reclamaciones por infracción de derechos de autor', ruta: 'reclamaciones_derechos_de_autor' },
          { display: ' Notificaciones', ruta: 'notificaiones' },
          { display: ' Disposiciones generales', ruta: 'disposiciones_generales' },
        ]
      },
    ]
  }

}
