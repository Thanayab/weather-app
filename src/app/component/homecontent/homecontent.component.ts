import { Component,OnInit } from '@angular/core';
import { HomeContentBottomComponent } from '../home-content-bottom/home-content-bottom.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homecontent',
  standalone: true,
  imports: [HomeContentBottomComponent,CommonModule],
  templateUrl: './homecontent.component.html',
  styleUrl: './homecontent.component.css'
})
export class HomecontentComponent implements OnInit {
  data:any={};
  b:boolean=false
  currentTemperature: number=0; // current temperature in selected unit
  currentUnit: string = 'C'; // default unit is Celsius
  isCelsiusSelected: boolean = true;
  formattedTime: string = '';
  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem('weatherData')||'{}');
    this.currentTemperature = this.data.current.temp_c;

  }


  setTemperatureInCelsius() {
    // Set the temperature initially in Celsius
    this.currentTemperature = this.data.current.temp_c;
    this.currentUnit = 'C';
  }
 
  setTemperatureInFahrenheit() {
    // Convert temperature to Fahrenheit
    this.currentTemperature = (this.data.current.temp_c * 9/5) + 32;
    this.currentUnit = 'F';
  }
 
  convertToCelsius() {
    this.isCelsiusSelected = true;
    this.setTemperatureInCelsius();
  }
 
  convertToFahrenheit() {
    this.isCelsiusSelected = false;
    this.setTemperatureInFahrenheit();
  }

  addToFavourite(){
    
    const favouriteList = JSON.parse(localStorage.getItem('favourite') || '[]');
  
    let newData = {
      name: this.data.location.name,
      region: this.data.location.region,
      localtime: this.data.location.localtime,
      text: this.data.current.condition.text,
      icon: this.data.current.condition.icon,
      temp_c: this.data.current.temp_c,
    };
 
    favouriteList.push(newData);
 
    localStorage.setItem('favourite', JSON.stringify(favouriteList));
    this.b=!this.b;
  }
}
