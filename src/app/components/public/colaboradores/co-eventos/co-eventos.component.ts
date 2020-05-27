import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/eventos/evento.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventoModel } from 'src/app/models/evento/evento.model';
import { PersonalModel } from 'src/app/models/evento/personal.model';
import { ExtrasModel } from 'src/app/models/evento/extras.model';

@Component({
  selector: 'app-co-eventos',
  templateUrl: './co-eventos.component.html',
  styleUrls: ['./co-eventos.component.css']
})
export class CoEventosComponent implements OnInit {
  
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  public eventos
  public opened: boolean = false
  public idEvento: string
  refresh
  constructor(
    private _eventos: EventoService,
  ) {
    
   }

  async ngOnInit() {
    this.eventos = await this._eventos.getEventosByCity()
  }

  async onRefresh() {
    this.refresh = true
    console.log(this.refresh);
    this.waitFor( 1000 )
    this.refresh = false
  }

  trackByFn(index, evento) {
    return evento.id;
  }

  async toggleVacantes(id) {
    this.idEvento = null
    $('.vacantes').slideUp()
    
    if ($('.vacantes-' + id).attr('opened')) {
      $('.vacantes-' + id).removeAttr('opened')
    } else {
      this.idEvento = id
        await this.waitFor(200)
        $('.vacantes-' + id).slideToggle()
        $('.vacantes-' + id).attr('opened', 'open')
    }
    
  }

}
