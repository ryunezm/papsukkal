import {Component, OnInit, ViewChild} from '@angular/core';
import {Movie, MovieService} from "../movie.service";
import {RouterLink} from "@angular/router";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CommonModule} from '@angular/common';
import {catchError, of, tap} from "rxjs";
import {Event as TypescriptEvent} from '@angular/router';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSort,
    MatSortHeader,
    ReactiveFormsModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Movie>;
  hoveredMovieId: string | null = null;
  filteredMovies: Movie[] = [];
  searchControl = new FormControl('');

  movies$ = this.movieService.getMovies().pipe(
    tap(movies => {
      this.dataSource.data = movies;
      this.filteredMovies = movies;
    }),
    catchError(error => {
      console.error('Error loading movies:', error);
      return of([]);
    })
  );

  constructor(private movieService: MovieService) {
    this.dataSource = new MatTableDataSource<Movie>();
  }

  ngOnInit(): void {
    this.searchControl.reset();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dataSource.filter = target.value.trim().toLowerCase();
    this.filteredMovies = this.dataSource.filteredData;
  }

  calculateAverageRating(movie: any): number {
    const ratings = [
      movie.personalRating.screenplay,
      movie.personalRating.acting,
      movie.personalRating.photography,
      movie.personalRating.entertainment,
      movie.personalRating.recommended
    ];

    const validRatings = ratings.filter(rating => rating !== null && rating !== undefined);
    if (validRatings.length === 0) { return 0; }

    const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
    return sum / validRatings.length;
  }

  formatArray(array: string[] | undefined): string {
    return array ? array.join(' / ') : '';
  }

  formatRating(rating: number | undefined): string {
    if (rating === undefined) return '-';
    if (rating === 10) { return '10'; }
    return rating.toFixed(1);
  }

  onMouseEnter(movieId: string) {
    this.hoveredMovieId = movieId;
  }

  onMouseLeave() {
    this.hoveredMovieId = null;
  }

  sortData(sort: Sort) {
    const data = this.filteredMovies.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredMovies = data;
      return;
    }

    this.filteredMovies = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'releaseDate': return compare(new Date(a.releaseDate), new Date(b.releaseDate), isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'directors': return compare(a.directedBy, b.directedBy, isAsc);
        case 'screenplay': return compare(a.personalRating?.screenplay, b.personalRating?.screenplay, isAsc);
        case 'acting': return compare(a.personalRating?.acting, b.personalRating?.acting, isAsc);
        case 'photography': return compare(a.personalRating?.photography, b.personalRating?.photography, isAsc);
        case 'entertainment': return compare(a.personalRating?.entertainment, b.personalRating?.entertainment, isAsc);
        case 'recommended': return compare(a.personalRating?.recommended, b.personalRating?.recommended, isAsc);
        case 'average': return compare(this.calculateAverageRating(a), this.calculateAverageRating(b), isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | string[] | Date | undefined, b: number | string | string[] | Date | undefined, isAsc: boolean) {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return isAsc ? -1 : 1;
  if (b === undefined) return isAsc ? 1 : -1;
  if (Array.isArray(a)) return isAsc ? 1 : -1;
  if (Array.isArray(b)) return isAsc ? -1 : 1;
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
