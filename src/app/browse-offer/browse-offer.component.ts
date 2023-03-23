import { GetOfferService } from './../services/get-offer.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-offer',
  templateUrl: './browse-offer.component.html',
  styleUrls: ['./browse-offer.component.scss']
})
export class BrowseOfferComponent implements OnInit {
  staticLinkImage: string
  offers: any[];
  originalOffers: any[]
  openList: boolean;

  constructor(private _route: Router, private get: GetOfferService, private spinner: NgxSpinnerService) {
    this.staticLinkImage = 'http://127.0.0.1:8000/';

  }
  filterOffer(value: any) {


    if (value) {

      const dataFilter = this.originalOffers.filter(item =>
        item.city.toLowerCase().indexOf(value) != -1
      )


      if (dataFilter.length != 0) {
        this.offers = dataFilter
      }
      else {
        this.offers = this.originalOffers


      }


    } else {
      this.offers = this.originalOffers


    }
  }
  convertFirstLetterToUppercase(): void {
    for (let index = 0; index < this.offers.length; index++) {
      this.offers[index].city = this.offers[index].city.charAt(0).toUpperCase() + this.offers[index].city.slice(1);
    }
  }
  CorrectionLinkImage() {
    for (let i = 0; i < this.offers.length; i++) {
      const element = this.offers[i];
      this.offers[i].img0 = element.img0.replace('public', 'storage');

    }
    console.log(this.offers)
  }

  logOut(): void {
    if (localStorage.getItem('userName')) {
      localStorage.removeItem('userName')
      localStorage.removeItem('email')

      this._route.navigate(["signup"])
    }
  }
  goToOffer(id: number) {
    this._route.navigate(['offer', id])
  }
  goTo(position: string) {
    this._route.navigate([position])
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.spinner.show();
    this.get.getAllOffers().subscribe(res => {
      this.offers = res.data
      this.originalOffers = res.data
    }, err => {

    }, () => {
      this.spinner.hide();
      this.CorrectionLinkImage()
      this.convertFirstLetterToUppercase();

    })


  }

}
