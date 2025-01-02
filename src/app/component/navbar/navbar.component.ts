import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [DatePipe],
 
})
export class NavbarComponent implements OnInit {
  currentTab: string = 'home';
  formattedDate: string | null = '';
 data:any={}
  constructor(private router: Router,private datePipe: DatePipe) {}
  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem('weatherData')||'{}');
    const parsedDate = new Date(this.data.location.localtime); // Convert to ISO format
    this.formattedDate = this.datePipe.transform(parsedDate, 'EEE, d MMM y h:mm a');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Update currentTab based on the URL
        const url = this.router.url.split('/')[1]; // Adjust based on your routing structure
        this.currentTab = url || 'home';
      }
    });
  }
  navigateTo(tab: string) {
    this.currentTab = tab;
    this.router.navigate([`/${tab}`]);
  }

}
