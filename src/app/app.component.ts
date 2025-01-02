import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Weather-app';
  constructor(private http:HttpClient){}
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
  ngOnInit(): void {
    this.getCurrentWeather('Udupi').subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('weatherData', JSON.stringify(res));
      },
      (error) => {
        console.error(error); // Log errors
      }
    )}
}
