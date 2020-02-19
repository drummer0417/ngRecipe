import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/resipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]
})
export class AppComponent {
  title = 'recipe';
  selected = 'recipes';

  // onComponentSelected(seleced: string) {
  //   console.log('seleced: ' + seleced);
  //   this.selected = seleced;
  // }
}
