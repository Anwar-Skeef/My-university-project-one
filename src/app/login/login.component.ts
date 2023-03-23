import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

interface Register {
  name: string,
  email: string,
  password: string
}
interface Msg {
  status: boolean,
  errNum: string,
  msg: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private _API: RegisterService, private _snackBar: MatSnackBar, private _route: Router, private spinner: NgxSpinnerService) {


  }
  submit(form: Register) {
    this.spinner.show();
    if (form.name && form.email && form.password) {
      this._API.login(form).subscribe(res => {


        if (res.status) {
          if (!localStorage.getItem('userName'))
            localStorage.setItem('userName', res.data)
          localStorage.setItem('email', form.email)

          this._route.navigate(["home-page"])
          this._snackBar.open(` Wellcome  ${res.data}`, '', {
            duration: 4000,
            panelClass: ['snackbar']
          });
        }
        else
          this._snackBar.open(res.msg, '', {
            duration: 4000,
            panelClass: ['snackbar']
          });

      },
        err => {

          this._snackBar.open(err.statusText
            , '', {
            duration: 4000,
            panelClass: ['snackbarErr']
          })
        }, () => {
          this.spinner.hide()
        })
    }
  }
  ngOnInit(): void {
  }

}
