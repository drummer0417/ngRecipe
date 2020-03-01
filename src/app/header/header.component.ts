import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/resipe.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    
    userSubscription: Subscription;
    loggedIn: boolean = false;
    
    constructor(
        private recipeService: RecipeService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router){}
        
        ngOnInit(): void {
            this.userSubscription = this.authService.user.subscribe((user: User) => {
                this.loggedIn = !!user; // !! means not ( user !== null)
            })
        }
        
        onSaveRecipes(){
            this.recipeService.storeAllRecipes();
        }
        
        onFetchAllRecipes(){
            this.recipeService.fetchAllRecipes().subscribe();
        }

        onLogout(){
            console.log('logout');
            
            this.authService.logout();
        }

        ngOnDestroy(): void {
            this.userSubscription.unsubscribe();
        }
    }