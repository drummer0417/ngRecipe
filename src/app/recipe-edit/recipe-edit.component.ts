import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/resipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  recipe: Recipe;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (params['id'] != null) {
          this.editMode = true;
          this.recipe = this.recipeService.getRecipe(this.id);
          console.log(this.recipe);
        }
      }
    )
  }

}
