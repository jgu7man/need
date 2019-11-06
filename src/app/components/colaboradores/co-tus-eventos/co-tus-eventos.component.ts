import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es-CO";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CoEventoService } from '../../../services/colaboradores/coeventos.service';
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
  calendarPlugins = [timeGridPlugin, interactionPlugin]

   views = {
    timeGridFourDay: {
      type: 'timeGrid',
      dayCount: 4,
      duration: { days: 4 },
    }
   }
  
   
  public calendarView: boolean = true
  public eventos: eventoInterface[] = []
  public eventosList = []
  
  constructor(
    private _coEventos: CoEventoService,
    private router: Router
  ) { }

  async ngOnInit() {
    var co = JSON.parse(localStorage.getItem('needlog'))
    this.eventos = await this._coEventos.getCoCalendar(co.uid)
    console.log(this.eventos);
    this.eventosList = await this._coEventos.getCoEventos(co.uid)
    console.log(this.eventosList);
  }

  clickEvento(e) {
    let id = e.event.id
    this.router.navigate(['/colaborador/evento', id])
  }

  

}
