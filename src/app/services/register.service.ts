import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { Observable } from 'rxjs'
interface BodyRegister {
  name: string,
  email: string,
  password: string
}
interface Msg {
  status: boolean,
  errNum: string,
  msg: string
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  login(body: BodyRegister): Observable<any> {
    return this.http.post<any>(`${env.serverName}login`, body)
  }
  signup(body: BodyRegister): Observable<any> {
    return this.http.post<any>(`${env.serverName}signup`, body)
  }
  verified(body: any): Observable<any> {
    return this.http.post(`${env.serverName}sendEmail`, body)
  }

  getTokenVerify(body: any): Observable<any> {
    return this.http.post<any>(`${env.serverName}getTokenVerify`, body)
  }
  upDateVerify(body: any): Observable<any> {
    return this.http.post<any>(`${env.serverName}upDateVerify`, body)
  }
}
