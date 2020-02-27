import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/resipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    
    constructor(
        private recipeService: RecipeService){}

    ngOnInit(): void {}

    onSaveRecipes(){
        this.recipeService.storeAllRecipes();
    }

   onFetchAllRecipes(){
        this.recipeService.fetchAllRecipes().subscribe();
    }
}