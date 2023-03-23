import { OfferSite } from './../interfaces/OfferSite';
import { GetOfferImage } from '../interfaces/OfferImage';
import { GetOffer } from '../interfaces/Offer';
import { Offers } from '../interfaces/Offers';
import { Comment } from "../interfaces/Comments";

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'

import { environment as env } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class GetOfferService {

  constructor(private http: HttpClient) { }

  getAllOffers(): Observable<Offers> {

    return this.http.post<Offers>(`${env.serverName}getAllOffers`, {});
  }

  getOffer(offerNumber: any): Observable<GetOffer> {
    return this.http.post<GetOffer>(`${env.serverName}getOffer`, { offerNumber });
  }

  getOfferImage(offerNumber: any): Observable<GetOfferImage> {
    return this.http.post<GetOfferImage>(`${env.serverName}getOfferImage`, { offerNumber });
  }

  getAllComment(offerNumber: any): Observable<Comment> {
    return this.http.post<Comment>(`${env.serverName}getOfferComment`, { offerNumber })
  }

  getOfferSite(offerNumber: any): Observable<OfferSite> {
    return this.http.post<OfferSite>(`${env.serverName}getOfferSite`, { offerNumber })
  }



}
