import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-liist.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesUpdated = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {

        this.recipes = [
            new Recipe("Tomatensoep",
                "Overheerlijk soepje met lekkere verse tomatenklaar in een uur of 3 of 4 ofzo... ",
                "https://cdn.pixabay.com/photo/2017/05/05/19/06/tomato-soup-2288056_1280.jpg",
                [
                    new Ingredient('Tomaten', 6),
                    new Ingredient('Gehaktballetjes', 36),
                    new Ingredient('Kip', 2),
                    new Ingredient('Zout en peper', 1),
                    new Ingredient('Boullion', 1)
                ]
            ),
            new Recipe('Chili con Carne', 'Super chile made by Hans',
                'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
                [
                    new Ingredient('Ui', 3),
                    new Ingredient('Gehakt', 500),
                    new Ingredient('Kidney bonen', 3),
                    new Ingredient('Chili peper', 1),
                    new Ingredient('Knoflook', 4),
                    new Ingredient('Tomatenpure', 3),
                    new Ingredient('Passata', 500),

                ]
            ),
            new Recipe('Groene Curry', 'Lekker op de Indiase toer... jaja dah eten is wel lekker!',
                'https://www.gewooneenfoodblog.nl/wp-content/uploads/2015/09/bloemkoolcurry-cover.jpg',
                [
                    new Ingredient('Ui', 3),
                    new Ingredient('Kip', 500),
                    new Ingredient('Sperziebonen', 3),
                    new Ingredient('Chili peper', 1),
                    new Ingredient('Knoflook', 4),
                    new Ingredient('Boemboe groene curry pasta', 1),
                ]
            ),
            new Recipe('Friet met frikandel speciaal', "Heerlijk zo'n vette hap af en toe",
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Patat_speciaal_and_frikandel_speciaal.jpg/800px-Patat_speciaal_and_frikandel_speciaal.jpg',
                [
                    new Ingredient('Friet', 1),
                    new Ingredient('Friekandel', 2),
                    new Ingredient('Mayonaise', 2),
                    new Ingredient('Curry', 1),
                    new Ingredient('Gesnipperde uittjes', 50)
                ]
            )
        ]
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipe(recipe: Recipe) {

        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {

        this.recipes[index] = recipe;
        this.recipesUpdated.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesUpdated.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
        this.recipesUpdated.next(this.recipes.slice());
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
}