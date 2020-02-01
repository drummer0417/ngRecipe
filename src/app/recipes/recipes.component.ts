import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './resipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService) { 
    this.recipeService.recipeSelectedEvent.
      subscribe( (selectedRecipe: Recipe) => {
        console.log('recipe: ' + selectedRecipe.name)
        this.recipe = selectedRecipe;
    });
  }

  ngOnInit(){}
}
