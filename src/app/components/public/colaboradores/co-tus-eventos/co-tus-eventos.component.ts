import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es-CO";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import {Calendar, View} from "@fullcalendar/core";
import interactionPlugin from '@fullcalendar/interaction';
import { CoEventoService } from 'src/app/services/colaboradores/coeventos.service';
import { Router } from '@angular/router';

registerLocaleData(localeES)

export interface eventoInterface {
  start: Date
}

@Component({
  selector: 'app-co-tus-eventos',
  templateUrl: './co-tus-eventos.component.html',
  styleUrls: ['./co-tus-eventos.component.css']
})
export class CoTusEventosComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin]

   views = {
    timeGridFourDay: {
      type: 'timeGrid',
      dayCount: 4,
      duration: { days: 4 },
     },
    dayGridMonth: {
      type: 'dayGrid'
     }
   }
  
   
  public calendarView: boolean = true
  public eventos: eventoInterface[] = []
  public eventosList = []
  public view = 'dayGridMonth'
  public vista: string
  
  constructor(
    private _coEventos: CoEventoService,
    private router: Router
  ) {
    this.vista = 'Lista'
   }

  async ngOnInit() {
    var co = JSON.parse(localStorage.getItem('needlog'))
    this.eventos = await this._coEventos.getCoCalendar(co.uid)
    this.eventosList = await this._coEventos.getCoEventos(co.uid)
  }

  clickEvento(e) {
    let id = e.event.id
    this.router.navigate(['/colaborador/evento', id])
  }

  changeVista() {
    this.calendarView = !this.calendarView
    this.vista == 'Lista' ? this.vista = 'Calendario' : this.vista = 'Lista'
  }
  

}
