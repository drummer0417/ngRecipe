import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    
    @Output() componentSelected = new EventEmitter<string>();
        
    ngOnInit(): void {

    }

    onSelect(selectedComponent: string) {
        console.log('geselecteerd: ' + selectedComponent);
        this.componentSelected.emit(selectedComponent);
    }
}