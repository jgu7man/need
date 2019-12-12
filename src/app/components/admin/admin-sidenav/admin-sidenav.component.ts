import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
