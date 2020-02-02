import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-liist.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsUpdated.subscribe( updatedIngredients => {
        console.log('Ingredients: ' + this.ingredients.length);
        this.ingredients = updatedIngredients;
      });
  }
}
