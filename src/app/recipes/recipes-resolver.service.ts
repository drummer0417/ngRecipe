import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from './resipe.service';

@Injectable({ providedIn: 'root'})
export class RescipesResolverService implements Resolve<Recipe[]> {
    
    constructor(private recipeService: RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        console.log('in resolve, aantal recipes is ' + this.recipeService.getRecipes().length) ;
        
        if (this.recipeService.getRecipes().length > 0 ) {
            return this.recipeService.getRecipes();
        } else {
            return this.recipeService.fetchAllRecipes();
        }
    }
}