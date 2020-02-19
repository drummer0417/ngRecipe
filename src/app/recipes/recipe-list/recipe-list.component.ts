import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../resipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  @Output() recipeSelected = new EventEmitter<Recipe>();
  public recipes: Recipe[] = [];
  private recipesUpdatedSubscription: Subscription;
  
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }
    
    ngOnInit() {
      console.log('in onInit recipeList');
      
      this.recipes = this.recipeService.getRecipes();
      
      console.log(this.recipes);
      
      this.recipesUpdatedSubscription = this.recipeService.recipesUpdated.subscribe(
        (updatedRecipes: Recipe[]) => {
          this.recipes = updatedRecipes;
          console.log('in recipesUpdatedSubscription');
          
          console.log(this.recipes);
          
        }
        )
        console.log(this.recipes);
      }
      
      onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
      }
      
      ngOnDestroy(): void {
        this.recipesUpdatedSubscription.unsubscribe();
      }
    }
    