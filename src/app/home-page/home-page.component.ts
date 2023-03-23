import { RegisterService } from '../services/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  openList: boolean
  userName: any
  constructor(private _route: Router) {
    this.userName = localStorage.getItem('userName');
  }

  loginCheck() {
    if (localStorage.getItem('userName'))
      return false;
    else
      return true;

  }

  logOut(): void {

    if (localStorage.getItem('userName')) {
      localStorage.removeItem('userName')
      localStorage.removeItem('email')
      this._route.navigate(["signup"])
    }
  }

  goIfLogin(position: string) {
    if (localStorage.getItem('userName'))
      this._route.navigate([position])
    else
      this._route.navigate(['signup'])

  }
  ngOnInit(): void {
    // this.API.
  }

}
