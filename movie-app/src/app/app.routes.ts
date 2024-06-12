import {Routes} from '@angular/router';
import {MovieListComponent} from "./movie-list/movie-list.component";
import {MovieFormComponent} from "./movie-form/movie-form.component";
import {MovieDetailComponent} from "./movie-detail/movie-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/new', component: MovieFormComponent},
  {path: 'movies/:id', component: MovieDetailComponent},
  {path: 'movies/edit/:id', component: MovieFormComponent},
];
