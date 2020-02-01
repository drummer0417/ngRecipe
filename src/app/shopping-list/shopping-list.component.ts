import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-liist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientsUpdated.subscribe( updatedIngredients => {
      console.log('Ingredients: ' + this.ingredients.length);
      this.ingredients = updatedIngredients;
    })
   }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
