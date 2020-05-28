import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventoService } from '../../../../../../services/eventos/evento.service';

@Component({
  templateUrl: './delete-evento.component.html',
  styleUrls: ['./delete-evento.component.css']
})
export class DeleteEventoComponent implements OnInit {

  constructor (
    private _dialog: MatDialogRef<DeleteEventoComponent>,
    @Inject( MAT_DIALOG_DATA ) public idEvento: string,
    private _evento: EventoService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this._dialog.close()
  }

  onSubmit() {
    this._evento.deleteEvento( this.idEvento ).then( () => {
      this._dialog.close()
    })
  }

}
