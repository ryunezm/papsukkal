import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MovieService, Movie} from "../movie.service";
import {NotFoundComponent} from "../static/not-found/not-found.component";
import {catchError, Observable, of, switchMap, take, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Genre, Subgenre} from "../enums/genre.enum";
import {Language} from "../enums/language.enum";
import {Country} from "../enums/country.enum";

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

  getDisplayName(enumObj: any, key: string): string {
    return enumObj[key as keyof typeof enumObj] || key;
  }

  getFormattedItems(enumObj: any, items: string[] | undefined): string {
    if (!items || items.length === 0) return 'N/A';
    return items.map(item => this.getDisplayName(enumObj, item)).join(', ');
  }

  getFormattedGenres(genres: string[] | undefined): string {
    return this.getFormattedItems(Genre, genres);
  }

  getFormattedSubgenres(subgenres: string[] | undefined): string {
    return this.getFormattedItems(Subgenre, subgenres);
  }

  getFormattedLanguages(languages: string[] | undefined): string {
    return this.getFormattedItems(Language, languages);
  }

  getFormattedCountries(countries: string[] | undefined): string {
    return this.getFormattedItems(Country, countries);
  }

  deleteMovie(): void {
    if (window.confirm('Are you sure you want to delete this movie?')) {
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
}
