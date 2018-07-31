
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { LoginService } from '../../login/login.service';

import { Router } from '@angular/router';
import { ILogin } from '../../login/login';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  user: ILogin;
  userName: string;//Para almacenar el nombre del valor que recibimos del local storage
  userMail: string;

  constructor(public _sidebar: SidebarService,
              private router: Router,
              private _userService:LoginService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('Usuario'));//Aqui convertimos a el string a un Objeto nueva vez
    this.userName = this.user['nombre'];
    this.userMail = this.user['correo'];
  }


  logOut(){
    this._userService.userLoggin(false);
    localStorage.removeItem('Usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);//Para q nos mande al Login
  }

}
