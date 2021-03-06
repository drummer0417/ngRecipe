import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RecipeService } from '../recipes/resipe.service';
import { Recipe } from '../recipes/recipe.model';
import { tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService, AuthResponse } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { tokenReference } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })       // instead of adding it to providers seciton in app.module.ts
export class DataStorageService {

    private endpoint = environment.databaseUrl;
    private recipes: Recipe[];

    constructor(
        private http: HttpClient,
        private authService: AuthService) { }

    storeRecipes(recipes: Recipe[]) {

        this.http.put(this.endpoint,
            recipes).subscribe((response) => { }
            )
    }

    fetchAllRecipes() {

        let reqHeaders = new HttpHeaders({ 'wahDrinken...': 'koffie?' });
        // reqHeaders.set({'wahDrinken...': 'koffie?'});
        console.log('get recipies');
        console.log(reqHeaders);

        return this.http.get<Recipe[]>(this.endpoint,
            {
                headers: reqHeaders
            })

        // return this.http.get<Recipe[]>(this.endpoint + 'recipes.json',      
        //     {
        //         params: new HttpParams().set('auth', user.getToken())
        //     })
    }
}
