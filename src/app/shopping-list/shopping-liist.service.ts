import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Subject } from 'rxjs';

export class ShoppingListService{

    private ingredients: Ingredient[] = [];

    public ingredientsUpdated = new Subject<Ingredient[]>();

    constructor(){
       this.ingredients =  [
            new Ingredient("Appe", 5),
            new Ingredient('Banana', 3)
       ]
    }
    
    public getIngredients(){
        return this.ingredients.slice();
    }
    
    public addIngredient(ingredient: Ingredient){

        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.ingredients);
    }
    
    public addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(... ingredients);
        this.ingredientsUpdated.next(this.ingredients);
    }
    
}