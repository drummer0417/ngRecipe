
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../resipe.service';
import { FormGroup, FormGroupDirective, FormControl, FormArray, Validators } from '@angular/forms';
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
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (params['id'] != null) {
          this.editMode = true;
          this.recipe = this.recipeService.getRecipe(this.id);  
        }
      })
      this.initForm();
  }
  private initForm() {

    let ingredientsArray = new FormArray([]);
    let name = this.editMode ? this.recipe.name : '';
    let imagePath = this.editMode ? this.recipe.imagePath : '';
    let description = this.editMode ? this.recipe.description : '';

    if (this.recipe && this.recipe.ingredients) {
      
      this.recipe.ingredients.forEach(
        (ingredient: Ingredient) => {
          ingredientsArray.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9][0-9]*$/)
            ])
          }
          ))
        });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredientsArray
    })
  }

  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
	  // this.router.navigate(['../'], { relativeTo: this.route})
  }
  
  onCancel(){
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route})
  }

  onAddIgredient() {
    const newIngredient = new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
      ])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredient);
  } 

  onDeleteIngredient(ingredientIndex: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
  }
}