import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { LoginService } from '../../login/login.service';

import { Router } from '@angular/router';
import { ILogin } from '../../login/login';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: ILogin;
  userName: string;

  constructor( public _sidebar: SidebarService,
               private router: Router,
               private _userService:LoginService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('Usuario'));//Aqui convertimos a el string a un Objeto nueva vez
    console.log(localStorage.getItem('Usuario'));
    console.log(this.user['nombre']);
    this.userName = this.user['nombre'];
  }



   logOut(){
     this._userService.userLoggin(false);
     localStorage.removeItem('Usuario');
     localStorage.removeItem('id');
     this.router.navigate(['/login']);//Para q nos mande al Login
   }

}
