import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { Home_Details } from "src/app/interfaces/HomeDetails";
import { HttpHeaders } from '@angular/common/http';
import { AddOfferService } from '../services/add-offer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sell-home',
  templateUrl: './sell-home.component.html',
  styleUrls: ['./sell-home.component.scss'],
})
export class SellHomeComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  lat: number = 36.20836032719803;
  lng: number = 37.16183823824526;
  uploadedFiles: any;
  email: string;
  errorMessageField: string;
  errorMessageFile: string;
  numberOfFile: number;
  mapOptions: google.maps.MapOptions = {
    center: {
      lat: this.lat,
      lng: this.lng,
    },
    zoom: 12,
  };

  marker = {
    lat: this.lat,
    lng: this.lng,
  };

  constructor(private add: AddOfferService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) {
    this.uploadedFiles = [];
    this.email = localStorage.getItem('email')!
    this.errorMessageFile = '';
    this.errorMessageField = '';
  }

  handleFiles(event: any) {
    this.uploadedFiles = [];
    this.numberOfFile = event.target.files.length;
    if (this.numberOfFile > 6 || this.numberOfFile < 6) {
      // let list = new DataTransfer();
      // let file = new File([], '');
      // list.items.add(file);
      // let myFileList = list.files;
      // event.target.files = myFileList

      event.target.value = '';
      this.numberOfFile = 0;
      this.errorMessageFile = 'Six photos only';
    } else {
      for (var i = 0; i < event.target.files.length; i++) {
        this.uploadedFiles.push(event.target.files[i]);
      }
      this.errorMessageFile = '';
    }

  }
  clickMap(e: any) {
    this.lng = e.latLng.lng();
    this.lat = e.latLng.lat();

    this.marker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
  }
  openInfoWindow(point: any) {
    this.infoWindow.open(point);
  }

  emptyField(form: any) {
    form.reset();
    this.errorMessageField = ' Empty Field';

  }

  submit(form: any) {
    //for know 
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');

    const formData = new FormData();

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("file[]", this.uploadedFiles[i]);
    }

    const myform = form.value;

    const body: any = {
      email: this.email,
      area: myform.area,
      city: myform.city,
      details: myform.details,
      neighborhood: myform.neighborhood,
      price: myform.price,
      rooms: myform.rooms,
      lat: this.marker.lat,
      lng: this.marker.lng
    };

    this.spinner.show();
    this.add.addOffer(body).subscribe(res => {
      console.log(res.status);


    }, (err) => {
      this._snackBar.open('Error Your Offer not Uploaded', '', {
        duration: 4000,
        panelClass: ['snackbarErr']

      });
      this.spinner.hide()
    }, () => {
      this.add.uploadFile(formData).subscribe(res => {
        console.log(res.status);

      })
      this.spinner.hide()
      this._snackBar.open('Your offer uploaded', '', {
        duration: 4000,
        panelClass: ['snackbar']
      });
      this.errorMessageField = '';
    })


  }

  ngOnInit(): void { }
}
