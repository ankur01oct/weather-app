import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";



export interface WeatherApiRes {
            base: "string",
        clouds: any,
        cod: number,
        coord: any,
        dt: number,
        id: number,
        main: {temp: number, pressure: number, humidity: number, temp_min: number, temp_max: number},
        name: "Bangalore",
        sys: any,
        visibility: 8000,
        weather: any,
        wind: any
}
@Injectable()
export class AppWeatherService {
    constructor( private http: HttpClient){

    }
    getWeatherInfo(place:string)  : Observable<any>{
        return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=1aa48237b46a99e347942b356c81826a`)
        .map( (response:WeatherApiRes) => {  
                let weatherIcon:string;
                if(response.weather &&  response.weather[0] && response.weather[0].icon){
                    weatherIcon = response.weather[0].icon
                }
               let modifiedResponse:{main:WeatherApiRes["main"],place:string, icon:string, date:string} = {
                    main:response.main,
                    place:response.name,
                    icon: weatherIcon,
                    date:new Date(response.dt*1000+5900000).toLocaleString('en-GB').split(',')[0]

                }
                return modifiedResponse; // kind of useless
            })
            .catch( error => {
                return Observable.throw(error);
            })
    }
}