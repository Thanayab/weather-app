import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-home-content-bottom',
  standalone: true,
  imports: [],
  templateUrl: './home-content-bottom.component.html',
  styleUrl: './home-content-bottom.component.css'
})
export class HomeContentBottomComponent implements OnInit {
  value:any={}
ngOnInit(): void {
  this.value=JSON.parse(localStorage.getItem('weatherData')||'{}'); 
  
}

}
