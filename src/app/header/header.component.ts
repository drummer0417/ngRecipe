import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    @Output() componentSelected = new EventEmitter<string>();

    onSelect(selectedComponent: string){
        console.log('geselecteerd: ' + selectedComponent);
            this.componentSelected.emit(selectedComponent);
    }
}