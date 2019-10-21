import { Component, OnInit, Input } from '@angular/core';
// import * as conekta from "conekta";
// var conekta = require('conekta');
declare const Conekta: any;
declare const $: any;


@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  @Input() concepto: string;
  @Input() nombre: string;
  @Input() total: number; 

  public usuario: any
  constructor(
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('login'));
    Conekta.setPublicKey('key_C3kCmvnFdDzf9NFtnu2xm5Q');
    
  }
  
  async tokenConekta(){
    var form = $("#pagoForm")
    var success = function(token){
      $("#token").val(token.id)
    }
    var error = function(error){
      alert(error.message_to_purchaser)
    }
    await Conekta.Token.create(form, success, error )
    var url = window.location.href;
    if (url.includes('pagarPlan')){
      window.location.href = "/directorio/suscripcion"
    } else if (url.includes('evento')) {
      // continuar con evento 
    }
  }

  onSubmit(){
  }

}
