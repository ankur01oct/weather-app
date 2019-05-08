import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherApiRes } from '../../service/app-weather.service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  weatherDetail:{main:WeatherApiRes["main"],place:string, icon:string};
  iconUrl:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
   this.weatherDetail =this.navParams.get('details')
   console.log(this.weatherDetail)
   if(this.weatherDetail.icon && this.weatherDetail.icon.length){
    this.iconUrl=`http://openweathermap.org/img/w/${this.weatherDetail.icon}.png`;
    console.log(this.iconUrl);
  }
  }

  closeModal(){
    this.navCtrl.pop();
  }

}
