import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogueboxComponent } from '../dialoguebox/dialoguebox.component';

@Component({
  selector: 'app-recent-search',
  standalone: true,
  imports: [CommonModule,DialogueboxComponent],
  templateUrl: './recent-search.component.html',
  styleUrl: './recent-search.component.css'
})
export class RecentSearchComponent {
  showPrompt: boolean = false;
  value:any=[];
  ngOnInit(): void {
    this.value=JSON.parse(localStorage.getItem('recentSearch')||'[]');

  }
   openDialogueboc() {
    this.showPrompt = true;
  }
 
  handleResponse(response: boolean) {
    this.showPrompt = false;
    if (response) {
      localStorage.removeItem('recentSearch');
      this.value = [];
    }
  }
}
