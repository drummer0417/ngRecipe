import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    private ingredients: Ingredient[] = [];

    public ingredientsUpdated = new Subject<Ingredient[]>();
    public startUpdateIngredient = new Subject<number>();

    constructor() {
        this.ingredients = [
            new Ingredient("Appel", 5),
            new Ingredient('Banana', 3)
        ]
    }

    public getIngredients() {
        return this.ingredients.slice();
    }

    public getIngredient(idx: number) {
        return this.ingredients[idx];
    }

    public addIngredient(ingredient: Ingredient) {

        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }
    
    public updateIngredient(index: number, ingredient: Ingredient) {
        
        this.ingredients[index] = ingredient;
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

    public deleteIngredient(index: number){
        if (index >= 0) {
            this.ingredients.splice(index, 1);
            this.ingredientsUpdated.next(this.ingredients.slice());
        }
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next(this.ingredients.slice());
    }

}