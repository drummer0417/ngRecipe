import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform{
   
    transform(value: string, lenght: number) {
        if (value.length > lenght) {
            return value.substring(0, lenght) + '...';
        } else {
            return value;
        }
    }    
}