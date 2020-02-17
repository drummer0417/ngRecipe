import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-liist.service';
import { NgForm } from '@angular/forms';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('f', {static: false}) form: NgForm;

  inEditMode = false;
  ingredientIndex: number = -1;
  startEditSubscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.startEditSubscription = this.shoppingListService.startUpdateIngredient.subscribe(
      (index: number) => {
        this.inEditMode = true;
        this.ingredientIndex = index;
        const editIngredient = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: editIngredient.name,
          amount: editIngredient.amoumt
        })
      });
    }
    
    onItemChanged(form: NgForm){
      
      const newIngredient = new Ingredient(form.value.name, form.value.amount);
      if (this.inEditMode) {
	      this.shoppingListService.updateIngredient(this.ingredientIndex, newIngredient);        
        this.inEditMode = false;
      } else {
        this.shoppingListService.addIngredient(newIngredient);;
      }
      this.onClear();
    }

    onDelete(){
      if (this.ingredientIndex >= 0) {
        this.shoppingListService.deleteIngredient(this.ingredientIndex);
        this.onClear();
      }
    }

    onClear(){
      this.form.reset();
      this.inEditMode = false;
      this.ingredientIndex = -1;
    }
    
    ngOnDestroy(): void {
      this.startEditSubscription.unsubscribe();
    }
}
