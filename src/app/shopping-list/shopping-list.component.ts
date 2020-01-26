import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[] = [
    new Ingredient("Appe", 5),
    new Ingredient('Banana', 3)
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

}
