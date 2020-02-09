import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/eventos/evento.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventoModel } from '../../../models/evento/evento.model';
import { PersonalModel } from '../../../models/evento/personal.model';
import { ExtrasModel } from '../../../models/evento/extras.model';

@Component({
  selector: 'app-co-eventos',
  templateUrl: './co-eventos.component.html',
  styleUrls: ['./co-eventos.component.css']
})
export class CoEventosComponent implements OnInit {

  public eventos
  public opened: boolean = false
  public idEvento: string
  constructor(
    private _eventos: EventoService,
  ) {
    
   }

  async ngOnInit() {
    this.eventos = await this._eventos.getEventosByCity()
  }

  trackByFn(index, evento) {
    return evento.id;
  }

  async toggleVacantes(id) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    this.idEvento = null
    $('.vacantes').slideUp()
    
    if ($('.vacantes-' + id).attr('opened')) {
      $('.vacantes-' + id).removeAttr('opened')
    } else {
      this.idEvento = id
        await waitFor(200)
        $('.vacantes-' + id).slideToggle()
        $('.vacantes-' + id).attr('opened', 'open')
    }
    
  }

}
