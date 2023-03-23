import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private API: RegisterService, private _snackBar: MatSnackBar, private _route: Router) {

  }
  submit(form: Register) {
    function generateRandomNumber() {
      var minm = 100000;
      var maxm = 999999;
      return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
    }
    let token = generateRandomNumber();


    const body = {
      name: form.name,
      email: form.email,
      password: form.password,
      tokenVerify: token,
      verified: 'false'
    }
    const bodyVerified = {
      email: form.email,
      token: token
    }
    this.API.signup(body).subscribe(res => {
      if (res.status) {
        localStorage.setItem('userName', res.data)
        localStorage.setItem('email', body.email)
        //send email message
        this.API.verified(bodyVerified).subscribe(res => { })
        this._route.navigate(["verified"])
      } else {

        this._snackBar.open(res.msg
          , '', {
          duration: 4000,
          panelClass: ['snackbarErr']
        })
      }

    }, err => {
      console.log(err);

      this._snackBar.open(err.statusText
        , '', {
        duration: 4000,
        panelClass: ['snackbarErr']
      })
    })

  }
  ngOnInit(): void {
  }

}
