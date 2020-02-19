import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-liist.service';
import { Recipe } from '../recipes/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Ingredient[] = [];
  ingredientsUpdatedSubscription: Subscription
  
  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsUpdatedSubscription = this.shoppingListService.ingredientsUpdated.subscribe( 
      updatedIngredients => {
        console.log('igredients updated');
        
        console.log(this.ingredients);
        this.ingredients = updatedIngredients;
    });
  }

  ngOnDestroy(): void {
    this.ingredientsUpdatedSubscription.unsubscribe();
  }

  onEditItem(ingredientId: number){
    console.log(this.shoppingListService.getIngredient(ingredientId));
    this.shoppingListService.startUpdateIngredient.next(ingredientId);
  }
}
