import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MovieService, Movie} from "../movie.service";
import {NotFoundComponent} from "../static/not-found/not-found.component";
import {catchError, Observable, of, switchMap, take, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    RouterLink,
    NotFoundComponent,
    AsyncPipe
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  movie$: Observable<Movie | null> = new Observable<Movie | null>();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (typeof id === "string") {
          return this.movieService.getMovieById(id).pipe(
            catchError(error => {
              console.error('Error fetching movie:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    );
  }

  deleteMovie(): void {
    this.movie$.pipe(
      take(1),
      switchMap(movie => {
        if (movie && movie.id) {
          return this.movieService.deleteMovie(movie.id).pipe(
            tap(() => {
              this.router.navigate(['/movies']);
            }),
            catchError(error => {
              console.error('Error deleting movie:', error);
              //TODO: Handle the error by displaying a message to the user.
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe();
  }
}
