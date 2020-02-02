import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../resipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  
  constructor(private recipeService: RecipeService){}

  ngOnInit() {
  }

  onSelectShoppingList() {
    console.log('onSelectShoppingList');
    this.recipeService.addIngredients(this.recipe.ingredients);
    
  }
}
