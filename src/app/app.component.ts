import { Component,OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Weather-app';
  data: any = {};
 
  constructor(private http: HttpClient,private router:Router,private sharedService: SharedService) {}
 
 
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
    const recentList = JSON.parse(localStorage.getItem('recentSearch') || '[]');
   
    let tempData = {
      name: item.name,
      region: item.region,
      localtime: item.localtime,
      text: item.text,
      icon: item.icon,
      temp_c: item.temp_c,
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
    const cityName = item && item.name ? item.name : 'Udupi'; 
   console.log(cityName);
    this.fetchWeatherData(cityName);
   
  }
 
  ngOnInit(cityName: string = 'Udupi'): void {
    this.fetchWeatherData(cityName);
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
