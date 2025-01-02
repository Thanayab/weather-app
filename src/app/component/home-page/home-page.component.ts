import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomecontentComponent } from '../homecontent/homecontent.component';
import { HomeContentBottomComponent } from '../home-content-bottom/home-content-bottom.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, HomecontentComponent, HomeContentBottomComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
