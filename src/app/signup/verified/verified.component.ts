import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {
  email: string;
  token: any;
  errorMsg: string = '';
  constructor(private API: RegisterService, private _snackBar: MatSnackBar, private _route: Router) {
    this.email = localStorage.getItem('email')!;
    const body = {
      'email': this.email
    }
    this.API.getTokenVerify(body).subscribe(res => {
      if (res.status) {
        this.token = res.data[0].token_verify;
      }

    }, err => {


    })
  }
  submit(form: any) {
    if (form.code == this.token) {
      this._route.navigate(["home-page"])
      this.API.upDateVerify({ email: this.email }).subscribe(res => {

      });
    } else {
      this.errorMsg = 'invalid code'
    }

  }
  ngOnInit(): void {
  }

}
