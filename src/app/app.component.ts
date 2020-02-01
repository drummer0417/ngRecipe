import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe'; 
  selected = 'recipes';
  
  onComponentSelected(seleced: string){
    console.log('seleced: ' + seleced);
    this.selected = seleced;
  }
}
