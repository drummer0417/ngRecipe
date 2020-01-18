import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = [
    new Recipe("Tomeatensoep","overheerlijk soepje klaar in een uur of 3 of 4 ofzo... ", "https://cdn.pixabay.com/photo/2017/05/05/19/06/tomato-soup-2288056_1280.jpg"), 
    new Recipe('Chili con Carne', 'Super chile made by Hans', 'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
