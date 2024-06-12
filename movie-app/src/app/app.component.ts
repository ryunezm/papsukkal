import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-app';
  // movie: MovieService = {
  //   title: "",
  //   releaseDate: "",
  //   genre: [],
  //   runningTime: 0,
  //   country: [],
  //   language: []
  // };
  //
  // constructor(private movieService: MovieService) {}
  //
  // saveMovie() {
  //   if (this.movie.id) {
  //     this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
  //       response => {
  //         console.log('Response from server:', response);
  //       },
  //       error => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   } else {
  //     this.movieService.createMovie(this.movie).subscribe(
  //       response => {
  //         console.log('Response from server:', response);
  //       },
  //       error => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }
}
