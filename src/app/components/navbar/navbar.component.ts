import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
declare var $;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menu: boolean = false;
  public homeIcon: boolean = true;
  public dirIcon: boolean = true;
  public logIcon: boolean = true;
  public userIcon: boolean = true;
  public menuIcon: boolean = true;
  public calIcon: boolean = true;
  public newIcon: boolean = true;
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    var loged = JSON.parse(localStorage.getItem('usuario'))
    if (loged == null ){
      this.userIcon = false;
      this.calIcon = false;
      this.newIcon = false;
    } else {
      this.logIcon = false;
      this.homeIcon = false;
    }
  }

  menuResponsive() {
    window.innerWidth;
  }

  toggleMenu(){
    $("#menu").toggleClass('opened')
    $("#close").toggle()
  }

  cerrarMenu(e){
    console.log(e);
    this.menu = e
  }

  

  

}
