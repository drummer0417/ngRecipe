import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RecipeService } from '../recipes/resipe.service';
import { Recipe } from '../recipes/recipe.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})       // instead of adding it to providers seciton in app.module.ts
export class DataStorageService{

    private endpoint = environment.databaseUrl;
    private recipes: Recipe[];

    constructor(
        private http: HttpClient){}

    storeRecipes(recipes: Recipe[]){

        this.http.put(this.endpoint + 'recipes.json', recipes ).subscribe (
            (response) => {
                console.log('response');
                console.log(response);
            }
        )
    }

    fetchAllRecipes() {
        return this.http.get<Recipe[]>(this.endpoint + 'recipes.json')
    }
}