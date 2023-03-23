
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AddOfferService } from 'src/app/services/add-offer.service';
import { GetOfferService } from "src/app/services/get-offer.service";



@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  lat: number = 36.216667;
  lng: number = 37.166668;
  mapOptions: google.maps.MapOptions = {
    center: {
      lat: this.lat,
      lng: this.lng,
    },
    zoom: 14,

  };
  marker = {
    lat: this.lat,
    lng: this.lng,
  };


  staticLinkImage: string
  comments: any[];
  id: string;
  offer: any;
  imgDB: any[];

  constructor(private route: ActivatedRoute, private get: GetOfferService, private add: AddOfferService, private spinner: NgxSpinnerService) {
    this.staticLinkImage = 'http://127.0.0.1:8000/storage';
    this.getIdOffer();
    this.getOfferSite()

  }

  openInfoWindow(point: any) {
    this.infoWindow.open(point);
  }

  getIdOffer() {

    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  addComment(com: any) {
    //for every replace space in non and get length
    // console.log(com.value.replace(/\s/g, '').length);

    if (com.value.replace(/\s/g, '').length) {
      const newCom: any = {
        offer_number: this.id,
        user_name: localStorage.getItem('userName')!,
        comment: com.value
      }
      this.comments = [newCom, ...this.comments]
      this.add.addComment(newCom).subscribe(res => {
        console.log(res.status);

      })
    }

  }
  getAllComment() {
    return this.get.getAllComment(this.id).subscribe(res => {

      this.comments = res.data;
    }, (err => { }), () => {
      this.spinner.hide()
    })
  }

  getOffer() {
    return this.get.getOffer(this.id).subscribe(res => {
      this.offer = res.data;
      console.log(this.offer);
    }, (err => { }), () => {

    })
  }

  CorrectionLinkImage() {
    this.imgDB[0] = {
      img0: this.staticLinkImage + this.imgDB[0].img0.slice(6, this.imgDB[0].img0.length),
      img1: this.staticLinkImage + this.imgDB[0].img1.slice(6, this.imgDB[0].img1.length),
      img2: this.staticLinkImage + this.imgDB[0].img2.slice(6, this.imgDB[0].img2.length),
      img3: this.staticLinkImage + this.imgDB[0].img3.slice(6, this.imgDB[0].img3.length),
      img4: this.staticLinkImage + this.imgDB[0].img4.slice(6, this.imgDB[0].img4.length),
      img5: this.staticLinkImage + this.imgDB[0].img5.slice(6, this.imgDB[0].img5.length),
    }


  }



  getOfferImage() {
    return this.get.getOfferImage(this.id).subscribe(res => {

      this.imgDB = res.data;

    }, (err => { }), () => {
      this.CorrectionLinkImage()

    })
  }
  getOfferSite() {
    return this.get.getOfferSite(this.id).subscribe(res => {
      this.marker.lat = res.data[0].lat;
      this.marker.lng = res.data[0].lng;

      this.mapOptions.center = this.marker;



    }, (err => { }), () => {

    })
  }



  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.spinner.show();
    this.getOffer();
    this.getOfferImage();
    this.getAllComment();
  }

}
