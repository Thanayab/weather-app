import { Routes } from '@angular/router';
import { HomecontentComponent } from './component/homecontent/homecontent.component';
import { FavouriteComponent } from './component/favourite/favourite.component';
import { RecentSearchComponent } from './component/recent-search/recent-search.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomecontentComponent },
    { path: 'favourite', component: FavouriteComponent },
    { path: 'recent-search', component: RecentSearchComponent },
  ];
  



