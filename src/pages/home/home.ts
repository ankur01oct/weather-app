import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ToastController, Toast } from 'ionic-angular';
import { AppWeatherService, WeatherApiRes } from '../../service/app-weather.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private modalCtrl: ModalController,
              private appWeatherService: AppWeatherService,
              private toastCtrl:ToastController ) {

  }

  place:string;
  cachedSearchs:{main:WeatherApiRes["main"],place:string, icon:string}[]=[];
  getWeatherInfo() {
    if(this.place && this.place.length){
    this.appWeatherService.getWeatherInfo(this.place.trim()).subscribe(
      (data:{main:WeatherApiRes["main"],place:string, icon:string}) =>{
        this.presentModal(data);
        this.addAndRestrictCachetoTen(data);
      },
      (error)=> {
          console.log(error);
          this.createToast(error.statusText);
        })
      } else{
        this.createToast('Please Enter a Value');
      }

  }
  clear(){
    this.place = '';
  }
  async presentModal(cachedSearch:{main:WeatherApiRes["main"],place:string, icon:string}) {
    console.log(cachedSearch)
    const modal = await this.modalCtrl.create(
     DetailPage,{ details: cachedSearch }
    );
  
    return await modal.present();
  }
  addAndRestrictCachetoTen(newSearchResult:{main:WeatherApiRes["main"],place:string, icon:string}){
    if(this.cachedSearchs.length === 10){
      this.cachedSearchs.pop();
    } 
          this.cachedSearchs.unshift(newSearchResult);
    
  }
  createToast(message:string) {
    let toast:Toast =this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      dismissOnPageChange: true,
      position: 'bottom'
    })
    toast.present();
  }
}
