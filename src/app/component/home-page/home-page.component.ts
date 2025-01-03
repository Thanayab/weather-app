import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomecontentComponent } from '../homecontent/homecontent.component';
import { HomeContentBottomComponent } from '../home-content-bottom/home-content-bottom.component';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, HomecontentComponent, HomeContentBottomComponent, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  data: any = {};

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) { }


  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  });

  getCurrentWeather(location: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.headers,
      params: { q: location },
    });
  }
  onSearchSelection(item: any) {
    this.handleSelectedItem(item);
  }
  handleSelectedItem(item: any) {
    // console.log("Called")
    const cityName = item && item.name ? item.name : 'Udupi';
    this.fetchWeatherData(cityName);
    this.getfulldata(cityName);

  }
  getfulldata(location: string) {
    this.getCurrentWeather(location).subscribe(
      (res) => {
        this.data = res;

        const recentList = JSON.parse(
          localStorage.getItem('recentSearch') || '[]'
        );

        let tempData = {
          name: res.location.name,
          region: res.location.region,
          localtime: res.location.localtime,
          text: res.current.condition.text,
          icon: res.current.condition.icon,
          temp_c: res.current.temp_c,
        };

        const exists = recentList.some(
          (recentItem: any) =>
            recentItem.name === tempData.name &&
            recentItem.region === tempData.region
        );
        if (!exists) {
          recentList.push(tempData);
          localStorage.setItem('recentSearch', JSON.stringify(recentList));
        }
      },
      (error) => {
        console.error(error); // Log errors
      }
    );
  }
  private fetchWeatherData(location: string) {
    this.getCurrentWeather(location).subscribe(
      (res) => {
        this.data = res;
        this.sharedService.updateData(res);
        localStorage.setItem('weatherData', JSON.stringify(res));
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
