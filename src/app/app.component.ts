import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/resipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe';
  selected = 'recipes';
  
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService){
  
    }
    
    ngOnInit(): void {
      this.authService.autoLogin();
      // this.recipeService.fetchAllRecipes();
    }
    
}
