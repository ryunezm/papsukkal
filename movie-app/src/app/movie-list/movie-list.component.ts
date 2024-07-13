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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = [...this.movies];
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (!value) {
      this.filteredMovies = [...this.movies];
      return;
    }
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
  }
  formatArray(array: string[]): string {
    return array.join(' / ');
  }

  onMouseEnter(movieId: number) { this.hoveredMovieId = movieId; }

  onMouseLeave() { this.hoveredMovieId = null; }

  onAnimationEnd(movieId: number) { if (this.hoveredMovieId !== movieId) { this.animatingMovieId = null; } }
}
