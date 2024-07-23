import {Component} from '@angular/core';
import {MovieService} from "../movie.service";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: any[] = [];
  hoveredMovieId: number | null = null;
  animatingMovieId: number | null = null;
  filteredMovies: any[] = [];
  sortOrder: 'asc' | 'desc' = 'desc';
  sortField: 'releaseDate' | 'title' = 'releaseDate';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = [...this.movies];
      this.sortMovies(this.sortField);
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (!value) {
      this.filteredMovies = [...this.movies];
      return;
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    this.sortMovies(this.sortField);
  }

  sortMovies(field: 'releaseDate' | 'title') {
    if (this.sortField === field) {
      // If the field is the same, change the order.
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // If it's a new field, set the default descending order.
      this.sortField = field;
      this.sortOrder = 'desc';
    }

    this.filteredMovies.sort((a, b) => {
      let comparison = 0;
      if (field === 'releaseDate') {
        comparison = new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      } else if (field === 'title') {
        comparison = b.title.localeCompare(a.title);
      }
      return this.sortOrder === 'asc' ? -comparison : comparison;
    });
  }

  calculateAverageRating(movie: any): number{
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

  formatArray(array: string[]): string { return array.join(' / '); }

  formatRating(rating: number): string {
    if (rating === 10) { return '10'; }
    return rating.toFixed(1);
  }

  onMouseEnter(movieId: number) { this.hoveredMovieId = movieId; }

  onMouseLeave() { this.hoveredMovieId = null; }

  onAnimationEnd(movieId: number) { if (this.hoveredMovieId !== movieId) { this.animatingMovieId = null; } }
}
