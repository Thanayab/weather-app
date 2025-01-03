import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSidebarOpen: boolean = false;
  currentTab: string = 'home';
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  });

  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/search.json';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url.split('/')[1];
        this.currentTab = url || 'home';
      }
    });
  }

  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    const searchContainer = document.querySelector('.search');

    if (
      !sidebar?.contains(event.target as Node) &&
      !hamburger?.contains(event.target as Node)
    ) {
      this.isSidebarOpen = false;
      document.body.classList.remove('no-scroll');
    }

    if (!searchContainer?.contains(event.target as Node)) {
      this.searchResults = [];
    }
  }

  onSearchChange() {
    if (this.searchQuery.length >= 3) {
      this.http
        .get<any>(this.apiUrl, {
          headers: this.headers,
          params: { q: this.searchQuery },
        })
        .subscribe(
          (response) => {
            this.searchResults = response;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    }
  }

  onSuggestionClick(item: any) {
    this.searchQuery = item.name;

    const recentList = JSON.parse(localStorage.getItem('recentSearch') || '[]');
    const tempData = {
      name: item.name,
      region: item.region,
    };

    if (!recentList.some((recentItem: any) => recentItem.name === tempData.name)) {
      recentList.push(tempData);
      localStorage.setItem('recentSearch', JSON.stringify(recentList));
    }

    this.searchResults = [];
    this.router.navigate(['/home']);
  }

  navigateTo(tab: string) {
    this.currentTab = tab;
    this.toggleMenu();
    this.router.navigate([`/${tab}`]);
  }
}
