import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @Input() set appDropdown(value) {
        console.log('in dropdown directive');

    }

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef){}
}