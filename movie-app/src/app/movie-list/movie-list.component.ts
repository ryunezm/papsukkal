import {Component} from '@angular/core';
import {MovieService} from "../movie.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: any[] = [];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    })
  }

}
