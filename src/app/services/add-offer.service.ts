import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AddOfferService {

  constructor(private add: HttpClient) { }


  uploadFile(FD: any): Observable<any> {
    return this.add.post<any>(`${env.serverName}uploadFile`, FD);
  }

  addOffer(body: any): Observable<any> {
    return this.add.post<any>(`${env.serverName}uploadInfo`, body);
  }

  addComment(comment: any): Observable<any> {
    return this.add.post<any>(`${env.serverName}newComment`, comment);
  }
}
