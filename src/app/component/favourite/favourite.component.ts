import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogueboxComponent } from '../dialoguebox/dialoguebox.component';
@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule,DialogueboxComponent],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent implements OnInit{
  value:any=[];
  showPrompt: boolean = false;
  ngOnInit(): void {
    this.value=JSON.parse(localStorage.getItem('favourite')||'{}');

  }
  openDialogueboc() {
    this.showPrompt = true;
  }
 
  handleResponse(response: boolean) {
    this.showPrompt = false;
    if (response) {
      localStorage.removeItem('favourite');
      this.value = [];
    }
  }
  removeFavourite(index: number) {
    this.value.splice(index, 1);
 
   
    localStorage.setItem('favourite', JSON.stringify(this.value));
}
}
