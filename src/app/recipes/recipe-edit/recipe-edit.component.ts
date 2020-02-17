import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../resipe.service';
import { FormGroup, FormGroupDirective, FormControl, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;  
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
        this.initForm(); 
      }
    )
  }

  private initForm(){
    console.log('in initForm()');
    let ingredients = new FormArray([]); 
    let name = this.editMode? this.recipe.name: '';
    let imagePath = this.editMode? this.recipe.imagePath: '';
    let description = this.editMode? this.recipe.description: '';
    
    this.recipe.ingredients.forEach( 
      (ingredient: Ingredient) => {
        ingredients.push(new FormGroup({
            'ingredientName': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amoumt)
          }
        ))
      });

    this.recipeForm = new FormGroup({
      'name': new FormControl(name),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(description),
      'ingredients': ingredients
    })
  }
  
  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
    
  onSubmit(){
    console.log(this.recipeForm);
  }

  onAddIgredient(){
    const newIngredient = new FormGroup({
      'ingredientName': new FormControl(''),
      'amount': new FormControl(null)
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredient);
  }
}
